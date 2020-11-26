<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '商品添加' : '商品编辑'"
      :visible.sync="info.isShow"
      @opened="opened">
      <el-form ref="form" :model="form" label-width="80px">
        <!-- 一级分类 -->
        <el-form-item label="一级分类">
          <el-select v-model="form.first_cateid" placeholder="请选择" @change="changeFirst">
            <el-option label="请选择" :value="0" disabled></el-option>
            <el-option
              v-for="item in firstCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 二级分类 -->
        <el-form-item label="二级分类">
          <el-select v-model="form.second_cateid" placeholder="请选择">
            <el-option label="请选择" :value="0"></el-option>
            <el-option
              v-for="item in secondArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 商品名称 -->
        <el-form-item label="商品名称">
          <el-input v-model="form.goodsname"></el-input>
        </el-form-item>
        <!-- 价格 -->
        <el-form-item label="价格">
          <el-input v-model="form.price"></el-input>
        </el-form-item>
        <!-- 市场价格 -->
        <el-form-item label="市场价格">
          <el-input v-model="form.market_price"></el-input>
        </el-form-item>
        <!-- 上传图片 -->
        <el-form-item label="上传图片">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            action="#"
            :on-change="changeFile">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 商品规格 -->
        <el-form-item label="商品规格">
          <el-select v-model="form.specsid" placeholder="请选择" @change="changeSpecs">
            <el-option label="请选择" value="请选择" disabled></el-option>
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 商品属性 -->
        <el-form-item label="商品属性">
          <el-select v-model="form.specsattr" placeholder="请选择" multiple>
            <el-option label="请选择" value="请选择" disabled></el-option>
            <el-option
              v-for="item in specsArr"
              :key="item.id"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 是否新品 -->
        <el-form-item label="是否新品">
          <el-radio :label="1" v-model="form.isnew">是</el-radio>
          <el-radio :label="2" v-model="form.isnew">否</el-radio>
        </el-form-item>
        <!-- 是否热卖 -->
        <el-form-item label="是否热卖">
          <el-radio :label="1" v-model="form.ishot">是</el-radio>
          <el-radio :label="2" v-model="form.ishot">否</el-radio>
        </el-form-item>
        <!-- 状态 -->
        <el-form-item label="状态">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <!-- 商品描述 -->
        <el-form-item label="商品描述">
          <div id="div1">

          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="cancle" @click="cancel">取 消</el-button>
          <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button >
          <el-button type="primary" @click="update" v-else>修 改</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { secondRouters } from "../../../router/index";
import {reqCateList,reqGoodsAdd,reqGoodsUpdate,reqGoodsOne} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
// 引入富文本
import E from "wangeditor"

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname:"",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid:"",
        specsattr:"",
        isnew:1,
        ishot:1,
        status:1
      },
      // 渲染图片
      imageUrl:"",
      // 存放二级分类
      secondArr:[],
      // 存放规格属性
      specsArr: []
    };
  },
  computed: {
    ...mapGetters({
      // 一级分类
      firstCateList: "cate/list",
      // 商品规格
      specsList:"specs/list",
      total:"goods/total"
    }),
  },
  methods: {
    ...mapActions({
      // 获取一级分类
      reqFirstCateList:"cate/changeCateList",
      // 获取商品规格
      reqSpecsList:"specs/changeSpecsList",
      changeGoodsTotal:"goods/changeGoodsTotal",
      changeGoodsList:"goods/changeGoodsList"
    }),
    // 打开动画完成时
    opened(){
      // 加载富文本
      this.editor = new E('#div1');
      // 或者 const editor = new E( document.getElementById('div1') )
      this.editor.create();

      // 设置富文本的内容
      this.editor.txt.html(this.form.description)  

    },
    cancel() {
      this.info.isShow = false;
      this.clear();
    },
    // 点击取消后重置表单
    clear() {
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname:"",
        price: "",
        market_price: "",
        img: "",
        description: "",
        specsid:"",
        specsattr:"",
        isnew:1,
        ishot:1,
        status:1
      };
      this.secondArr = [];
      this.imageUrl = "";
      this.specsArr = [];
    },
    add() {
      // console.log(this.form);
      // 请求之前将富文本的内容添加到form表单中
      this.form.description = this.editor.txt.html();

      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };
      reqGoodsAdd(data).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 取消弹窗并重置form数据
          this.cancel();
          // 重新获取总条数
          this.changeGoodsTotal();
          // 刷新列表
          this.changeGoodsList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取一条数据，将数据信息传给form，并把给form传一个id属性
    getOne(id) {
      reqGoodsOne(id).then((res) => {
        // console.log(res)
        this.form = res.data.list;
        this.form.id = id;
        // 处理图片
        this.imageUrl=this.$imgUrl+res.data.list.img;
        // 通过一级分类处理二级分类
        reqCateList(this.form.first_cateid).then(res=>{
          this.secondArr=res.data.list
        });
        // 处理规格属性
        // this.form.specsattr=JSON.parse(this.form.specsattr);
        // 处理规格属性下拉框
        let obj=this.specsList.find(item=>item.id==this.form.specsid)
        // 将这一条数据的规格属性赋值给specsArr
        // console.log(obj)
        this.specsArr=obj.attrs

      });
    },
    // 修改数据
    update() {
      let data = {
        ...this.form,
        specsattr: JSON.stringify(this.form.specsattr),
      };

      reqGoodsUpdate(data).then((res) => {
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
    changeFile(e) {
      // console.log(e);
      // e.raw图片信息
      // 添加页上传图片和编辑页的上传的图片路径
      this.imageUrl = URL.createObjectURL(e.raw);
      // 传给后台的应该是图片信息
      this.form.img = e.raw
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 改变了一级分类，获取pid为this.form.first_cateid的二级分类
    changeFirst(){
      reqCateList(this.form.first_cateid).then(res=>{
        // console.log(res);
        this.form.second_cateid=""
        this.secondArr=res.data.list;
      })
    },
    // 改变了商品规格
    changeSpecs(){
      // 清空规格属性
      this.specsArr=[];
      this.form.specsattr=[];

      //通过id找到我们选择的那个specsList
      let obj=this.specsList.find(item=>item.id==this.form.specsid)
      // 将这一条数据的规格属性赋值给specsArr
      this.specsArr=obj.attrs
    }
  },
  mounted() {
    if(this.firstCateList.length==0){
      this.reqFirstCateList();
    };
    if (this.specsList.length === 0) {
      // 因为specs数据需要分页的，而goods请求商品规格是不需要分页的。那么我们在调用接口之前传一个值，这个值的作用是判断是否需要分页
      this.reqSpecsList(true);
    };
    this.changeGoodsTotal()
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed black;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>