<template>
  <div>
    <el-button type="primary" class="add" @click="add">添加</el-button>
    <v-list @update="update"></v-list>
    <v-add :info="isShow" ref="xiugai"></v-add>
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from './components/add'
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {
      vList,
      vAdd
  },
  data() {
    return {
      isShow:{
        isShow:false,
        isAdd:true,
      },
    }
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    add(){
      this.$refs.xiugai.clear();
      this.isShow.isShow=true;
      this.isShow.isAdd=true
    },
    update(uid){
      // 弹出弹窗
      this.isShow.isShow = true;
      // 用于判断是添加还是修改
      this.isShow.isAdd = false;
      this.$refs.xiugai.getOne(uid)
    }
  },
  mounted() {},
};
</script>
<style scoped>
.add{
    display: block;
    margin: 20px 0;
}
</style>