<template>
    <PageHead></PageHead>
    <div class="table-container">
        <table dir="auto">
            <TableHead name="姓名" today="今日新增" whole="本月累计"></TableHead>
            <TableRow v-for="i in 10" v-bind:key="i" v-bind:name="names[i-1]" v-bind:today="todays[i-1]"
                      v-bind:whole="wholes[i-1]"></TableRow>
        </table>
    </div>
    <div class="notes">
        <p>当前版本 v1.3.5</p>
        <p>点个star吧 <a href="https://github.com/Bluemangoo/run-board">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                      d="M16 0C7.16 0 0 7.16 0 16C0 23.08 4.58 29.06 10.94 31.18C11.74 31.32 12.04 30.84 12.04 30.42C12.04 30.04 12.02 28.78 12.02 27.44C8 28.18 6.96 26.46 6.64 25.56C6.46 25.1 5.68 23.68 5 23.3C4.44 23 3.64 22.26 4.98 22.24C6.24 22.22 7.14 23.4 7.44 23.88C8.88 26.3 11.18 25.62 12.1 25.2C12.24 24.16 12.66 23.46 13.12 23.06C9.56 22.66 5.84 21.28 5.84 15.16C5.84 13.42 6.46 11.98 7.48 10.86C7.32 10.46 6.76 8.82 7.64 6.62C7.64 6.62 8.98 6.2 12.04 8.26C13.32 7.9 14.68 7.72 16.04 7.72C17.4 7.72 18.76 7.9 20.04 8.26C23.1 6.18 24.44 6.62 24.44 6.62C25.32 8.82 24.76 10.46 24.6 10.86C25.62 11.98 26.24 13.4 26.24 15.16C26.24 21.3 22.5 22.66 18.94 23.06C19.52 23.56 20.02 24.52 20.02 26.02C20.02 28.16 20 29.88 20 30.42C20 30.84 20.3 31.34 21.1 31.18C27.42 29.06 32 23.06 32 16C32 7.16 24.84 0 16 0V0Z"
                      fill="white" />
            </svg>
            Github
        </a></p>
        <p>有问题请在Github提Issue</p>
        <p>所有人的数据请在 F12 - 控制台(console) 查看</p>
    </div>
</template>


<script>
import TableRow from "./components/TableRow";
import TableHead from "./components/TableHead";
import PageHead from "./components/PageHead";
import axios from "axios";

export default {
    name: "App",
    components: {
        TableRow,
        TableHead,
        PageHead
    },
    data() {
        let names = [], todays = [], wholes = [];
        const idList = [20210502, 20210503, 20210505, 20210506, 20210510, 20210512, 20210513, 20210521, 20210523, 20210531, 20210535, 20210544, 20210612, 20210619, 20210704, 20210721, 20210728, 20210806, 20210821, 20210829, 20210837, 20210912, 20210914, 20210940, 20211047, 20211103, 20211109, 20211114, 20211115, 20211123, 20211142, 20211205, 20211208, 20211237, 20211238, 20211329, 20211333, 20211427, 20211517, 20211518, 20211524, 20211548, 20211611, 20211618, 20211644];
        let tmpList = [];
        const day = function() {
            const date = new Date();
            let month = date.getMonth() + 1;
            if (month < 10
            ) {
                month = "0" + month;
            }
            let day = date.getDate();
            if (day < 10) {
                day = "0" + day;
            }
            return date.getFullYear() + "-" + month + "-" + day;
        }();
        let tasks = [0, 0];
        return {
            names,
            todays,
            wholes,
            idList,
            tmpList,
            day,
            tasks,
            polling: null
        };
    },
    async created() {
        function getCount(data) {
            let count = 0;
            for (let var2 = 0; var2 < data.length; var2++) {
                let var3 = parseFloat(data[var2]["tolastdistence"]) / 1000;
                if (data[var2]["youxiao"] === 1) {
                    count += var3;
                }
            }
            return count;
        }

        for (let i = 0; i < 10; i++) {
            this.names[i] = "Loading";
        }
        this.names[0] = `Get ${this.tasks[0]}/${this.tasks[1]}`;
        {
            const getPage = async (url) => {
                const { data } = await axios.get(url);
                return data;
            };
            let tasks = this.tasks, names = this.names;
            const addTask = () => {
                tasks[1]++;
                names[0] = `Get ${tasks[0]}/${tasks[1]}`;
            }, doneTask = () => {
                tasks[0]++;
                names[0] = `Get ${tasks[0]}/${tasks[1]}`;
            };
            const day = this.day, idList = this.idList;
            let dataList = [];
            let dateList = [], dateList2 = [];
            let taskList = [], taskList2 = [];

            for (let i = 0; i < idList.length; i++) {
                dataList[i] = [null, 0.0, 0.0];
                addTask();
                taskList[taskList.length] = getPage("https://jinhuaschool.smart-run.cn/report/student/month?student_no=" + idList[i])
                    .then(function(response) {
                        let var1 = JSON.parse(response)["data"];
                        for (let var2 = 0; var2 < var1.length; var2++) {
                            let date = var1[var2]["date"];
                            if (date !== day) {
                                dateList[dateList.length] = [i, idList[i], date];
                                addTask();
                            } else {
                                dateList2[dateList2.length] = [i];
                                addTask();
                            }
                        }
                        doneTask();
                    });
            }
            for (let i = 0; i < idList.length; i++) {
                addTask();
                taskList2[taskList2.length] = getPage("https://jinhuaschool.smart-run.cn/report/student/index?student_no=" + this.idList[i])
                    .then(function(response) {
                        let res = JSON.parse(response);
                        dataList[i][0] = res["data"]["student"]["name"];
                        doneTask();
                    });
            }

            await Promise.all(taskList);

            for (let i = 0; i < dateList2.length; i++) {
                taskList2[taskList2.length] = getPage("https://jinhuaschool.smart-run.cn/report/student/record?student_no=" + idList[dateList2[i]] + "&day=" + day)
                    .then(function(response) {
                        dataList[dateList2[i]][1] += getCount(JSON.parse(response)["data"]);
                        doneTask();
                    });
            }

            for (let i = 0; i < dateList.length; i++) {
                taskList2[taskList2.length] = getPage("https://jinhuaschool.smart-run.cn/report/student/record?student_no=" + dateList[i][1] + "&day=" + dateList[i][2])
                    .then(function(response) {
                        dataList[dateList[i][0]][2] += getCount(JSON.parse(response)["data"]);
                        doneTask();
                    });
            }

            await Promise.all(taskList2);

            this.tmpList = JSON.parse(JSON.stringify(dataList));

            dataList.sort((a, b) => {
                if (a[1] < b[1] || (a[1] === b[1] && a[2] < b[2])) {
                    return 1;
                } else if (a[1] > b[1] || (a[1] === b[1] && a[2] > b[2])) {
                    return -1;
                } else {
                    return 0;
                }
            });

            for (let i = 0; i < dataList.length && i < 10; i++) {
                this.names[i] = dataList[i][0];
                this.todays[i] = dataList[i][1];
                this.wholes[i] = dataList[i][2] + dataList[i][1];
            }

            let list = [];

            for (let i = 0; i < dataList.length; i++) {
                list[i] = [dataList[i][0], dataList[i][1], dataList[i][2] + dataList[i][1]];
            }

            console.log(list);

        }

        if (this.timer) {
            clearInterval(this.timer);
        } else {
            this.timer = setInterval(() => {
                setTimeout(this.pollData, 0);
            }, 60 * 1000);
        }
    },
    methods: {
        async pollData() {
            function getCount(data) {
                let count = 0;
                for (let var2 = 0; var2 < data.length; var2++) {
                    let var3 = parseFloat(data[var2]["tolastdistence"]) / 1000;
                    if (data[var2]["youxiao"] === 1) {
                        count += var3;
                    }
                }
                return count;
            }

            const getPage = async (url) => {
                const { data } = await axios.get(url);
                return data;
            };

            const idList = this.idList, day = this.day;
            let dataList = JSON.parse(JSON.stringify(this.tmpList));
            let taskList = [];
            for (let i = 0; i < this.idList.length; i++) {
                dataList[i][1] = 0.0;
                taskList[taskList.length] = getPage("https://jinhuaschool.smart-run.cn/report/student/record?student_no=" + idList[i] + "&day=" + day)
                    .then(function(response) {
                        dataList[i][1] += getCount(JSON.parse(response)["data"]);
                    });
            }

            await Promise.all(taskList);

            dataList.sort((a, b) => {
                if (a[1] < b[1] || (a[1] === b[1] && a[2] < b[2])) {
                    return 1;
                } else if (a[1] > b[1] || (a[1] === b[1] && a[2] > b[2])) {
                    return -1;
                } else {
                    return 0;
                }
            });


            for (let i = 0; i < dataList.length; i++) {
                this.names[i] = dataList[i][0];
                this.todays[i] = dataList[i][1];
                this.wholes[i] = dataList[i][2] + dataList[i][1];
            }
        }
    }
};

</script>


<style>

div.table-container {
    margin: 0 10px 10px;
}

.notes {
    color: #eee;
}

a {
    text-decoration: none;
    color: yellow;
    transition: 0.4s;
}

@media (hover: hover) {
    a:hover {
        background-color: rgba(255, 255, 0, 0.2);
    }
}

body {
    margin-top: 0;
    background-color: rgba(17, 17, 17, 0.8);
    font-size: x-large;
    -webkit-app-region: drag;
}

table {
    border-collapse: collapse;
    border-top: solid 2px #afafaf;
    border-left: solid 2px #afafaf;
    border-bottom: solid 2px #afafaf;
    border-right: 0;
    margin: 0;
    width: 450px;
    display: block;
    overflow-x: auto;
}

tr {
    text-align: center;
    border-collapse: collapse;
    color: #eee;
    margin: 0;
    overflow-x: auto;
}

td {
    width: 150px;
    padding: 10px 5px;
}
</style>
