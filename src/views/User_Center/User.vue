<template>
  <el-main v-loading="loading">
    <div class="profile-wrapper" v-loading="loading">
      <el-row :gutter="40">
        <el-col :xs="24" :sm="24" :md="14" :lg="14" :xl="14">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <div>个人中心</div>

            <!-- 个人资料 -->
            <el-divider content-position="left">个人资料</el-divider>
            <el-form-item label="电话" prop="phone">
              <el-input v-model="form.phone" disabled></el-input>
            </el-form-item>
            <el-form-item label="用户名" prop="userName">
              <el-input v-model="form.userName"></el-input>
            </el-form-item>
            <el-form-item label="用户id" prop="userId">
              <el-input v-model="form.userId" disabled></el-input>
            </el-form-item>
            <el-form-item label="权限" prop="role">
              <el-radio-group v-model="form.role" disabled>
                <el-radio :label="2">管理员</el-radio>
                <el-radio :label="1">普通用户</el-radio>
              </el-radio-group>
            </el-form-item>

            <!-- 详细介绍部分  可删 -->
            <el-divider content-position="left">详细介绍</el-divider>
            <!-- <el-form-item label="备注/说明" prop="desc">
              <el-input
                type="textarea"
                v-model="form.desc"
                maxlength="100"
                show-word-limit
              ></el-input>
            </el-form-item> -->
            <el-form-item label="城市" prop="cityName">
              <el-input v-model="form.cityName" disabled></el-input>
            </el-form-item>
            <el-form-item label="城市id" prop="cityId">
              <el-input-number
                v-model="form.cityId"
                :min="1"
                :max="100"
              ></el-input-number>
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
import { mapGetters } from "vuex";
export default {
  neme: "User",
  computed: {
    ...mapGetters(["allInfo"]),
  },
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      form: {
        phone: "",
        userName: "",
        userId: "",
        cityId: "",
        cityName: "",
        role: null,
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 1,
            max: 7,
            message: "长度在 1 到 7 个字符",
            trigger: "blur",
          },
        ],
        cityId: [
          { required: true, message: "请选择城市Id", trigger: "change" },
          {
            type: "number",
            message: "id必须为数字值",
            trigger: ["blur", "change"],
          },
        ]
      },
      loading: false,
    };
  },
  methods: {
    // 保存
    save() {
      this.$refs["form"].validate((valid) => {
        if (valid) {
          // 调用保存api
          this.loading=true;
          this.$axios({
            url: "/user/update",
            method: "post",
            data: {
              userName: this.form.userName,
              phoneNumber: this.form.phone,
              city: this.form.cityId,
            },
            headers: { Authorization: window.sessionStorage.getItem("token") },
          })
            .then((res) => {
              console.log("第一个看我",res)
              return this.$request(
                "post",
                "/user/login",
                this.$store.state.logindate,
                0
              );
            })
            .then((res) => {
              console.log("看看我",res)
              let user = {};
              user.phone = res.data.data.phone;
              user.userName = res.data.data.userName;
              user.userId = res.data.data.userId;
              user.cityName = res.data.data.cityName;
              user.role = res.data.data.role;
              user.cityId = res.data.data.cityId;
              this.$store.dispatch("pullUserInfo", user);
               Object.assign(this.form, this.allInfo);
              this.$message.success("更新成功")
              console.log("更新成功后的userinfo",this.allInfo)
              this.loading=false
            })
            .catch((err) => {
              this.$message.warning("更新失败:"+err);
              console.log("错了",err)
              this.loading=false
            });
        } else {
          return false;
        }
      });
    },
    // 重置
    reset() {
      console.log("触发了reset!");
      console.log(this.$store.state.user);
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
