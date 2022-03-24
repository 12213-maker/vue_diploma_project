<template>
  <div class="all">
    <!-- 左边 -->
    <div class="left">

      
      <div class="imgcontain" @click="routelogin">
        <img src="../../../public/img/3N3VLY0K31YM8@CSQ_JZSQ5.jpg" alt="" />
      </div>
      <div class="title">企业风险评估系统</div>
    </div>

    <!-- 登录/退出 -->
    <!-- <div class="right">
      <el-button v-if="!isLogin" type="primary" @click="handle_login">登录</el-button>
      <el-button v-else type="danger" @click="handle_quit">退出</el-button>
    </div> -->

  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      isLogin: false,
      // dialogVisible : false,
    };
  },
  methods: {
    routelogin(){
      this.$router.push('/1login2')
    },
    handle_login(){
      /* 点击登录跳转到登录页面 */
      if(this.$route.path=='/login')return 
      this.$router.push('/login')
    },
    /* 点击退出 */
    async handle_quit() {

      // this.dialogVisible = true
      /* 点击取消就退出对话框 */
      const res = await this.$confirm(
        '是否退出登录 ?',
        '提示',
        {
          confirmButtonText:'确认',
          cancelButtonText:'取消',
          type:'warning'
        }
      ).catch(err=>err)
      if(res === 'confirm'){
        this.$store.commit("changeLogin",false);
        this.isLogin = this.$store.state.isLogin
        this.$message.success('退出成功')
        window.sessionStorage.setItem('login',false)
        this.$router.push('/login')
      }else{
        this.$message.info('已取消')
      }


    },
  },
  created() {
    // console.log(this.$store.state.isLogin);
    this.isLogin = this.$store.state.isLogin
    
  },
  // watch:{
  //   isLogin(){
  //     this.isLogin = window.sessionStorage.getItem('login')
  //     console.log(this.isLogin);
  //   }
  // }
};
</script>

<style scoped>
.all {
  /* background-color: aquamarine; */
  /* background-color: #b3c0d1; */
  width: 100%;
  height: 8vh;
  position: relative;
  /* display: flex;
  flex-direction: row; */
}
.left {
  /* background-color: #b3c0d1; */
  position: absolute;
  left: 0;
  height: 8vh;
  display: flex;
  flex-direction: row;
}
.imgcontain {
  cursor: pointer;
  /* width: 9vw; */
  height: 8vh;
}
img {
  height: 100%;
  border-radius: 50%;
}
.title {
  color: rgb(74, 94, 117);
  font-size: 20px;
  font-weight: 600;
  overflow: hidden;
}
.right {
  position: absolute;
  right: 50px;
  height: 9vh;
}
</style>