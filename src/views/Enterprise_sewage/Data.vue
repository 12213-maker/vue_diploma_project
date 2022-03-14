<template>
  <div>
    <NavBar :list="list"/>
      <router-view></router-view>
  </div>
</template>

<script>
import NavBar from '../../components/NavBar/NavBar'
export default {
    name:'Data',
    components:{NavBar},
    data() {
      return {
        list:[
            {index:0,path:'/echarts',name:'企业排污',parent:'/home/data'},
            {index:1,path:'/test2',name:'企业信息',parent:'/home/data'}
        ]
      }
    },
}
</script>

<style>

</style>