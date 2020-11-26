<template>
  <div>
    <template>
      <el-table :data="list" row-key="id" border style="width: 100%">
        <el-table-column
          prop="id"
          label="规格编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="specsname"
          label="规格名称"
          width="180">
        </el-table-column>
        <el-table-column prop="rolename" label="规格属性" width="180">
          <template slot-scope="scope">
            <div>
              <el-tag v-for="(item,index) in scope.row.attrs" :key="index">{{item}}</el-tag>
            </div>
          </template>
        </el-table-column>
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
              <el-button type="primary" @click="update(scope.row.id)">编辑</el-button>
              <v-del @delete="del(scope.row.id)"></v-del>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        :page-size="size"
        @current-change="handleCurrentChange"
        >
      </el-pagination>
    </template>
    {{total}}
    {{size}}
    {{page}}
  </div>
 
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqSpecsDel } from "../../../util/request";
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
      list: "specs/list",
      total:"specs/total",
      size:"specs/size",
      page:"specs/page"
    }),
  },
  methods: {
    ...mapActions({
      changeSpecsList: "specs/changeSpecsList",
      changespecsTotal:"specs/changespecsTotal",
      changeCurrentPage:"specs/changeCurrentPage"
    }),
    // 修改菜单
    update(id) {
      // 子传父，通知父组件执行update事件
      this.$emit("update", id);
      // console.log(id);
    },
    // 删除
    del(id) {
      reqSpecsDel(id).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          // 重新获取总条数
          this.changespecsTotal();
          // 获取列表
          this.changeSpecsList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取当前页面的方法
    handleCurrentChange(val) {
      // 将当前页面val传给获取当前页面的请求
      this.changeCurrentPage(val);
    }
  },
  mounted() {
    this.changeSpecsList();
    this.changespecsTotal();
  },
};
</script>
<style scoped>
</style>