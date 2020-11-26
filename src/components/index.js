import Vue from 'vue'
import vDel from './del.vue'
let obj={
    vDel
}

for(let i in obj){
    Vue.component(i,obj[i])
}