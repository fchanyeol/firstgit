<template>
  <div>
    <template>
      <el-table
        :data="list"
        :tree-props="{ children: 'children' }"
        row-key="id"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="菜单编号"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="title"
          label="菜单名称"
          sortable
          width="180"
        ></el-table-column>
        <el-table-column prop="icon" label="菜单图标">
          <template slot-scope="scope">
            <i :class="scope.row.icon"></i>
          </template>
        </el-table-column>
        <el-table-column prop="url" label="菜单地址"></el-table-column>
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
              <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {reqMenueDel} from "../../../util/request"
import {warningAlert} from "../../../util/alert"
export default {
  props: [],
  components: {},
  data() {
    return {};
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
    // 修改菜单
    update(id) {
      // 子传父，通知父组件执行update事件
      this.$emit("update", id);
      // console.log(id);
    },
    // 删除
    del(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // 点击确定删除成功
          reqMenueDel(id).then(res=>{
            if(res.data.code==200){
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.reqChangeList();
            }else{
              warningAlert(res.data.msg);
            }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.reqChangeList();
  },
};
</script>
<style scoped>
</style>