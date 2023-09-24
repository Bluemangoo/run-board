(async () => {
    const axios = require("axios")

    let list = [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []];
    const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));


    for (let i = 1; i <= 19; i++) {
        const taskList = []
        for (let j = 1; j <= 50; j++) {
            const str = 20220000 + i * 100 + j;
            taskList.push(axios.get("https://jinhuaschool.smart-run.cn/report/student/index?student_no=" + str)
                .then(r => {
                    const data = JSON.parse(r.data);
                    console.log(str);
                    const lst = list[data["data"]["student"]["classid"] - 7];
                    lst[lst.length] = str;
                }).catch(() => { }))
            // await sleep(10);
        }
        await Promise.all(taskList)
    }

    // await Promise.all(tasklist)
    for(let i=0;i<list.length;i++){
        list[i].sort();
    }
    console.log(list);
})()