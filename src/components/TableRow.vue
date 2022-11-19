<template>
  <tr :class="color">
    <td>{{ name }}</td>
    <td>{{ today }}</td>
    <td>{{ whole }}</td>
  </tr>
</template>

<script>
export default {
  name: "TableRow",
  props: {
    name: String,
    today: Number,
    whole: Number,
  },
  data() {
    return {color: "untargeted"}
  },
  watch:{
    whole: {
      handler() {
        if (this.whole >=20){
          this.color="targeted";
        }
        else{
          this.color="untargeted"
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
.untargeted{
  background-color: rgba(0, 0, 0, 0.0);
}
.targeted{
  background-color: rgba(135, 206, 250, 0.5);
}

td {
  border-right: solid 2px #afafaf;
}
</style>