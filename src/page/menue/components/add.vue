<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '菜单添加' : '菜单编辑'"
      :visible.sync="info.isShow">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="菜单名称">
          <el-input v-model="form.title"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-select
            v-model="form.pid"
            placeholder="请选择菜单"
            @change="changePid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型">
          <el-radio :label="1" v-model="form.type" disabled>目录</el-radio>
          <el-radio :label="2" v-model="form.type" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" v-if="form.pid == 0">
          <el-select v-model="form.icon" placeholder="--请选择--">
            <el-option
              label="--请选择--"
              value="--请选择--"
              disabled
            ></el-option>
            <el-option v-for="item in icon" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" v-else>
          <el-select v-model="form.url" placeholder="--请选择--">
            <el-option
              label="--请选择--"
              value="--请选择--"
              disabled
            ></el-option>
            <el-option
              v-for="item in secondRouters"
              :key="item.path"
              :label="'/' + item.name"
              :value="'/' + item.path"
            ></el-option>
          </el-select>
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
          <el-button type="primary" @click="add" v-if="info.isAdd"
            >添 加</el-button
          >
          <el-button type="primary" @click="update" v-else>修 改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { secondRouters } from "../../../router/index";
import {reqMenueAdd,reqMenueList,reqMenueOne,reqMenueUpdate,} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        title: "",
        pid: 0,
        type: 1,
        icon: "",
        url: "",
        status: 1,
      },
      secondRouters: secondRouters,
      icon: [
        "el-icon-platform-eleme",
        "el-icon-star-off",
        "el-icon-s-promotion",
      ],
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
    }),
    cancel() {
      this.info.isShow = false;
      this.clear();
    },
    // 点击取消后重置表单
    clear() {
      this.form = {
        title: "",
        pid: 0,
        type: 1,
        icon: "",
        url: "",
        status: 1,
      };
    },
    add() {
      // console.log(this.form);
      reqMenueAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 取消弹窗并重置form数据
          this.cancel();
          // 刷新list列表
          this.reqChangeList();
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
      reqMenueOne(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    // 修改数据
    update() {
      reqMenueUpdate(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 取消弹窗并重置form数据
          this.cancel();
          // 刷新list列表
          this.reqChangeList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>