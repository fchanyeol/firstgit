<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加分类' : '编辑分类'"
      :visible.sync="info.isShow">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="上级分类">
          <el-select v-model="form.pid" placeholder="--请选择--">
            <el-option label="--请选择--" value="--请选择--" disabled></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称">
          <el-input v-model="form.catename"></el-input>
        </el-form-item>
        <!-- 上传图片 -->
        <el-form-item label="上传图片" v-if="form.pid!=0">
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
  reqCateAdd,
  reqCateList,
  reqCateOne,
  reqCateUpdate,
} from "../../../util/request";
import { successAlert, warningAlert } from "../../../util/alert";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      imageUrl: "",
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
    };
  },
  computed: {
    ...mapGetters({
      list:"cate/list"
    }),
  },
  methods: {
    ...mapActions({
      changeCateList:"cate/changeCateList"
    }),
    cancel() {
      this.info.isShow = false;
      this.clear();
    },
    // 点击取消后重置表单
    clear() {
      this.form = {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      };
      this.imageUrl="";
    },
    add() {
      // console.log(this.form);
      reqCateAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 取消弹窗并重置form数据
          this.cancel();
          // 刷新list列表
          this.changeCateList();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    // 获取一条数据，将数据信息传给form，并把给form传一个id属性
    getOne(id) {
      reqCateOne(id).then((res) => {
        // console.log(res)
        this.form = res.data.list;
        this.form.id=id;
        this.imageUrl=this.$imgUrl+res.data.list.img;
      });
    },
    // 修改数据
    update() {
      reqCateUpdate(this.form).then((res) => {
        // console.log(res)
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          // 取消弹窗并重置form数据
          this.cancel();
          // 刷新list列表
          this.ChangeManageList();
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
  },
  mounted() {
  },
};
</script>
<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
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