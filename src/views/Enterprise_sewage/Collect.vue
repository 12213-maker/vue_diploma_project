<template>
  <!-- 可以在这里实现懒加载 -->
  <div class="all">
      <div class="item" v-for="(item,index) in collectlist" :key="index">
        
        <div class="top">
          <div class="img"><img src="../../../public/img/3N3VLY0K31YM8@CSQ_JZSQ5.jpg" alt=""></div>
          <div class="left">
            <div class="title">{{item.name}}</div>
        <div class="address">{{item.province}}</div>
        <div class="status">检测中</div>
          </div>
        </div>
        <div class="bottom">
          <div class="showmore" @click="routerpush">查看详情</div> 
          <i v-if="!iscollect" @click="handletap(1)" class=" i1 el-icon-star-off"></i>
          <i v-else @click="handletap(0)" class=" i1 el-icon-star-on"></i>
        </div>
      </div>
    
      
  </div>
</template>

<script>
export default {
    name:'Collect',
    data() {
      return {
        collectlist:[],
        iscollect:true
      }
    },
    methods: {
      routerpush(){
        this.$router.push('/home')
      },
      handletap(value){
      // console.log(value);
      if(value){
        this.iscollect = true
        this.$message.success('收藏成功')
        this.$store.commit('changeIsCollect',true)
      }
      else {
         this.iscollect = false
        this.$message.info('取消收藏')
        this.$store.commit('changeIsCollect',false)
      }
    }
    },
    created(){
      this.collectlist = this.$store.state.collectList
    }
}
</script>

<style scoped>
.all{
  background-color: rgb(232, 241, 238);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 5px;
  /* justify-content: center; */
  padding-left: 13px;
}
.item{
  background-color: white;
  /* flex: 1; */
  width: 20vw;
  height: 250px;
  line-height: 50px;
  border: 1px solid rgb(131, 129, 129);
  margin: 0.5vw;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}
.item:hover{
  transform: translate(-3px,-3px);
  box-shadow: 3px 3px 10px rgb(131, 129, 129);
}
.i1{
  font-size: 24px;
  /* background-color: pink; */
}
.top{
background-color: pink;
flex: 5;
display: flex;
flex-direction: row;

}
.bottom{
background: #bfa;
/* flex: 2; */
border-top: 1px solid #666;
display: flex;
flex-direction: row;
justify-content: space-between;
padding: 0 10px;
align-items: center;
height: 20%;
}
.img{
  width: 50%;
}
img{
  width: 100%;
  }

.title{
  font-size: 22px;
  font-weight: 600;
}
.status{

}
.showmore{
  cursor: pointer;
}
</style>