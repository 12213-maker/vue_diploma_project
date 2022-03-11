<template>
  <div class="all">
    <!-- 左边 -->
    <div class="left">
      <div class="imgcontain">
        <img src="../../../public/img/3N3VLY0K31YM8@CSQ_JZSQ5.jpg" alt="" />
      </div>
      <div class="title">企业污染排放违法行为时实风险评估系统</div>
    </div>

    <!-- 登录/退出 -->
    <div class="right">
      <el-button v-if="!isLogin" type="primary" @click="handle_login">登录</el-button>
      <el-button v-else type="danger" @click="handle_quit">退出</el-button>
    </div>

    <!-- 退出确认弹框 -->
    <!-- <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>是否确认退出?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClose"
          >确 定</el-button
        >
      </span>
    </el-dialog> -->
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
    handle_login(){
      /* 点击登录跳转到登录页面 */
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
        this.$store.commit("changeLogin");
        this.$message.success('退出成功')
        this.$router.push('/login')
      }else{
        this.$message.info('已取消')
      }


    },
  },
  created() {
    this.isLogin = this.$store.state.isLogin;
  },
};
</script>

<style scoped>
.all {
  /* background-color: aquamarine; */
  background-color: #b3c0d1;
  width: 100%;
  height: 9vh;
  position: relative;
  /* display: flex;
  flex-direction: row; */
}
.left {
  background-color: #b3c0d1;
  position: absolute;
  left: 0;
  height: 9vh;
  display: flex;
  flex-direction: row;
}
.imgcontain {
  width: 9vw;
  height: 9vh;
}
img {
  height: 100%;
  border-radius: 50%;
}
.title {
  color: white;
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