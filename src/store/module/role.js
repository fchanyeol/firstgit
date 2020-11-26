import {reqRoleList} from '../../util/request'

// 存放数据
const state={
    list:[]
}
// 修改数据
const mutations={
    changeList(state,arr){
        state.list=arr;
    }
}
// 请求
const actions={
    changeRoleList(context){
        reqRoleList().then(res=>{
            context.commit("changeList",res.data.list)
        })
    }
}

// 导出数据
const getters={
    list(state){
        return state.list
    }
}

export default{
    state,
    mutations,
    actions,
    getters,
    // 命名空间,使用数据时可以直接写 "路由+方法名"
    namespaced: true
}