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


export default {
  name: 'App',
  components: {
    TableRow,
    TableHead,
  },
  data() {
    let names = [], todays = [], wholes = [];
    return {
      names,
      todays,
      wholes,
      polling: null
    }
  },
  methods : {
    pollData(){
      this.polling = setInterval(function(){
        // get your datat here
      }, 5*60*1000)
    }
  },
  created () {
    this.pollData()
  }
}

</script>


<style>

div.table-container {
  margin: 10px;
}

body {
  background-color: rgba(17, 17, 17, 0.8);
}

table {
  border-collapse: collapse;
  border-top: solid 2px #afafaf;
  border-left: solid 2px #afafaf;
  border-bottom: solid 2px #afafaf;
  border-right: 0;
  margin: 0;
  width: 300px;
  display: block;
  overflow-x: auto;
}

tr {
  border-collapse: collapse;
  color: #eee;
  /*margin: 16px 0;*/
  /*border: 0;*/
  margin: 0;
  /*width: auto;*/
  overflow-x: auto;
}

td {
  width: 100px;
  padding: 10px 5px;
}
</style>
