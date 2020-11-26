import {reqGoodsList,reqGoodsTotal} from '../../util/request'

// 存放数据
const state={
    list:[],
    // 总条数
    total:0,
    // 一页显示几条数据
    size:2,
    // 当前页
    page:1
}
// 修改数据
const mutations={
    // 修改列表
    changeList(state,arr){
        state.list=arr;
    },
    // 修改商品规格总数
    goodsTotal(state,num){
        state.total=num;
    },
    // 当前页
    currentPage(state,num){
        state.page=num;
    }
}
// 请求
const actions={
    // 请求列表数据
    changeGoodsList(context){
        reqGoodsList({page:context.state.page,size:context.state.size}).then(res=>{
            // console.log(res);
            // 如果list里没有数据就让list为[]
            let list=res.data.list?res.data.list:[];
            // 如果list为[]，让当前页面减一
            if(context.state.page!=1 && list.length==0){
                context.commit("currentPage",context.state.page-1);
                // 再次请求list
                context.dispatch('changeGoodsList');
                return
            }
            // 处理list里attrs中的数据
            // forEach 操作每一项，返回一个操作后的新数组
            // list.forEach(item=>item.attrs=JSON.parse(item.attrs));
            // console.log(list);
            context.commit("changeList",list)
        })
    },
    // 请求总数
    changeGoodsTotal(context){
        reqGoodsTotal().then(res=>{
            console.log(res,234567890);
            context.commit("goodsTotal",res.data.list[0].total)
        })
    },
    // 请求修改当前页码
    changeCurrentPage(context,num){
        context.commit("currentPage",num);
        // 再次获取当前页码的列表
        context.dispatch('changeGoodsList');
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