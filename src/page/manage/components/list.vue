<template>
  <div>
    <template>
      <el-table :data="list" row-key="uid" border style="width: 100%">
        <el-table-column
          prop="id"
          label="用户编号"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="username"
          label="用户名"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="rolename"
          label="所属角色"
          width="180"
        ></el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
              <el-button type="info" disabled v-else>禁用</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" @click="update(scope.row.uid)">编辑</el-button>
              <v-del @delete="del(scope.row.uid)"></v-del>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="size"
        @current-change="handleCurrentChange">
      </el-pagination>
    </template>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqManageDel } from "../../../util/request";
import { warningAlert } from "../../../util/alert";
import "../../../components/index";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "manage/list",
      total:"manage/total",
      size:"manage/size",
      page:"manage/page"
    }),
  },
  methods: {
    ...mapActions({
      ChangeManageList: "manage/ChangeManageList",
      ManageTotal:"manage/ManageTotal",
      reqCurrentPage:"manage/reqCurrentPage"
    }),
    // 修改菜单
    update(uid) {
      // 子传父，通知父组件执行update事件
      this.$emit("update", uid);
      // console.log(id);
    },
    // 删除
    del(id) {
      reqManageDel(id).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          // 重新获取总条数
          this.ManageTotal();
          // 获取列表
          this.ChangeManageList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取当前页面的方法
    handleCurrentChange(val) {
      // 将当前页面val传给获取当前页面的请求
      this.reqCurrentPage(val);
    }
  },
  mounted() {
    this.ChangeManageList();
    this.ManageTotal();
  },
};
</script>
<style scoped>
</style>