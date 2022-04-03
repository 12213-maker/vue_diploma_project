<template>
  <el-container class="home_class">
    <el-aside>
        <div class="toggle-button"  @click="isCollapse=!isCollapse">
          <i v-if="isCollapse" class="el-icon-s-unfold"></i>
          <i v-else class="el-icon-s-fold"></i>
          </div>
        <el-row class="tac">
          <el-col :span="12">
            <el-menu
              :collapse="isCollapse"
              background-color="white"
              text-color="#666"
              active-text-color="#409EFF"
              :default-active="this.parentRoute"
              class="el-menu-vertical-demo"
              router
              unique-opened
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-document-copy"></i>
                  <span>企业排污数据</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item @click="handleclick('/home/data')" index="/home/data"><i class="el-icon-tickets"></i>查看数据</el-menu-item>
                  <el-menu-item @click="handleclick('/home/search')" index="/home/search"><i class="el-icon-zoom-in"></i>搜索数据</el-menu-item>
                  <el-menu-item @click="handleclick('/home/collect')" index="/home/collect"><i class="el-icon-star-off"></i>收藏数据</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-user-solid"></i>
                  <span>用户中心</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item @click="handleclick('/home/administartor')" index="/home/administartor"> <i class="el-icon-s-check"></i> 管理员-权限审批</el-menu-item>
                  <el-menu-item @click="handleclick('/home/user')" index="/home/user"><i class="el-icon-user"></i>用户-我的</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>企业信息</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item @click="handleclick('/home/data')" index="/home">企业信息查看</el-menu-item>
                  <el-menu-item @click="handleclick('/home/data')" index="/home">企业信息管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item @click="handleclick('/home/analysis')" index="/home/analysis">
                <i class="el-icon-setting"></i>
                <span slot="title">数据分析</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
     
      
    <!-- 页面主体区域 -->
    <el-container class="all">
      <!-- 头部区域 -->
    <el-header style="height: 8vh;width: 100%;">
      <!-- 这里面可以放一个小图标加上我们项目的名称以及登录退出选项 -->
      <Header />
    </el-header>
     

    
    
      <!-- 右侧内容区域 -->
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from "../components/Header/Header";
export default {
  name: "home",
  components: { Header },
  data() {
    return {
      // //如果是第一次访问
      // first:0,


      // isCollapse: true,
      // defaultActive:'',
      parentRoute:'/home/data',
      isCollapse:false
    };
  },
  methods: {
    handleclick(path){
      this.parentRoute = path
      window.sessionStorage.setItem('path',path)
    }
  },
  created(){
    this.parentRoute = window.sessionStorage.getItem('path')

    // //修改state中的登录次数
    // this.$store.commit('changeIsFirst',this.first++)
  }
};
</script>

<style scoped >
.home_class{
  width: 100%;
  height: 100%;
}
.el-header{
  background-color: white;
  color: #333;
  text-align: center;
  line-height: 8vh;
}

.el-aside {
  background-color: rgb(48, 65, 86);
  color: #333;
  text-align: left;
  line-height: 200px;
  overflow: hidden;
  height: calc(100vh-60px);
  width: auto !important;

  /* min-height: 41px; */
}
.el-aside[data-v-fae5bece]{
  line-height: 30px;
}

.toggle-button{
  color: rgb(191, 203, 217);
  text-align: center;
  cursor: pointer;
}

.el-menu ,.el-menu-item{
  background-color: rgb(48, 65, 86) !important;
  border-right: none;
  /* color: rgb(191, 203, 217); */
}


.el-main {
  background-color: rgb(240, 242, 245);
  color: #333;
  text-align: center;
  /* line-height: 160px; */
  padding: 0;
  /* overflow: hidden; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.is-active{
  color:rgb(57, 132, 209) !important;
}

</style>
<style>
.el-submenu__title,.el-menu-item-group__title,.el-menu-item{
background-color: rgb(48, 65, 86) !important;
color: rgb(191, 203, 217) !important;
  }
</style>