export const state ={
    // userInfo刷新后数据就没有了，所以如果登录后再刷新也会再次跳到登录页，
    //在这里要判断，刷新后，如果sessionStroge里有数据，则赋值给userInfo
    userInfo:sessionStorage.getItem("userInfo")?JSON.parse(sessionStorage.getItem("userInfo")):
    {}
    // userInfo:{}
}
export const getters ={
    userInfo(state){
        return state.userInfo
    }
}
export const mutations={
    changeUserInfo(state,info){
        state.userInfo=info;
        // 如果info里有数据，则存储一份，如果没有说明是退出，就清空session的数据
        if(info.id){
            // 本地也存储一分
            sessionStorage.setItem("userInfo",JSON.stringify(info));
        }else{
            sessionStorage.removeItem("userInfo");
        }
        
    }
}