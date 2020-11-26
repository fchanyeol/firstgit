import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

Vue.use(Router)

// 封装判断函数
function isEnter(path,next){
  // 取出能去的页面
  let menus_url=store.state.userInfo.menus_url;
  if(menus_url.includes(path)){
    next();
  }else{
    next("/")
  }
}
export const secondRouters=[
  {
    path:'menue',
    name:'菜单管理',
    component:()=>import('../page/menue/menue'),
    beforeEnter:(to, from, next) => {
      isEnter("/menue",next);
    }
  },
  {
    path:'role',
    name:'角色管理',
    component:()=>import('../page/role/role'),
    beforeEnter: (to, from, next) => {
      isEnter("/role",next);
    }
  },
  {
    path:'manage',
    name:'管理员管理',
    component:()=>import('../page/manage/manage'),
    beforeEnter: (to, from, next) => {
      isEnter("/manage",next);
    }
  },
  {
    path:'cate',
    name:'商品分类',
    component:()=>import('../page/cate/cate'),
    beforeEnter: (to, from, next) => {
      isEnter("/cate",next);
    }
  },
  {
    path:'specs',
    name:'商品规格',
    component:()=>import('../page/specs/specs'),
    beforeEnter: (to, from, next) => {
      isEnter("/specs",next);
    }
  },
  {
    path:'goods',
    name:'商品管理',
    component:()=>import('../page/goods/goods'),
    beforeEnter: (to, from, next) => {
      isEnter("/goods",next);
    }
  },
  {
    path:'member',
    name:'会员管理',
    component:()=>import('../page/member/member'),
    beforeEnter: (to, from, next) => {
      isEnter("/member",next);
    }
  },
  {
    path:'banner',
    name:'轮播图管理',
    component:()=>import('../page/banner/banner'),
    beforeEnter: (to, from, next) => {
      isEnter("/banner",next);
    }
  },
  {
    path:'seckill',
    name:'秒杀活动',
    component:()=>import('../page/seckill/seckill'),
    beforeEnter: (to, from, next) => {
      isEnter("/seckill",next);
    }
  }
]

let router=new Router({
  routes: [
    {
      path:'/login',
      name:'登录',
      component:()=>import('../page/login/login')
    },
    {
      path:'/',
      component:()=>import('../page/index/index'),
      children:[
        {
          path:'',
          name:'首页',
          component:()=>import('../page/home/home')
        },
        ...secondRouters
      ]
    }
  ]
})

// 登陆拦截/全局前置守卫
router.beforeEach((to, from, next) => {
  // 1、如果去的是登录页就直接进
  if(to.path=='/login'){
    next();
    return
  }
  
  // 2、如果去的是其他页面，验证是否登陆过，如果store里有token则是登陆过
  // console.log(store);
  if(store.state.userInfo.token){
    next();
    return
  }
  next("/login")
  // next()
})


export default router
