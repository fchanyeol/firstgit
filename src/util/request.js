import axios from 'axios'
import qs from "qs"
// 将localhost:8080挂到vue原型链上
import Vue from "vue"

// 开发环境
Vue.prototype.$imgUrl="http://localhost:3000/";
const baseUrl="/api"

// 上线环境
// let bstUrl = ""
// Vue.prototype.$imgUrl = ""


// 请求拦截
// axios.interceptors.request.use((req)=>{
//     console.group("=========本次的数据是：==========");
//     console.log(req);
//     console.groupEnd("=========结束==========");
//     return req;
// })
// 响应拦截
axios.interceptors.response.use((res)=>{
    console.group("=========本次请求的路径:"+res.config.url);
    console.log(res);
    console.groupEnd("=========结束==========");
    return res;
})


// 菜单管理
// 添加 请求数据
export const reqMenueAdd=(form)=>{
    return axios ({
        url:baseUrl+"/api/menuadd",
        method:'post',
        data:qs.stringify(form)
    })
}

// 请求菜单列表
export const reqMenueList=()=>{
    return axios({
        url:baseUrl+"/api/menulist",
        method:"GET",
        params:{
            istree:true
        }
    })
}

// 获取一条数据
export const reqMenueOne=(id)=>{
    return axios({
        url:baseUrl+"/api/menuinfo",
        method:"GET",
        params:{
            id:id
        }
    })
}

// 修改菜单
export const reqMenueUpdate=(form)=>{
    return axios({
        url:baseUrl+'/api/menuedit',
        method:'POST',
        data:qs.stringify(form)
    })
}

// 删除菜单
export const reqMenueDel=(id)=>{
    return axios({
        url:baseUrl+'/api/menudelete',
        method:'POST',
        data:{
            id:id
        }
    })
}


// 角色管理
// 添加 请求数据
export const reqRoleAdd=(form)=>{
    return axios ({
        url:baseUrl+"/api/roleadd",
        method:'post',
        data:qs.stringify(form)
    })
}

// 请求角色列表
export const reqRoleList=()=>{
    return axios({
        url:baseUrl+"/api/rolelist",
        method:"GET",
    })
}

// 获取一条数据
export const reqRoleOne=(id)=>{
    return axios({
        url:baseUrl+"/api/roleinfo",
        method:"GET",
        params:{
            id:id
        }
    })
}

// 修改角色
export const reqRoleUpdate=(form)=>{
    return axios({
        url:baseUrl+'/api/roleedit',
        method:'POST',
        data:qs.stringify(form)
    })
}

// 删除角色
export const reqRoleDel=(id)=>{
    return axios({
        url:baseUrl+'/api/roledelete',
        method:'POST',
        data:{
            id:id
        }
    })
}

// 管理员管理
// 添加 请求数据
export const reqManageAdd=(form)=>{
    return axios ({
        url:baseUrl+"/api/useradd",
        method:'post',
        data:qs.stringify(form)
    })
}

// 管理员总数
export const reqManageTotal=()=>{
    return axios({
        url:baseUrl+'/api/usercount',
        method:"GET"
    })
}
// 请求管理员列表
export const reqManageList=(size,page)=>{
    return axios({
        url:baseUrl+"/api/userlist",
        method:"GET",
        params:{
            size:size,
            page:page
        }
    })
}

// 获取一条数据
export const reqManageOne=(uid)=>{
    return axios({
        url:baseUrl+"/api/userinfo",
        method:"GET",
        params:{
            uid:uid
        }
    })
}

// 修改管理员
export const reqManageUpdate=(form)=>{
    return axios({
        url:baseUrl+'/api/useredit',
        method:'POST',
        data:qs.stringify(form)
    })
}

// 删除管理员
export const reqManageDel=(uid)=>{
    return axios({
        url:baseUrl+'/api/userdelete',
        method:'POST',
        data:{
            uid:uid
        }
    })
}

// 管理员登录
export const reqManageLogin=(form)=>{
    return axios({
        url:baseUrl+'/api/userlogin',
        method:'POST',
        data:qs.stringify(form)
    })
}

// 商品分类
// 商品分类添加
export const reqCateAdd=(form)=>{
    let data=new FormData();
    for(let i in form){
        data.append(i,form[i])
    }
    return axios ({
        url:baseUrl+"/api/cateadd",
        method:'post',
        data:data
    })
}

// 商品分类列表
export const reqCateList=(pid)=>{
    return axios ({
        url:baseUrl+"/api/catelist",
        method:'get',
        params:{
            pid:pid,
            istree:true
        }
    })
}

// 删除商品分类
export const reqCateDel=(id)=>{
    return axios ({
        url:baseUrl+"/api/catedelete",
        method:'POST',
        data:{
            id:id
        }
    })
}

// 获取一条商品分类
export const reqCateOne=(id)=>{
    return axios ({
        url:baseUrl+"/api/cateinfo",
        method:'GET',
        params:{
            id:id
        }
    })
}

// 修改商品分类
export const reqCateUpdate=(form)=>{
    let data=new FormData();
    for(let i in form){
        data.append(i,form[i])
    }
    return axios ({
        url:baseUrl+"/api/cateedit",
        method:'POST',
        dat:data
    })
}

// 商品规格
// 商品规格添加
export const reqSpecsAdd=(form)=>{
    return axios({
        url:baseUrl+"/api/specsadd",
        method:'POST',
        data:qs.stringify(form)
    })
}

// 商品规格总数
export const reqSpecsTotal=()=>{
    return axios({
        url:baseUrl+'/api/specscount',
        method:"GET"
    })
}

// 商品规格列表
export const reqSpecsList=(params)=>{
    return axios({
        url:baseUrl+"/api/specslist",
        method:"GET",
        params:params
    })
}

// 获取一条商品规格
export const reqSpecsOne=(id)=>{
    return axios({
        url:baseUrl+"/api/specsinfo",
        method:"GET",
        params:{
            id:id
        }
    })
}

// 商品规格修改
export const reqSpecsUpdate=(form)=>{
    return axios({
        url:baseUrl+'/api/specsedit',
        method:'POST',
        data:qs.stringify(form)
    })
}

// 商品规格删除
export const reqSpecsDel=(id)=>{
    return axios({
        url:baseUrl+'/api/specsdelete',
        method:'POST',
        data:{
            id:id
        }
    })
}

// 商品管理
// 商品添加
export const reqGoodsAdd=(form)=>{
    let data=new FormData();
    for(let i in form){
        data.append(i,form[i]);
    }

    return axios({
        url:baseUrl+'/api/goodsadd',
        method:'POST',
        data:data
    })
}

// 商品总数
export const reqGoodsTotal=()=>{
    return axios({
        url:baseUrl+'/api/goodscount',
        method:'GET'
    })
}

// 商品列表
export const reqGoodsList=(params)=>{

    return axios({
        url:baseUrl+'/api/goodslist',
        method:'GET',
        params:params,
    })
}

// 获取一条商品
export const reqGoodsOne=(id)=>{
    return axios({
        url:baseUrl+'/api/goodsinfo',
        method:'GET',
        params:{
            id:id
        }
    })
}

// 商品修改
export const reqGoodsUpdate=(form)=>{
    let data=new FormData();
    for(let i in form){
        data.append(i,form[i]);
    }

    return axios({
        url:baseUrl+'/api/goodsedit',
        method:'POST',
        data:data
    })
}

// 商品删除
export const reqGoodsDel=(id)=>{
    return axios({
        url:baseUrl+'/api/goodsdelete',
        method:'POST',
        data:{
            id:id
        }
    })
}