<template>
  <el-container class="home_class">
    <!-- 头部区域 -->
    <el-header style="height: 9vh;width: 100%;">
      <!-- 这里面可以放一个小图标加上我们项目的名称以及登录退出选项 -->
      <Header />
    </el-header>
    <!-- 页面主体区域 -->
    <el-container class="all">
      <!-- 侧边栏 (可以做一个折叠的效果)-->
      <el-aside width="13.5vw">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu
              background-color="white"
              text-color="#666"
              active-text-color="#409EFF"
              :default-active="$route.path"
              class="el-menu-vertical-demo"
              router
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>企业排污数据</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/data">查看数据</el-menu-item>
                  <el-menu-item index="/search">搜索数据</el-menu-item>
                  <el-menu-item index="/collect">收藏数据</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>用户中心</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/administartor">管理员-权限审批</el-menu-item>
                  <el-menu-item index="/user">用户-我的</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-submenu index="3">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>企业信息</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/home">企业信息查看</el-menu-item>
                  <el-menu-item index="/home">企业信息管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="/analysis">
                <i class="el-icon-setting"></i>
                <span slot="title">数据分析</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
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
      // isCollapse: true,
    };
  },
  methods: {

  },
};
</script>

<style scoped >
.home_class{
  width: 100%;
  height: 100%;
}
.el-header{
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: white;
  color: #333;
  text-align: left;
  line-height: 200px;
  overflow: hidden;
  height: calc(100vh-60px);
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
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
.all{
}
</style>