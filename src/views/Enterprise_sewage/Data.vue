<template>
  <div>
    <NavBar :list="list"/>
      我是企业排污数据
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
            {index:0,path:'/test1',name:'测试一',parent:'/home/data'},
            {index:1,path:'/test2',name:'测试二',parent:'/home/data'}
        ]
      }
    },
}
</script>

<style>

</style>