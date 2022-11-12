<template>
  <thead>
  <tr>
    <td>{{ name }}</td>
    <td>{{ today }}</td>
    <td>{{ whole }}</td>
  </tr>
  </thead>
</template>

<script>
export default {
  name: "TableRow",
  props: {
    name: String,
    today: String,
    whole: String
  }
}
</script>

<style scoped>

td {
  border-right: solid 2px #afafaf;
}

thead{
  font-weight: bold;
  background-color: rgba(119, 119, 119, 0.8);
}
</style>