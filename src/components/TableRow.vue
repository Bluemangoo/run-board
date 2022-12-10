<template>
  <tr :class="color">
    <td>{{ name }}</td>
    <td>{{ class_ }}</td>
    <td>{{ today }}</td>
    <td>{{ whole }}</td>
  </tr>
</template>

<script>
export default {
  name: "TableRow",
  props: {
    name: String,
    class_: String,
    today: Number,
    whole: Number,
  },
  data() {
    return {color: "untargeted"}
  },
  watch:{
    whole: {
      handler() {
        if (this.whole >=40){
          this.color="red";
        }
        else if(this.whole>=30){
          this.color="purple";
        }
        else if(this.whole>=20){
          this.color="blue";
        }
        else{
          this.color="common"
        }
      },
      deep: true
    },
  }
}
</script>

<style scoped>
tr {
  border-top: solid 2px #afafaf;
}
.common{
  background-color: rgba(0, 0, 0, 0.0);
}
.blue{
  background-color: rgba(135, 206, 250, 0.5);
}
.purple{
  background-color: rgba(102, 51, 153, 0.5);
}
.red{
  background-color: rgba(255, 0, 0, 0.5);
}
td {
  border-right: solid 2px #afafaf;
}
</style>