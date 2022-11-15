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

    return {
      names,
      todays,
      wholes,
      idList,
      polling: null
    }
  },
  created() {
    this.pollData()
    if (this.timer) {
      clearInterval(this.timer)
    } else {
      this.timer = setInterval(() => {
        setTimeout(this.pollData, 0)
      }, 100000000)
    }
  },
  methods: {
    async pollData() {

      const getPage = async (url) => {
        const {data} = await axios.get(url, {})
        return data
      }

      for (let i = 0; i < 10; i++) {
        this.names[i] = "Loading"
      }
      let dataList = []
      for (let i = 0; i < this.idList.length; i++) {

        let response;

        response = await getPage("https://jinhuaschool.smart-run.cn/report/student/index?student_no=" + this.idList[i])

        let res = JSON.parse(response);
        let k = []
        k[0] = res["data"]["student"]["name"];
        try {
          k[2] = parseFloat(res["data"]["process"][0]["distance"]);
        } catch (ex) {
          k[2] = 0
        }

        const date = new Date()
        response = await getPage("https://jinhuaschool.smart-run.cn/report/student/record?student_no=" + this.idList[i] + "&day=" + date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate())

        try {
          k[1] = parseFloat(JSON.parse(response)["data"]["length"]);
        } catch (ex) {
          k[1] = 0.0
        }
        dataList[i] = k;
      }


      dataList.sort((a,b)=>{
        if(a[1]<b[1]||(a[1]===b[1]&&a[2]<b[2])){
          return 1;
        }else if(a[1]>b[1]||(a[1]===b[1]&&a[2]>b[2])){
          return -1;
        }else{
          return 0;
        }
      });


      for (let i = 0; i < dataList.length && i < 10; i++) {
        this.names[i] = dataList[i][0];
        this.todays[i] = dataList[i][1];
        this.wholes[i] = dataList[i][2];
      }
    }
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
