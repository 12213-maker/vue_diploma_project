<template>
  <!-- 可以在这里实现懒加载 -->
  <div class="all">

      <el-input placeholder="哈哈哈" width='300' suffix-icon="el-icon-date"></el-input>

      <div class="Item">
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
  /* background-color: rgb(170, 119, 119); */
}
.Item{
  /* background-color: rgb(240, 242, 245); */
  /* background-color: #666; */
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
  padding-top: 35px;
}
.item{
  width: 20%;
  margin: 15px;
  height: 250px;
  line-height: 50px;
  /* border: 1px solid rgb(131, 129, 129); */
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0 3px 8px 6px rgba(167, 98, 20, 0.06);
}
.item:hover{
  transform: translate(-3px,-3px);
  transition-duration: 0.4s;
  box-shadow: 3px 3px 10px rgb(192, 190, 190);
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
border-start-end-radius: 10px;
border-start-start-radius: 10px;
}
.bottom{
  border-end-end-radius: 10px;
  border-end-start-radius: 10px;
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
  border-radius: 10px;
}
img{
  width: 100%;
  border-radius: 10px;
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