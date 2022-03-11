<template>
<div class="all">
    <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" 
    router>
  <el-menu-item index="/administartor">我的</el-menu-item>
  <el-submenu index="2">
    <template slot="title">权限审批</template>
    <el-menu-item index="/administartor/unfinished">未审批工单</el-menu-item>
    <el-menu-item index="/administartor/finished">已完成工单</el-menu-item>
    <el-submenu index="2-4">
      <template slot="title">选项4</template>
      <el-menu-item index="2-4-1">选项1</el-menu-item>
      <el-menu-item index="2-4-2">选项2</el-menu-item>
      <el-menu-item index="2-4-3">选项3</el-menu-item>
    </el-submenu>
  </el-submenu>
</el-menu>
  <router-view></router-view>
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