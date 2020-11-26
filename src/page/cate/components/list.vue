<template>
  <div>
    <template>
      <el-table :data="list" row-key="id" :tree-props="{ children: 'children' }" border style="width: 100%" >
        <el-table-column
          prop="pid"
          label="分类编号"
          sortable
          width="180"
        ></el-table-column>
        <el-table-column
          prop="catename"
          label="分类名称"
          sortable
          width="180"
        ></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="$imgUrl+scope.row.img" class="imgBox">
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
    </template>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqCateDel } from "../../../util/request";
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
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      changeCateList:"cate/changeCateList"
    }),
    // 修改菜单
    update(id) {
      // 子传父，通知父组件执行update事件
      this.$emit("update", id);
      // console.log(id);
    },
    // 删除
    del(id) {
      reqCateDel(id).then((res) => {
        if (res.data.code == 200) {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          // 获取列表
          this.changeCateList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.changeCateList()
  },
};
</script>
<style scoped>
.imgBox{
  width: 200px;
  height: 100px;
}
</style>