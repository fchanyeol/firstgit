<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加商品规格' : '编辑商品规格'"
      :visible.sync="info.isShow">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="规格名称">
          <el-input v-model="form.specsname"></el-input>
        </el-form-item>
        <el-form-item label="规格属性" v-for="(item,index) in attrArr" :key="index">
          <div class="box">
            <el-input v-model="item.value"></el-input>
            <el-button type="primary" @click="addSpecs" v-if="index==0">新增规格属性</el-button>
            <el-button type="danger" @click="delSpecs(index)" v-else>删除</el-button>
          </div>
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
import {reqSpecsAdd,reqSpecsList,reqSpecsOne,reqSpecsUpdate,} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      attrArr:[
        {value:''}
      ],
      form:{
        specsname:'',
        attrs:'[]',
        status:1
      }
    };
  },
  computed: {
    ...mapGetters({
    }),
  },
  methods: {
    ...mapActions({
      changeSpecsList: "specs/changeSpecsList",
      changespecsTotal:"specs/changespecsTotal"
    }),
    // 点击给数组attrArr增加一项
    addSpecs(){
      this.attrArr.push({value:''});
    },
    // 点击删除该项
    delSpecs(idx){
      this.attrArr.splice(idx,1);
    },
    cancel() {
      this.info.isShow = false;
      this.clear();
    },
    // 点击取消后重置表单
    clear() {
      this.form = {
        specsname:'',
        attrs:'[]',
        status:1
      };
      this.attrArr=[{value:''}]
    },
    
    add() {
      // console.log(this.form);
      // console.log(this.attrArr)
      this.form.attrs=JSON.stringify(this.attrArr.map(item=>item.value));
      reqSpecsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 取消弹窗并重置form数据
          this.cancel();
          // 刷新list列表
          this.changeSpecsList();
          // 获取总条数
          this.changespecsTotal();
          //重置数据
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取一条数据，将数据信息传给form，并把给form传一个id属性
    getOne(id) {
      reqSpecsOne(id).then((res) => {
        // console.log(res.data.list[0].attrs)
        this.form = res.data.list[0];
        this.form.id=res.data.list[0].id
        // 显示属性规格
        this.attrArr=JSON.parse(res.data.list[0].attrs).map(item=>({
          value:item
        }))
      });
    },
    // 修改数据
    update() {
      // console.log(this.form.attrs)
      // console.log(this.attrArr)
      this.form.attrs = JSON.stringify(this.attrArr.map(item=>item.value))
      reqSpecsUpdate(this.form).then((res) => {
        console.log(res)
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 取消弹窗并重置form数据
          this.cancel();
          // 刷新list列表
          this.changeSpecsList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
  },
};
</script>
<style scoped>
.box{
  display: flex;
}
</style>