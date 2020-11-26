<template>
  <div>
    <el-container class="box">
      <el-aside width="200px" class="left">
        <el-col :span="24">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="rgb(32,34,42)"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened
            router>
            <!-- 首页 -->
            <el-menu-item index="/">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>

            <!-- 循环userInfo里的menus -->
            <div v-for="item in userInfo.menus" :key="item.id">
              <!-- 如果有children的话就是目录  -->
              <el-submenu :index="item.id+''" v-if="item.children">
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span>{{item.title}}</span>
                </template>
                <!-- 目录下的子菜单 -->
                <el-menu-item-group>
                  <el-menu-item v-for="i in item.children" :key="i.id" :index="i.url">{{i.title}}</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <!-- 如果没有children就是菜单 -->
              <el-menu-item :index="item.url" v-else>{{item.title}}</el-menu-item>
            </div>
            <!-- <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>系统设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/menue">菜单管理</el-menu-item>
                <el-menu-item index="/role">角色管理</el-menu-item>
                <el-menu-item index="/manage">管理员管理</el-menu-item>
              </el-menu-item-group>
            </el-submenu> -->
            <!-- 商城管理 -->
            <!-- <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商城管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/cate">商品分类</el-menu-item>
                <el-menu-item index="/specs">商品规格</el-menu-item>
                <el-menu-item index="/goods">商品管理</el-menu-item>
                <el-menu-item index="/member">会员管理</el-menu-item>
                <el-menu-item index="/banner">轮播图管理</el-menu-item>
                <el-menu-item index="/seckill">秒杀活动</el-menu-item>
              </el-menu-item-group>
            </el-submenu> -->
          </el-menu>
        </el-col>
      </el-aside>
      <!-- 头部 -->
      <el-container>
        <el-header class="header">
          <span>{{userInfo.username}}</span>
          <el-button @click="out">退出</el-button>
        </el-header>
        <!-- 主体 -->
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <!-- 二级路由出口 -->
            <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      userInfo:"userInfo"
    }),
  },
  methods: {
    ...mapActions({
      reqUserInfo:"reqUserInfo"
    }),
    out(){
      // 清空userInfo
      this.reqUserInfo({});
      // 跳到登录页
      this.$router.push("/login");
    }
  },
  mounted() {
    // this.reqUserInfo()
  },
};
</script>
<style scoped>
.header {
  height: 100px;
  background: rgb(181, 194, 211);
  text-align: right;
  line-height: 80px;
}
.box {
  height: 100vh;
}
.left {
  height: 100vh;
  background-color: rgb(21, 23, 31);
}
</style>