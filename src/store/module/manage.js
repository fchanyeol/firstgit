import {reqManageList,reqManageTotal} from '../../util/request'

// 存放数据
const state={
    list:[],
    // 每页几条
    size:2,
    // 管理员总数
    total:0,
    // 当前页码
    page:1
}
// 修改数据
const mutations={
    // 修改列表
    changeList(state,arr){
        state.list=arr;
    },
    // 修改管理员总数
    changeManageTotal(state,num){
        state.total=num;
    },
    // 修改当前页码
    changeCurrentPage(state,num){
        state.page=num;
    }
}
// 请求
const actions={
    // 请求列表数据
    ChangeManageList(context){
        reqManageList(context.state.size,context.state.page).then(res=>{
            // console.log(res)
            // 如果请求到的list为空，那么页面减一，并再次请求list
            let list=res.data.list?res.data.list:[]
            if(context.state.page>1 && list.length==0){
                context.commit("changeCurrentPage",context.state.page-1);
                // 再次请求list
                context.dispatch("ChangeManageList");
                return 0
            }
            context.commit("changeList",list)
        })
    },
    // 请求管理员总数
    ManageTotal(context){
        reqManageTotal().then(res=>{
            // console.log(res)
            context.commit("changeManageTotal",res.data.list[0].total)
        })
    },
    // 请求修改当前页码
    reqCurrentPage(context,num){
        // 组件修改了页码
        context.commit("changeCurrentPage",num);
        // 获取当前页码的列表，调用ChangeManageList,
        // context里包含commit,dispatch,state,通过dispatch调用action
        context.dispatch('ChangeManageList')
    }
    
}

// 导出数据
const getters={
    list(state){
        return state.list
    },
    total(state){
        return state.total
    },
    size(state){
        return state.size
    },
    page(state){
        return state.page
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