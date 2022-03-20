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

  router>
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
export default {
    name:'Administrator',
    data(){
      return{
        num:10
      }
    },
    methods:{
      handleSelect(){}
    }
}
</script>
  
<style scoped>

.el-main {
    background-color: white;
    color: #333;
    /* text-align: left; */
    line-height: 0%;
  }
</style>