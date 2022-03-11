<template>
  <!-- 登录成功之后要将token保存到sessionStorage -->
  <div class="all">
    <el-container>
      <el-header><Header /></el-header>
      <el-main>
        <!-- 左边的描述 -->
        <div class="describe">
            <div class="title">生命的总结</div>
            <div >母爱是一滴甘露，亲吻干涸的泥土，它用细雨的温情，用钻石的坚毅，期待着闪着碎光的泥土的肥沃；母爱不是人生中的一个凝固点，而是一条流动的河，这条河造就了我们生命中美丽的情感之景。我们要珍惜生命,每个不曾起舞的日子,都是对生命的辜负</div>
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
          <!-- 邮箱 -->
          <el-form-item prop="email"  label="邮箱名" label-width='100px'>
            <el-input
              v-model="loginForm.email"
            ></el-input>
          </el-form-item>
          <!-- 密码 -->
          <el-form-item prop="password" label="密码" label-width='100px'>
            <el-input
              v-model="loginForm.password"
              type="password"
            ></el-input>
          </el-form-item>
          <!-- 按钮区域 -->
          <el-form-item class="btns">
            <el-button type="primary" @click="resetLoginForm">清空</el-button>
            <el-button type="primary" @click="login">登录</el-button>
            <div class="register">注册</div>
          </el-form-item>
        </el-form>
        </div>

      </el-main>
       <!-- 底部的描述 -->
        <!-- <div class="footer">
          项目人员:张三 李四 王五 铁柱 爱国
        </div> -->
    </el-container>
  </div>
</template>

<script>
import Header from "../Header/Header";
export default {
  name: "Login",
  components: { Header },
  data() {
    return {
      isLogin: false,
      //这是登录表单的数据绑定对象
      loginForm: {
        email: "2822592790@qq.com",
        password: "123456",
      },
      //这是表单的验证规则对象
      loginFormRules: {
        //验证邮箱是否合法
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"],
          },
        ],
        //验证密码是否合法
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          {
            min: 6,
            max: 15,
            message: "长度在 6 到 15 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    /* 将登录成功之后的token,保存到客户端的sessionstorage中*/
    login() {
    //   const confirRustle = await this.$confirm("是否登录?", "登录选项", {
    //     confirmButtonText: "确定",
    //     cancelButtonText: "取消",
    //     type: "warning",
    //   }).catch((err) => err);
    //   // console.log(confirRustle);
    //   if (confirRustle === "cancel") return;
    //   else {
    //     this.$router.push("/home");
    //     this.$message.success("登录成功");
    //     this.$store.commit("changeLogin");
    //   }

    //进行表单验证
    this.$refs.loginFormRef.validate(async (valid) => {
        console.log(valid);
        //先对表单进行验证
        if (!valid) return;
        //验证成功了之后再发送请求,这里还没有接口暂时不写


        this.$router.push('/home')
        this.$message.success("登录成功");
        this.$store.commit("changeLogin");
      });

    },
    //清空按钮
    resetLoginForm(){
        this.loginForm = {}
    }
  },
  created() {
    this.isLogin = this.$store.state.isLogin;
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

.describe{
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
.title{
    font-size: 26px;
    font-weight: 600;
    margin-bottom: 5px;
}
.login_form{
    display: absolute;
    right: 100px;
    /* flex: 1; */
    /* background-color: rgb(226, 196, 196); */
    /* opacity: 1; */
    border: 1px solid rgb(209, 204, 204) ;
    /* background: rgba(0,0,0,.8); */
    padding: 60px 50px 0 0;
    box-shadow: 0 15px 25px rgba(0,0,0,.5);
    width:350px;
    height: 250px;
    min-width: 275px;
    border-radius: 10px;
    box-sizing : border-box;
}
.register{
    color: white;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
}
.contan_title{
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
.contain{
  position: relative;
    /* background-color: rgb(175, 33, 33); */

}
.footer{
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10px;
  color: rgb(206, 205, 205);
  font-size: 20px;
}

</style>
<style >
.el-form-item__label{
color: white ;
}
</style>