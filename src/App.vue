<template>
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
import TableRow from "@/components/TableRow";
import TableHead from "@/components/TableHead";
import axios from "axios";
import { response } from "express";

// import "@/static/renderer"

export default {
  name: 'App',
  components: {
    TableRow,
    TableHead,
  },
  data() {
    let names = [], todays = [], wholes = [];
    const idList=[20211109];
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
    pollData() {
      for (let i = 0; i < 10; i++) {
        this.names[i]="我是名字"
      }
      // let dataList=[]
      for(let i=0;i<this.idList.length;i++){
        let k=[];

        axios.get("https://jinhuaschool.smart-run.cn/report/student/index?student_no="+this.idList[i])
        .then(response=>(k[0]=response))
        .catch((error)=>(console.log(error)));

        const date=new Date()
        axios.get("jinhuaschool.smart-run.cn/report/student/record?student_no="+this.idList[i]+"&day="+date.getFullYear+'-'+date.getMonth+'-'+date.getDate)
        .then(response=>(k[1]=response))
        .catch((error)=>(console.log(error)));

        this.names[i]=k;
      }
    }
  },
}

</script>


<style>

div.table-container {
  margin: 10px;
}

body {
  margin-top: 20px;
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
  /*margin: 16px 0;*/
  /*border: 0;*/
  margin: 0;
  /*width: auto;*/
  overflow-x: auto;
}

td {
  width: 150px;
  padding: 10px 5px;
}
</style>
