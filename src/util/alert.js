import Vue from 'vue'
let vm = new Vue

export const successAlert = (mes) => {
    vm.$message({
        message: mes,
        type: 'success'
    });
}
export const warningAlert = (mes) => {
    vm.$message({
        message: mes,
        type: 'warning'
    })
}
