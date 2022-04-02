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
      xAisData:  ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      //从接口那边获取到的数据
      randomdata1:[
        {o2:[820, 932, 901, 934, 1290, 1330, 1320],},
        {so2:[320, 332, 301, 334, 390, 330, 320],},
        {co2:[150, 232, 201, 154, 190, 330, 410],},
        {h2o:[220, 182, 191, 234, 290, 330, 310],},
      ],
      randomdata2:[
        {o2:[820, 932, 901, 934, 1290, 1330, 1320],},
        {so2:[320, 332, 301, 334, 390, 330, 320],},
        {co2:[150, 232, 201, 154, 190, 330, 410],},
        {h2o:[220, 182, 191, 234, 290, 330, 310],},
        {hhh:[320, 332, 301, 334, 390, 330, 320],},
        {fff:[150, 232, 201, 154, 190, 330, 410],},
        {www:[220, 182, 191, 234, 290, 330, 310],},
      ],
      day1:{
        o2:1,
        so2:2,
        co2:3,
        h2o:5,
      },
      day2:{
        o2:1,
        so2:2,
        co2:3,
        h2o:5,
      },
      day3:{
        o2:1,
        so2:2,
        co2:3,
        h2o:5,
      }
    };
  },
  methods: {
    getseries(){
      let series=[]
      for(let attr in this.randomdata2){
        // console.log(this.randomdata2[attr]);
        for(let attr2 in this.randomdata2[attr]){
          //这个是每一项的循环值
          console.log(this.randomdata2[attr][attr2]);
          console.log(attr2);

        }
        // console.log(this.randomdata2[attr]);
      }


      // this.randomdata2.forEach((item)=>{
      //   console.log(item , typeof item);
      //   // console.log(item.getOwnPropertyNames);
      //   console.log(item.keys);
      //   // let ser = {
      //   //   name: item.keys[0],
      //   //   type: "line",
      //   //   data: item[item.keys[0]]
      //   // }
      //   // series.push(ser)
      // })
      // return series
    },
    Echarts() {
      let mycharts = this.$echarts.init(this.$refs.box);
      let option = {
        title: {
          text: "Stacked Line",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: this.legendDate,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data:this.xAisData
        },
        yAxis: {
          type: "value",
        },
        series:this.getseries()
      };
      mycharts.setOption(option);
      mycharts.resize();
    },
    changeshow(value) {
      if (value == "today") {
        this.Echarts(this.option)
        this.$message.success("today");
      } else {
        this.Echarts(this.optioncopy);
        this.$message.success('tomorrow')
      }
    },
  },
  mounted() {
    // this.Echarts();
    // let that = this;
    // window.onresize = function () {
    //   that.mycharts.resize();
    // };
  },

  async created(){


    //查询排污数据
    let res1 = await this.$request('post','/data/query',{
      eId:1,
      pageNum:1
    },0)
    let res2 = await this.$request('post','/data/update',{
      creatTime: "2022-12-12 12:12:12",
      eNumber:2222,
      pageNum:1
    },0)
    let res3 = await this.$request('post','/data/add',{

        creatTime: "2022-12-12 12:12:12",
        outputVolume:0.12,
        eNumber:1213,
        outputFrom:123123,
        cNumber:"12138",
        concentration:123


    },0)

    let res4 = await this.$request('post','/data/query/getContaminantData',{
      eNumber:273,
      startTime:"2021-01-20 00:00:00",
      endTime:"2021-01-30 00:00:00"
    },0)



    // let token = window.sessionStorage.getItem('token')
    // //再测试一次学姐接口
    // let res = this.$axios({
    //   url:"/user/application/applications",
    //   method:'get',
    //   params:{
    //     pageNum:1
    //   },
    //   headers:{
    //     'Authorization':token
    //   }
    // })
    // console.log(res , '我是用户');
  


    console.log(res1,'我是查询数据');
    console.log(res2,'我是修改数据');
    console.log(res3,'我是增加数据');
    console.log(res4,'我是按照时间查找数据');
  }
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