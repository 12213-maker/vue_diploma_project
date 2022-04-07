<template>
  <el-main>
    <div class="profile-wrapper">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <div>个人中心</div>

            <!-- 个人资料 -->
            <el-divider content-position="left">个人资料</el-divider>
            <el-form-item label="账号" prop="phoneNumber">
              <el-input v-model="form.phoneNumber" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input v-model="form.password" ></el-input>
            </el-form-item>
            <el-form-item label="城市" prop="city">
              <el-input v-model="form.city" ></el-input>
            </el-form-item>

            <!-- 详细介绍部分  可删 -->
            <el-divider content-position="left">详细介绍</el-divider>
            <el-form-item label="备注/说明" prop="desc">
              <el-input
                type="textarea"
                v-model="form.desc"
                maxlength="100"
                show-word-limit
              ></el-input>
            </el-form-item>

            <!-- 保存重置按钮 -->
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
  </el-main>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  neme: "User",
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      form: {
        phoneNumber:"",
        userName:"",
        password:"",
        city:"",
        desc: "",
      },
      rules: {
        phoneNumber: [
          { required: true, message: "请输入账号", trigger: "blur" },
          {
            min: 3,
            max: 16,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 16 个字符",
            trigger: "blur",
          },
        ],
        password:[
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min:3,
            max:10,
            message:'长度在3到10个字符',
            trigger: "blur",
          }
        ],
        city: [{ required: true, message: "请输入城市", trigger: "blur" }],
        desc: [],
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
          // 调用保存api
          this.$request('post','/user/update',{
          userName:this.form.userName,
          password:this.form.password,
          phoneNumber:this.form.phoneNumber,
          city:this.form.city
          }
          ,0)
          .then(() => {
              this.$message.success("修改成功");
              this.doUpdateUser(this.form);
            }).catch((err)=>{ this.$message.warning(err)})
        } else {
          return false;
        }
      });
    },
    // 重置
    reset() {
      Object.assign(this.form, this.allInfo);
    },
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
.el-main {
    background-color: white;
    color: #333;
    /* text-align: left; */
    line-height: 0%;
  }
</style>
