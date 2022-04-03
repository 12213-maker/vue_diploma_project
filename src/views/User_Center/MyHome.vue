<template>
  <div class="profile-wrapper">
    <el-row :gutter="40">
      <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
        <el-form ref="form" :model="form" :rules="rules" label-width="100px">
          <div>个人中心</div>
          <el-divider content-position="left">个人资料</el-divider>
          <el-form-item label="账号" prop="phone">
            <el-input v-model="form.phone" disabled></el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio-group v-model="form.sex">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input-number
              v-model="form.age"
              :min="1"
              :max="100"
            ></el-input-number>
          </el-form-item>
          <!-- 详情介绍 -->
          <el-divider content-position="left">详细介绍</el-divider>
          <el-form-item label="备注/说明" prop="desc">
            <el-input
              type="textarea"
              v-model="form.desc"
              maxlength="100"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="城市" prop="city">
            <el-input v-model="form.city"></el-input>
          </el-form-item>
          <!-- 保存按钮 -->
          <el-form-item>
            <el-button type="primary" @click.stop="save">保存</el-button>
            <el-button @click.stop="reset">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col class="hidden-sm-and-down" :md="8" :lg="8" :xl="8">
        <el-divider class="icon" content-position="left">头像</el-divider>
        <el-avatar :size="200" :src="circleUrl"></el-avatar>
        <br />
      </el-col>
    </el-row>
    <!-- <my-upload v-model="show" @crop-success="cropSuccess"></my-upload> -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
// import myUpload from 'vue-image-crop-upload'
export default {
  // components: {
  //   myUpload
  // },
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      show: false,
      currentDate: "",
      form: {
        phone: "",
        name: "",
        sex: null,
        age: 1,
        city: "",
        desc: "",
      },
      rules: {
        phone: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
        sex: [
          {
            required: true,
            message: "请选择性别",
            trigger: ["blur", "change"],
          },
        ],
        age: [
          { required: true, message: "请选择年龄", trigger: "change" },
          {
            type: "number",
            message: "年龄必须为数字值",
            trigger: ["blur", "change"],
          },
        ],
        // type: [
        //   { required: true, message: '最少选择一种技术类型', trigger: ['blur', 'change'] }
        // ],
        city: [{ required: true, message: "请输入城市", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters(["allInfo"]),
  },
  methods: {
    ...mapActions(["doUpdateUser"]),
    // 保存
    save() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // const loading = this.$loading({
          //   lock: true
          // })
          // 调用保存api
          this.doUpdateUser(this.form)
            .then(() => {
              this.$message.success("修改成功");
            })
            .finally(() => {
              loading.close();
            });
        } else {
          return false;
        }
      });
    },
    // 重置
    reset() {
      this.form = Object.assign(this.form, this.allInfo);
    },
    // closeDialog() {
    //   this.show = false
    // },
    // cropSuccess(imgDataUrl, field) {
    //   console.log(field)
    //   // this.form.avatar = imgDataUrl
    //   // this.SET_AVATAR(imgDataUrl)
    //   // const loading = this.$loading({
    //   //   lock: true
    //   // })
    // }
  },
  created() {
    this.reset();
  },
};
</script>

<style scoped>
.profile-wrapper {
  padding: 10px 20px;
}
</style>
