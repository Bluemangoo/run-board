<template>
  <tr>
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
    whole: Number
  }
}
</script>

<style scoped>
tr {
  border-top: solid 2px #afafaf;
}

td {
  border-right: solid 2px #afafaf;
}
</style>