<template>
  <!-- <div class="all">
  <el-menu 
    :default-active="$route.path" 
    class="el-menu-vertical-demo" 
    mode="horizontal" 
    @select="handleSelect" 
    router>
  <el-menu-item index="/administartor">我的</el-menu-item>
  <el-submenu>
    <template slot="title">权限审批</template>
    <el-menu-item index="/administartor/finished">已完成</el-menu-item>
    <el-menu-item index="/administartor/unfinished">待审批</el-menu-item>
  </el-submenu>
</el-menu>
<router-view></router-view>
</div> -->
  <div>
    <el-menu
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      router
    >
      <el-submenu index="2">
        <template slot="title">权限审批</template>
        <el-menu-item index="finished">已通过</el-menu-item>
        <el-menu-item index="unfinished">未通过</el-menu-item>
      </el-submenu>
    </el-menu>
    <el-main>
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
import request from "@/request";
export default {
  name: "Administrator",
  data() {
    return {
      num: 10,
    };
  },
  methods: {
    handleSelect() {},
  },
  async created() {
    // request('get','/application/applications',{
    //   pageNum:1
    // },1).then( res=>console.log(res));
    // let res = await this.$request('get','/user/application/applications',params:{pageNum:1},1);
    let res546 = await this.$axios({
      url: "/user/application/applications",
      method: "get",
      params: {
        pageNum: '1',
      },
    });
    console.log(res546, "我是用户");
  },
};
</script>
  
<style scoped>
.el-main {
  background-color: white;
  color: #333;
  /* text-align: left; */
  line-height: 0%;
  height: 100%;
}
</style>