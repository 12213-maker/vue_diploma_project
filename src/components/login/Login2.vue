<template>
  <div>
    <div class="all">
      <!-- <div class="cover"></div> -->

      <div class="info">
        <h2 class="glowIn" style="color: rgb(3, 233, 244)">
          企业污染排放违法行为实时风险评估系统设计与实现
        </h2>
        <p style="fontsize: 18px" class="glowIn">
          利用企业排污评估算，对企业污染排放违法行为进行实时风险评估法，精准、有效管控企业污染排放。通过算法获得的企业排污行为结果分析，系统将模型分析的结果实时展示，方便实时监控与管理，引导对具体范围、企业的精准执法。并且以移动软件的形式，实现对企业排污行为的实时监控与报警。
        </p>
      </div>

      <div class="login-box">
        <h2>Login</h2>
        <form>
          <div class="user-box">
            <input
              v-model="loginForm.phoneNumber"
              type="text"
              name=""
              required=""
            />
            <label>phone</label>
          </div>
          <div class="user-box">
            <input
              v-model="loginForm.password"
              type="password"
              name=""
              required=""
            />
            <label>Password</label>
          </div>
          <a href="#" @click="login">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            sign in
          </a>

          <a href="#" @click="dialogFormVisible = true">
            <!-- <span></span>
            <span></span>
            <span></span>
            <span></span> -->
            sign up
          </a>
        </form>
      </div>
    </div>

    <video autoplay muted>
      <source src="../../../public/video/未命名的设计.mp4" type="video/mp4" />
    </video>

    <!-- 注册的弹框 -->
    <el-dialog title="用户注册" :visible.sync="dialogFormVisible">
      <el-form
        :model="registerinfo"
        label-position="left"
        label-width="100px"
        style="color: black"
        ref="logonFormRef"
        :rules="rules"
      >
        <el-form-item prop="userName" label="用户名">
          <el-input
            v-model="registerinfo.userName"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="phoneNumber" label="手机号">
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
        <el-form-item
          label="省份"
          prop="provinceId"
          style="position: relative; left: 0px"
        >
          <el-select
            v-model="selectprovinceid"
            style="left: 0px; position: absolute; width: 620px"
            placeholder="请选择省份"
            @change="cityid"
          >
            <el-option
              v-for="(item, index) in province[0]"
              :key="index"
              :label="item.provinceName"
              :value="item.provinceId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="城市"
          prop="cityId"
          style="position: relative; left: 0px"
        >
          <el-select
            v-model="cityId"
            style="left: 0px; position: absolute; width: 620px"
            no-data-text="请先选择省份"
            placeholder="请选择城市"
          >
            <el-option
              v-for="(item, index) in city[0]"
              :key="index"
              :label="item.cityName"
              :value="item.cityId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="resolution" label="申请理由">
          <el-input
            v-model="registerinfo.resolution"
            placeholder="请输入申请理由"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="logoncancle">取 消</el-button>
        <el-button type="primary" @click="logon">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var glowInTexts = document.querySelectorAll(".glowIn");
    glowInTexts.forEach((glowInText) => {
      let letters = glowInText.textContent.split("");
      glowInText.textContent = "";
      letters.forEach((letter, i) => {
        let span = document.createElement("span");
        span.textContent = letter;
        span.style.animationDelay = `${i * 0.05}s`;
        glowInText.append(span);
      });
    });

    //用户角色的验证
    var validateRole = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请选择角色"));
      } else {
        if (value != 2 && value != 1) {
          return callback(new Error("请在 1 和 2 之间选择"));
        }
        callback();
      }
    };
    //密码的验证
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerinfo.password2 !== "") {
          this.$refs.logonFormRef.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.registerinfo.password2) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
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

    var validateuserName = (rule, value, callback) => {
      if (!value || value.trim() == "") {
        return callback(new Error("用户名不能为空"));
      } else if (value.length < 1 || value.length > 7) {
        return callback(new Error("用户名长度为 1 - 7"));
      } else callback();
    };

    return {
      /* 注册弹框 */
      dialogFormVisible: false,
      isLogin: false,
      //注册信息
      registerinfo: {
        userName: "",
        phoneNumber: "",
        password2: "",
        password1: "",
        role: "",
        city: "",
        resolution: "",
      },

      rules: {
        phoneNumber: [
          { required: true, validator: checkPhone, trigger: "blur" },
        ],
        password2: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        password1: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        resolution: [
          { required: true, message: "请输入申请理由", trigger: "blur" },
        ],
        role: [
          {
            required: true,
            validator: validateRole,
            trigger: "blur",
          },
        ],
        userName: [
          { required: true, validator: validateuserName, trigger: "blur" },
        ],
      },

      //这是登录的数据
      loginForm: {
        phoneNumber: "17365575659",
        password: "ppp",
      },

      //保存所有省份的id
      province: [],
      //选择的省份id
      selectprovinceid: "",
      //保存所有的城市list
      city: [],
      //选择的城市id
      cityId: "",
    };
  },
  methods: {
    /* 将登录成功之后的token,保存到客户端的sessionstorage中*/
    async login() {
      if (this.loginForm.phoneNumber.length != 11)
        this.$message.error("请输入正确的手机号");

      let res = await this.$request("post", "/user/login", this.loginForm, 1);
      res = await this.$request("post", "/user/login", this.loginForm, 0);
      console.log(res, "我是登录");

      //将token保存到sessionStorage
      window.sessionStorage.setItem("token", res.data.data.token);
      //将userid保存到sessionStorage
      window.sessionStorage.setItem("userId", res.data.data.userId);
      window.sessionStorage.setItem("userName", res.data.data.userName);

      //将登录人员的种类登记在vuex中
      let role = res.data.data.role;
      window.sessionStorage.setItem("role", role);
      if (window.sessionStorage.getItem("role") == 1) {
        this.$message.success("登录成功");
      } else this.$message.success("管理员登录成功");
      console.log(window.sessionStorage.getItem("token"));

      this.$router.push("/home");
      // this.$message.success("登录成功");
      this.$store.commit("changeLogin", true);
      window.sessionStorage.setItem("login", true);
    },
    //清空按钮
    resetLoginForm() {
      this.loginForm = {};
    },
    logon() {
      //进行表单验证
      this.$refs.logonFormRef.validate(async (valid) => {
        if (valid) {
          if (this.cityId == "" || this.selectprovinceid == "") {
            this.$message.info("请填写完整信息");
            return;
          }

          let {
            userName,
            phoneNumber,
            password2: password,
            role,
            resolution,
          } = this.registerinfo;
          let city = this.cityId;

          let res = await this.$request(
            "post",
            "/user/logon",
            {
              userName,
              phoneNumber,
              password,
              role,
              city,
              resolution,
            },
            0
          );
          console.log(res);

          console.log(res.data.code, "我是code");

          this.dialogFormVisible = false;
          this.registerinfo = {};
          this.loginForm = {};

          this.cityId = "";
          this.selectprovinceid = "";
          if (res.data.code == 200) this.$message.success("请重新登录");
          else this.$message.warning("该手机号已经注册");
        } else {
          this.message.error("请仔细检查所填写信息是否正确");
          return;
        }
      });
    },

    logoncancle() {
      this.dialogFormVisible = false;
      (this.registerinfo = {
        userName: "",
        phoneNumber: "",
        password2: "",
        password1: "",
        role: "",
        city: "",
        resolution: "",
      }),
        (this.loginForm = {});
    },

    //申请省份
    async sheng() {
      let num = 1;
      let nextPage = 2;
      while (nextPage != 0) {
        let res = await this.$request(
          "post",
          "/province/query",
          { pageNum: num++ },
          0
        );
        nextPage = res.data.data.nextPage;
        this.province.push(res.data.data.list);
      }

      this.$store.commit("changeprovence", this.province);
    },
    //根据省份选择城市
    async cityid() {
      console.log("我被触发了");

      let num = 1;
      let nextPage = 2;
      while (nextPage != 0) {
        let res = await this.$request(
          "post",
          "/city/query",
          {
            pageNum: num++,
            provinceId: this.selectprovinceid,
          },
          0
        );
        nextPage = res.data.data.nextPage;
        this.city = [];
        this.city.push(res.data.data.list);
      }
    },

    
  },
  created() {
    this.sheng();
  },
};
</script>

<style lang="less" scoped>
body {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

p {
  margin: 0em 5em 4em 5em;
}

h1,
p {
  text-align: left;
  line-height: 1.8;
  font-family: Lora, serif;
}

.glowIn {
  color: white;

  span {
    animation: glow-in 0.8s both;
  }
}

@keyframes glow-in {
  from {
    opacity: 0;
  }
  65% {
    opacity: 1;
    text-shadow: 0 0 25px white;
  }
  75% {
    opacity: 1;
  }
  to {
    opacity: 0.7;
  }
}

.info {
  width: 650px;
  position: absolute;
  left: 100px;
  top: 23%;
}

.login-box {
  position: absolute;
  top: 50%;
  left: 75%;
  width: 400px;
  padding: 40px;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.6);
  border-radius: 10px;
}

.login-box h2 {
  margin: 0 0 30px;
  padding: 0;
  color: #fff;
  text-align: center;
}

.login-box .user-box {
  position: relative;
}

.login-box .user-box input {
  width: 100%;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  margin-bottom: 30px;
  border: none;
  border-bottom: 1px solid #fff;
  outline: none;
  background: transparent;
}

.login-box .user-box label {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10px 0;
  font-size: 16px;
  color: #fff;
  pointer-events: none;
  transition: 0.5s;
}

.login-box .user-box input:focus ~ label,
.login-box .user-box input:valid ~ label {
  top: -20px;
  left: 0;
  color: #03e9f4;
  font-size: 12px;
}

.login-box form a {
  position: relative;
  display: inline-block;
  padding: 10px 20px;
  color: #03e9f4;
  font-size: 16px;
  text-decoration: none;
  text-transform: uppercase;
  overflow: hidden;
  transition: 0.5s;
  margin-top: 40px;
  letter-spacing: 4px;
}

.login-box a:hover {
  background: #03e9f4;
  color: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px #03e9f4, 0 0 25px #03e9f4, 0 0 50px #03e9f4,
    0 0 100px #03e9f4;
}

.login-box a span {
  position: absolute;
  display: block;
}

.login-box a span:nth-child(1) {
  top: 0;
  left: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, #03e9f4);
  animation: btn-anim1 1s linear infinite;
}

@keyframes btn-anim1 {
  0% {
    left: -100%;
  }

  50%,
  100% {
    left: 100%;
  }
}

.login-box a span:nth-child(2) {
  top: -100%;
  right: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(180deg, transparent, #03e9f4);
  animation: btn-anim2 1s linear infinite;
  animation-delay: 0.25s;
}

@keyframes btn-anim2 {
  0% {
    top: -100%;
  }

  50%,
  100% {
    top: 100%;
  }
}

.login-box a span:nth-child(3) {
  bottom: 0;
  right: -100%;
  width: 100%;
  height: 2px;
  background: linear-gradient(270deg, transparent, #03e9f4);
  animation: btn-anim3 1s linear infinite;
  animation-delay: 0.5s;
}

@keyframes btn-anim3 {
  0% {
    right: -100%;
  }

  50%,
  100% {
    right: 100%;
  }
}

.login-box a span:nth-child(4) {
  bottom: -100%;
  left: 0;
  width: 2px;
  height: 100%;
  background: linear-gradient(360deg, transparent, #03e9f4);
  animation: btn-anim4 1s linear infinite;
  animation-delay: 0.75s;
}

@keyframes btn-anim4 {
  0% {
    bottom: -100%;
  }

  50%,
  100% {
    bottom: 100%;
  }
}

video {
  position: fixed;
  right: -200px;
  bottom: 0px;
  min-width: 100%;
  min-height: 100%;
  height: auto;
  width: auto;
  z-index: -11;
  object-fit: fill;
}
source {
  min-width: 100%;
  min-height: 100%;
  height: auto;
  width: auto;
}
</style>