<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '角色添加' : '角色编辑'"
      :visible.sync="info.isShow"  @close="close">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="form.rolename"></el-input>
        </el-form-item>
        <el-form-item  label="角色权限">
          <el-tree
            :data="list"
            show-checkbox
            node-key="id"
            ref="tree"
            :props="{children: 'children',label: 'title'}">
          </el-tree>
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
import {
  reqRoleAdd,
  reqRoleList,
  reqRoleOne,
  reqRoleUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form:{
        rolename:'',
        menus:'[]',
        status:1
      }
    };
  },
  computed: {
    ...mapGetters({
      list: "menue/list",
    }),
  },
  methods: {
    ...mapActions({
      reqChangeList: "menue/reqChangeList",
      changeRoleList:"role/changeRoleList"
    }),
    cancel() {
      this.info.isShow = false;
      this.clear();
    },
    // 点击取消后重置表单
    clear() {
      this.form = {
        rolename:'',
        menus:'[]',
        status:1
      };
      this.$refs.tree.setCheckedKeys([]);
    },
    close(){
      this.clear();
    },
    add() {
      // console.log(this.form);
      this.form.menus=JSON.stringify(this.$refs.tree.getCheckedKeys());
      this.reqChangeList();
      reqRoleAdd(this.form).then((res) => {
        // console.log(res)
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 取消弹窗并重置form数据
          this.cancel();
          // 刷新list列表
          this.changeRoleList();
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
    getOne(id) {
      reqRoleOne(id).then((res) => {
        // console.log(res)
        this.form = res.data.list;
        this.form.id = id;
        // 设置选中的权限
        this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus));
      });
    },
    // 修改数据
    update() {
      reqRoleUpdate(this.form).then((res) => {
        // console.log(res)
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 取消弹窗并重置form数据
          this.cancel();
          // 刷新list列表
          this.changeRoleList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    // 如果树形结构的list数据为空，再请求菜单
    if(this.list==''){
      this.reqChangeList()
    }
  },
};
</script>
<style scoped>
</style>