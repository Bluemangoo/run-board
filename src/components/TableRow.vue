<!--suppress CssUnusedSymbol -->
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
        whole: Number
    },
    data() {
        return { color: "common" };
    },
    watch: {
        whole: {
            handler() {
                if (this.whole >= 200) {
                    this.color = "rainbow";
                } else if (this.whole >= 100) {
                    this.color = "gold";
                } else if (this.whole >= 40) {
                    this.color = "red";
                } else if (this.whole >= 30) {
                    this.color = "purple";
                } else if (this.whole >= 20) {
                    this.color = "blue";
                } else {
                    this.color = "common";
                }
            },
            deep: true
        }
    }
};
</script>

<style scoped>
tr {
    border-top: solid 2px #afafaf;
}

.common {
    background-color: rgba(0, 0, 0, 0.0);
}

.blue {
    background-color: rgba(135, 206, 250, 0.5);
}

.purple {
    background-color: rgba(102, 51, 153, 0.5);
}

.red {
    background-color: rgba(255, 0, 0, 0.5);
}

.gold {
    background-color: rgba(255, 215, 0, 0.5);
}

.rainbow {
    background: linear-gradient(to bottom right, rgba(255, 0, 0, 0.5), rgba(255, 165, 0, 0.5), rgba(255, 255, 0, 0.5), rgba(0, 128, 0, 0.5), rgba(0, 255, 255, 0.5), rgba(0, 0, 255, 0.5), rgba(128, 0, 128, 0.5));
}

td {
    border-right: solid 2px #afafaf;
}
</style>