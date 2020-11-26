<template>
    <div class="login">
        <div class="box">
            <h3>登录</h3>
            <el-input v-model="form.username" placeholder="请输入用户名" class="in"></el-input>
            <el-input v-model="form.password" placeholder="请输入密码" show-password class="in"></el-input>
            <el-button type="primary" class="in" @click="login">登录</el-button>
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {reqManageLogin} from '../../util/request'
import {successAlert,warningAlert} from '../../util/alert'
export default {
  props: [],
  components: {},
  data() {
    return {
      form:{
        username:'',
        password:''
      }
    };
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
    login(){
      reqManageLogin(this.form).then(res=>{
        // console.log(res);
        if(res.data.code==200){
          successAlert(res.data.msg);
          // 存储res.data.list
          this.reqUserInfo(res.data.list)
          // 进入页面
          this.$router.push("/");
        }else{
          warningAlert(res.data.msg)
        }
      })
    }
  },
  mounted() {},
};
</script>
<style scoped>
.login{
    width: 100vw;
    height: 100vh;
    background: linear-gradient(to right,rgba(85,52,69),rgb(49,61,96));
    overflow: hidden;
}
.box{
  width: 400px;
  padding: 20px;
  background: white;
  margin: 100px auto;
  border-radius: 10px;
}
h3{
  padding: 10px;
  text-align: center;
  font-size: 20px;
}
.in{
  width: 300px;
  display: block;
  margin: 20px auto;
}
</style>