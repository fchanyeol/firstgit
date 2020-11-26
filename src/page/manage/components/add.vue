<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加管理员' : '编辑管理员'"
      :visible.sync="info.isShow">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="所属角色">
          <el-select v-model="form.roleid" placeholder="--请选择--">
            <el-option label="--请选择--" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="cancle" @click="cancel">取 消</el-button>
          <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
          <el-button type="primary" @click="update" v-else>修 改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {reqManageAdd,reqManageList,reqManageOne,reqManageUpdate,} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form:{
        roleid:0,
        username:'',
        password:'',
        status:1
      }
    };
  },
  computed: {
    ...mapGetters({
      list: "role/list",
    }),
  },
  methods: {
    ...mapActions({
      changeRoleList:"role/changeRoleList",
      reqManageAdd:"manage/reqManageAdd",
      ChangeManageList:"manage/ChangeManageList",
      ManageTotal:"manage/ManageTotal"
    }),
    cancel() {
      this.info.isShow = false;
      this.clear();
    },
    // 点击取消后重置表单
    clear() {
      this.form = {
        roleid:0,
        username:'',
        password:'',
        status:1
      };
    },
    
    add() {
      // console.log(this.form);
      reqManageAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 取消弹窗并重置form数据
          this.cancel();
          // 刷新list列表
          this.ChangeManageList();
          // 获取管理员总条数
          this.ManageTotal();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 决定是目录还是菜单
    changePid() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    // 获取一条数据，将数据信息传给form，并把给form传一个id属性
    getOne(uid) {
      reqManageOne(uid).then((res) => {
        // console.log(res)
        this.form = res.data.list;
        // 密码不能展示出来
        this.form.password=''
      });
    },
    // 修改数据
    update() {
      reqManageUpdate(this.form).then((res) => {
        // console.log(res)
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 取消弹窗并重置form数据
          this.cancel();
          // 刷新list列表
          this.ChangeManageList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    // 如果树形结构的list数据为空，再请求
    if(this.list==''){
      this.changeRoleList()
    }
  },
};
</script>
<style scoped>
</style>