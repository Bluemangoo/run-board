<template>
  <PageHead></PageHead>
  <div class="table-container">
    <table dir="auto">
      <TableHead name="姓名" today="今日新增" whole="本月累计"></TableHead>
      <TableRow v-bind:name="names[0]" v-bind:today="todays[0]" v-bind:whole="wholes[0]"></TableRow>
      <TableRow v-bind:name="names[1]" v-bind:today="todays[1]" v-bind:whole="wholes[1]"></TableRow>
      <TableRow v-bind:name="names[2]" v-bind:today="todays[2]" v-bind:whole="wholes[2]"></TableRow>
      <TableRow v-bind:name="names[3]" v-bind:today="todays[3]" v-bind:whole="wholes[3]"></TableRow>
      <TableRow v-bind:name="names[4]" v-bind:today="todays[4]" v-bind:whole="wholes[4]"></TableRow>
      <TableRow v-bind:name="names[5]" v-bind:today="todays[5]" v-bind:whole="wholes[5]"></TableRow>
      <TableRow v-bind:name="names[6]" v-bind:today="todays[6]" v-bind:whole="wholes[6]"></TableRow>
      <TableRow v-bind:name="names[7]" v-bind:today="todays[7]" v-bind:whole="wholes[7]"></TableRow>
      <TableRow v-bind:name="names[8]" v-bind:today="todays[8]" v-bind:whole="wholes[8]"></TableRow>
      <TableRow v-bind:name="names[9]" v-bind:today="todays[9]" v-bind:whole="wholes[9]"></TableRow>
    </table>
  </div>
</template>


<script>
import TableRow from "./components/TableRow";
import TableHead from "./components/TableHead";
import PageHead from "./components/PageHead";
import axios from "axios";

export default {
  name: 'App',
  components: {
    TableRow,
    TableHead,
    PageHead,
  },
  data() {
    let names = [], todays = [], wholes = [];
    const idList = [20210502, 20210505, 20210506, 20210510, 20210512, 20210513, 20210503, 20210521, 20210523, 20210619, 20210612, 20210704, 20210721, 20210821, 20210806, 20210912, 20210914, 20211109, 20211103, 20211114, 20211115, 20211123, 20211208, 20211205, 20211517, 20211518, 20211611, 20211618, 20211524, 20211427, 20210531, 20210544, 20210535, 20210728, 20210829, 20210837, 20210940, 20211142, 20211237, 20211238, 20211329, 20211333, 20211548, 20211644, 20211047];
    let tmpList = [];
    const day = function () {
      const date = new Date();
      let month = date.getMonth() + 1;
      if (month < 10
      ) {
        month = '0' + month;
      }
      let day = date.getDate();
      if (day < 10) {
        day = '0' + day;
      }
      return date.getFullYear() + '-' + month + '-' + day
    }()
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
    }
  },
  async created() {
    for (let i = 0; i < 10; i++) {
      this.names[i] = "Loading";
    }
    this.names[0] = `Get ${this.tasks[0]}/${this.tasks[1]}`
    {
      const getPage = async (url) => {
        const {data} = await axios.get(url);
        return data;
      }
      let tasks = this.tasks, names = this.names;
      const addTask = () => {
        tasks[1]++;
        names[0] = `Get ${tasks[0]}/${tasks[1]}`;
      }, doneTask = () =>  {
        tasks[0]++;
        names[0] = `Get ${tasks[0]}/${tasks[1]}`;
      }
      const day = this.day, idList = this.idList;
      let dataList = [];
      let dateList = [], dateList2 = [];
      let taskList = [], taskList2 = [];

      for (let i = 0; i < idList.length; i++) {
        dataList[i] = [null, 0.0, 0.0];
        addTask();
        taskList[taskList.length] = getPage("https://jinhuaschool.smart-run.cn/report/student/month?student_no=" + idList[i])
            .then(function (response) {
              let var1 = JSON.parse(response)["data"];
              for (let var2 = 0; var2 < var1.length; var2++) {
                let date = var1[var2]["date"];
                if (date !== day) {
                  dateList[dateList.length] = [i, idList[i], date];
                  addTask();
                }else {
                  dateList2[dateList2.length] = [i];
                  addTask();
                }
              }
              doneTask();
            })
      }
      for (let i = 0; i < idList.length; i++) {
        addTask();
        taskList2[taskList2.length] = getPage("https://jinhuaschool.smart-run.cn/report/student/index?student_no=" + this.idList[i])
            .then(function (response) {
              let res = JSON.parse(response);
              dataList[i][0] = res["data"]["student"]["name"];
              doneTask();
            })
      }

      await Promise.all(taskList);

      for (let i=0;i<dateList2.length;i++){
        taskList2[taskList2.length] = getPage("https://jinhuaschool.smart-run.cn/report/student/record?student_no=" + idList[dateList2[i]] + "&day=" + day)
            .then(function (response) {
              let var1 = JSON.parse(response)["data"];
              for (let var2 = 0; var2 < var1.length; var2++) {
                let var3 = parseFloat(var1[var2]["tolastdistence"]);
                if (var3 >= 1) {
                  dataList[dateList2[i]][1] += var3;
                }
              }
              doneTask();
            })
      }

      for (let i = 0; i < dateList.length; i++) {
        taskList2[taskList2.length] = getPage("https://jinhuaschool.smart-run.cn/report/student/record?student_no=" + dateList[i][1] + "&day=" + dateList[i][2])
            .then(function (response) {
              let var1 = JSON.parse(response)["data"];
              for (let j = 0; j < var1.length; j++) {
                let var3 = parseFloat(var1[j]["tolastdistence"]);
                if (var3 >= 1) {
                  dataList[dateList[i][0]][2] += var3;
                }
              }
              doneTask();
            })
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

    }

    if (this.timer) {
      clearInterval(this.timer);
    } else {
      this.timer = setInterval(() => {
        setTimeout(this.pollData, 0)
      }, 60 * 1000);
    }
  },
  methods: {
    async pollData() {

      const getPage = async (url) => {
        const {data} = await axios.get(url);
        return data;
      }

      const idList = this.idList, day = this.day;
      let dataList = JSON.parse(JSON.stringify(this.tmpList));
      let taskList = []
      for (let i = 0; i < this.idList.length; i++) {
        dataList[i][1] = 0.0;
        taskList[taskList.length] = getPage("https://jinhuaschool.smart-run.cn/report/student/record?student_no=" + idList[i] + "&day=" + day)
            .then(function (response) {
              let var1 = JSON.parse(response)["data"];
              for (let var2 = 0; var2 < var1.length; var2++) {
                let var3 = parseFloat(var1[var2]["tolastdistence"]);
                if (var3 >= 1) {
                  dataList[i][1] += var3;
                }
              }
            })
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


      for (let i = 0; i < dataList.length && i < 10; i++) {
        this.names[i] = dataList[i][0];
        this.todays[i] = dataList[i][1];
        this.wholes[i] = dataList[i][2] + dataList[i][1];
      }
    },
  },
}

</script>


<style>

div.table-container {
  margin: 0 10px 10px;
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
