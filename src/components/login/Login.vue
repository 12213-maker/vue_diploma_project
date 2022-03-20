<template>
  <!-- 登录成功之后要将token保存到sessionStorage -->
  <div class="all">
    <el-container>
      <el-header><Header /></el-header>
      <el-main>
        <!-- 左边的描述 -->
        <div class="describe">
          <div class="title">生命的总结</div>
          <div>
            母爱是一滴甘露，亲吻干涸的泥土，它用细雨的温情，用钻石的坚毅，期待着闪着碎光的泥土的肥沃；母爱不是人生中的一个凝固点，而是一条流动的河，这条河造就了我们生命中美丽的情感之景。我们要珍惜生命,每个不曾起舞的日子,都是对生命的辜负
          </div>
        </div>

        <!-- 右边的表单 -->
        <div class="contain">
          <div class="contan_title">Login</div>
          <el-form
            ref="loginFormRef"
            :model="loginForm"
            :rules="loginFormRules"
            label-width="80px"
            class="login_form"
          >
            <!-- 手机号 -->
            <el-form-item prop="phoneNumber" label="手机号" label-width="100px">
              <el-input v-model="loginForm.phoneNumber"></el-input>
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password" label="密码" label-width="100px">
              <el-input v-model="loginForm.password" type="password"></el-input>
            </el-form-item>
            <!-- 按钮区域 -->
            <el-form-item class="btns">
              <el-button type="primary" @click="resetLoginForm">清空</el-button>
              <el-button type="primary" @click="login">登录</el-button>
              <div class="register" @click="dialogFormVisible = true">注册</div>
            </el-form-item>
          </el-form>
        </div>
      </el-main>
    </el-container>

    <el-dialog title="用户注册" :visible.sync="dialogFormVisible">
      <el-form
        :model="registerinfo"
        label-position="left"
        label-width="100px"
        style="color: black"
        ref="logonFormRef"
      >
        <el-form-item prop="name" label="用户名">
          <el-input
            v-model="registerinfo.userName"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
          <el-input
            v-model="registerinfo.phoneNumber"
            placeholder="请输入手机号"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password2" label="密码">
          <el-input
            v-model="registerinfo.password2"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password1" label="确认密码">
          <el-input
            v-model="registerinfo.password1"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="role" label="角色">
          <el-input
            v-model="registerinfo.role"
            placeholder="普通用户:1 管理员:2"
          ></el-input>
        </el-form-item>
        <el-form-item prop="cityid" label="城市id">
          <el-input
            v-model="registerinfo.city"
            placeholder="请输入城市id"
          ></el-input>
        </el-form-item>
        <el-form-item prop="reason" label="申请理由">
          <el-input
            v-model="registerinfo.resolution"
            placeholder="请输入申请理由"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="logon">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Header from "../Header/Header";
export default {
  name: "Login",
  components: { Header },
  data() {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };

    return {
      /* 注册弹框 */
      dialogFormVisible: false,
      isLogin: false,
      //注册信息
      registerinfo: {
        userName: "123",
        phoneNumber: "18980530000",
        password2: "245631212",
        password1:"245631212",
        role: 1,
        city: 1,
        resolution: "测试",
      },
      //这是登录表单的数据绑定对象
      loginForm: {
        phoneNumber: "17365575658",
        password: "ppp",
      },
      //这是表单的验证规则对象
      loginFormRules: {
        //验证邮箱是否合法
        phoneNumber: [
          { required: true },
          { validator: checkPhone, trigger: "blur" },
        ],
        //验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },

      logonFormRules: {
        name: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        phone: [{ required: true }, { validator: checkPhone, trigger: "blur" }],
        password2: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 3,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
        role: [{ required: true, message: "请选择角色", trigger: "blur" }],
        cityid: [{ required: true, message: "请选择城市id", trigger: "blur" }],
        reason: [
          { required: true, message: "请输入申请理由", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    /* 将登录成功之后的token,保存到客户端的sessionstorage中*/
    login() {
      //进行表单验证
      this.$refs.loginFormRef.validate(async (valid) => {
        console.log(valid);
        //先对表单进行验证
        if (!valid) return;
        //验证成功了之后再发送请求,这里还没有接口暂时不写

        let res = await this.$request("post", "/user/login", this.loginForm, 1);
        console.log(res);
        //将token保存到sessionStorage
        window.sessionStorage.setItem("token", res.data.data);

        this.$router.push("/home");
        this.$message.success("登录成功");
        this.$store.commit("changeLogin", true);
        window.sessionStorage.setItem("login", true);
      });
    },
    //清空按钮
    resetLoginForm() {
      this.loginForm = {};
    },
    async logon() {
      // //先不进行进行表单验证
      if(this.registerinfo.password2!=this.registerinfo.password1){
        this.$message.error('密码不一致!')
        return;
      }

      this.dialogFormVisible = false;
      this.loginForm = {}
      // let res = await this.$request(
      //   "post",
      //   "/user/logon",
      //   this.registerinfo,
      //   1
      // );
      // console.log(res);
    },
  },
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
  height: 9vh !important;
}

.el-main {
  background-color: #53718f;
  color: white;
  text-align: center;
  line-height: 160px;
  padding: 0;
  background: url(../../../public/img/v2-ffa9e49d90506f5d1f71e8b228821edc_r.jpg)
    no-repeat;
  background-size: cover;
  height: 91vh;
  display: flex;
  flex: row;
  justify-content: space-around;
  position: relative;
  padding-top: 150px;
}

body > .el-container {
  margin-bottom: 40px;
}

.describe {
  /* background-color: rgb(62, 126, 102); */
  /* flex: 1; */
  width: 450px;
  height: 300px;
  line-height: 35px;
  overflow: hidden;
  text-align: left;
  color: white;
  font-size: 17px;
  font-weight: 600;
}
.title {
  font-size: 26px;
  font-weight: 600;
  margin-bottom: 5px;
}
.login_form {
  display: absolute;
  right: 100px;
  /* flex: 1; */
  /* background-color: rgb(226, 196, 196); */
  /* opacity: 1; */
  border: 1px solid rgb(209, 204, 204);
  /* background: rgba(0,0,0,.8); */
  padding: 60px 50px 0 0;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.5);
  width: 350px;
  height: 250px;
  min-width: 275px;
  border-radius: 10px;
  box-sizing: border-box;
}
.register {
  color: white;
  font-size: 14px;
  height: 20px;
  line-height: 20px;
  padding-top: 2px;
  cursor: pointer;
}
.register:hover {
  color: rgb(49, 49, 146);
}
.contan_title {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  color: white;
  font-weight: 600;
  height: 30px;
  line-height: 30px;
}
.contain {
  position: relative;
  /* background-color: rgb(175, 33, 33); */
}
.footer {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10px;
  color: rgb(206, 205, 205);
  font-size: 20px;
}
</style>
<style >
.el-form-item__label {
  /* color: white ; */
}
</style>