
<template>
  <div class="all">
      <div 
      :class="['item',index==activeIndex?'active':'']" 
      v-for="(item,index) in list" 
      @click="handleclick(item)"
      :key="index">{{item.name}}</div>
  </div>
</template>

<script>
export default {
name:'NavBar',
props:["list"],
data() {
    return {
        activeIndex:0,
    }
},
created(){
    this.list.forEach((item,index)=>{
        if(decodeURI(this.$route.path).search(item.path)!=-1){
            this.activeIndex = index
        }
    })
},
methods:{
    /* 处理nav点击事件 */
    handleclick(item){
        this.activeIndex = item.index
        /* 判断当前的位置 */
        if(this.$route.path===item.parent+item.path)return;
        this.$router.push(item.parent+item.path)
        
    },
}
}
</script>

<style scoped>
.active{
border-bottom: solid 2px red;
line-height: 4vh;
color: rgb(134, 133, 133);
font-size: 18px;
font-weight: 600;
}
.all{
    /* background-color: rgb(255, 255, 255); */
    width: 100%;
    height: 5vh;
    line-height: 5vh;
    display: flex;
    flex-direction: row;
}
.item{
    cursor: pointer;
    margin: 0 20px;
    color: #666;
}
</style>