<template>
  <div>
    <el-button @click="getinfo">测试接口</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info:{
          eName: null,
          eNumber: null,
          provinceId: null,
          cityId: 1,
          pageNum: 1,
        }
    };
  },
  methods: {
    async getinfo() {
      
      let res = await this.$request('/enterprise/query',this.info)
      console.log(res);
    },
    async getallinfo(){
      let res = await this.$request('/enterprise/queryAll')
      console.log(res);
    }

  },
  created(){
    this.getallinfo()
  }
};
</script>

<style>
</style>