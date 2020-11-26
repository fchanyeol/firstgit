<template>
  <div>
    <template>
      <el-table :data="list" row-key="id" border style="width: 100%">
        <el-table-column prop="id" label="商品编号" width="160">
        </el-table-column>
        <el-table-column prop="goodsname" label="商品名称" width="160">
        </el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="$imgUrl + scope.row.img" class="imgBox" />
          </template>
        </el-table-column>
        <el-table-column prop="rolename" label="是否新品">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" v-if="scope.row.isnew == 1"
                >是</el-button
              >
              <el-button type="info" disabled v-else>否</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="rolename" label="是否热卖">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" v-if="scope.row.ishot == 1"
                >是</el-button
              >
              <el-button type="info" disabled v-else>否</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" v-if="scope.row.status == 1"
                >启用</el-button
              >
              <el-button type="info" disabled v-else>禁用</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="200">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" @click="update(scope.row.id)"
                >编辑</el-button
              >
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
        @current-change="handleCurrentChange">
      </el-pagination>
    </template>
    {{ total }}
    {{ size }}
    {{ page }}
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqGoodsDel } from "../../../util/request";
import { warningAlert } from "../../../util/alert";
export default {
  props: [],
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "goods/list",
      total: "goods/total",
      size: "goods/size",
      page: "goods/page"
    }),
  },
  methods: {
    ...mapActions({
      changeGoodsList: "goods/changeGoodsList",
      changeGoodsTotal: "goods/changeGoodsTotal",
      changeCurrentPage: "goods/changeCurrentPage",
    }),
    // 修改菜单
    update(id) {
      // 子传父，通知父组件执行update事件
      this.$emit("update", id);
      // console.log(id);
    },
    // 删除
    del(id) {
      // 点击确定删除成功
      reqGoodsDel(id)
        .then((res) => {
          if (res.data.code == 200) {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            // 重新获取总条数
            this.changeGoodsTotal();
            // 刷新列表
            this.changeGoodsList();
          } else {
            warningAlert(res.data.msg);
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 获取当前页面的方法
    handleCurrentChange(val) {
      // 将当前页面val传给获取当前页面的请求
      this.changeCurrentPage(val);
    },
  },
  mounted() {
    this.changeGoodsList();
    this.changeGoodsTotal();
  },
};
</script>
<style scoped>
.imgBox {
  width: 150px;
  height: 70px;
}
</style>