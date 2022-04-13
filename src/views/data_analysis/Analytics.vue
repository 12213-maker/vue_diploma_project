<template>
  <div class="all">
    <div
      ref="box"
      style="width: 1000px; height: 650px; backgroundcolor: pink"
    ></div>
    <div class="btns">
      <el-button
        size="mini"
        type="success"
        plain
        round
        @click="changeshow('today')"
        >today</el-button
      >
      <el-button
        size="mini"
        type="info"
        plain
        round
        @click="changeshow('tomorrow')"
        >tomorrow</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      legendDate: [
        "Email",
        "Union Ads",
        "Video Ads",
        "Direct",
        "Search Engine",
      ],
      xAisData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      //从接口那边获取到的数据
      randomdata1: [
        { o2: [820, 932, 901, 934, 1290, 1330, 1320] },
        { so2: [320, 332, 301, 334, 390, 330, 320] },
        { co2: [150, 232, 201, 154, 190, 330, 410] },
        { h2o: [220, 182, 191, 234, 290, 330, 310] },
      ],
      randomdata2: {
        o2: [820, 932, 901, 934, 1290, 1330, 1320],
        so2: [320, 332, 301, 334, 390, 330, 320],
        co2: [150, 232, 201, 154, 190, 330, 410],
        h2o: [220, 182, 191, 234, 290, 330, 310],
        hhh: [320, 332, 301, 334, 390, 330, 320],
        fff: [150, 232, 201, 154, 190, 330, 410],
        www: [220, 182, 191, 234, 290, 330, 310],
      },
      data: [
        { value: [820, 932, 901, 934, 1290, 1330, 1320], name: "o2" },
        { value: [320, 332, 301, 334, 390, 330, 320], name: "so2" },
        { value: [150, 232, 201, 154, 190, 330, 410], name: "co2" },
        { value: [220, 182, 191, 234, 290, 330, 310], name: "h2o" },
        { value: [320, 332, 301, 334, 390, 330, 320], name: "hhh" },
      ],
      day1: {
        o2: 1,
        so2: 2,
        co2: 3,
        h2o: 5,
      },
      day2: {
        o2: 1,
        so2: 2,
        co2: 3,
        h2o: 5,
      },
      day3: {
        o2: 1,
        so2: 2,
        co2: 3,
        h2o: 5,
      },
      

      //我是用户申请所有数据
      Alluserinfo:[]
    };
  },
  methods: {
    Echarts() {
      let mycharts = this.$echarts.init(this.$refs.box);
      let option = {
        title: {
          text: "Stacked Line",
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: this.info,
      };
      mycharts.setOption(option);
      mycharts.resize();
    },
    changeshow(value) {
      if (value == "today") {
        this.Echarts(this.option);
        this.$message.success("today");
      } else {
        this.Echarts(this.optioncopy);
        this.$message.success("tomorrow");
      }
    },
  },

  async created() {


    let num = 1
    let nextPage = 2
    while(nextPage!=0){
      let res = await this.$axios({
      url:"/user/application/applications",
      method:'get',
      params:{
        pageNum:num++
      }
    })
    this.Alluserinfo.push(...res.data.data.list)
    nextPage = res.data.data.nextPage
    }

    // let res546 = await this.$axios({
    //   url:"/user/application/applications",
    //   method:'get',
    //   params:{
    //     pageNum:1
    //   }
    // })
    // console.log(res546);
    console.log(this.Alluserinfo , '我是查看所有用户注册申请12324');


    // let res1222 = await this.$axios({
    //   url:"/user/application/query",
    //   method:'get',
    //   params:{
    //     userId:1
    //   }
    // })
    // console.log(res1222 , '我是查看用户申请详情');

    // let res = await this.$axios({
    //     url:"/user/application/offer",
    //     method:'get',
    //     params:{
    //       userId:40
    //     }
    //   })
    // console.log(res,'我是同意注册');


    // let res111 = await this.$axios({
    //     url:"/user/application/reject",
    //     method:'delete',
    //     params:{
    //       userId:31
    //     }
    //   })
    //   console.log(res111,'我是不同意注册');
  },
};
</script>

<style scoped>
.all {
  position: relative;
}
.btns {
  position: absolute;
  top: 0;
  right: 400px;
}
</style>