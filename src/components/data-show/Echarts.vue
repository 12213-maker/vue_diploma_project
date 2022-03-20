<template>
  <div class="all">
    <div class="Enterprise_sewage">
      <div class="img"><img src="../../../public/img/3N3VLY0K31YM8@CSQ_JZSQ5.jpg" alt=""></div>

    
  <el-descriptions  
  class="margin-top" 
  :column="3"  
  border
  size='small'
  labelStyle="width:1vw;height:13vh;textAlign:center;"
  contentStyle="width:15%;textAlign:center;"
  >
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        企业名
      </template>
      酷诺有限公司
      <i v-if="!iscollect" @click="handletap(1)" class=" i1 el-icon-star-off"></i>
      <i v-else @click="handletap(0)" class=" i1 el-icon-star-on"></i>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        手机号
      </template>
      18100000000
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        地址
      </template>
      成都市
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        创建时间
      </template>
      <el-tag size="small">2000年00月00日</el-tag>
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        公司简介
      </template>
       <span class="describe">母爱是一滴甘露，亲吻干涸的泥土，它用细雨的温情，用钻石的坚毅，期待着闪着碎光的泥土的肥沃；母爱不是人生中的一个凝固点，而是一条流动的河，这条河造就了我们生命中美丽的情感之景。我们要珍惜生命,每个不曾起舞的日子,都是对生命的辜负母爱是一滴甘露，亲吻干涸的泥土，它用细雨的温情，用钻石的坚毅，期待着闪着碎光的泥土的肥沃；母爱不是人生中的一个凝固点，而是一条流动的河，这条河造就了我们生命中美丽的情感之景。我们要珍惜生命,每个不曾起舞的日子,都是对生命的辜负母爱是一滴甘露，亲吻干涸的泥土，它用细雨的温情，用钻石的坚毅，期待着闪着碎光的泥土的肥沃；母爱不是人生中的一个凝固点，而是一条流动的河，这条河造就了我们生命中美丽的情感之景。我们要珍惜生命,每个不曾起舞的日子,都是对生命的辜负</span>
    </el-descriptions-item>
  </el-descriptions>
    
    </div>
    <div class="together">
      <div id="box" class="contain"></div>
    <div class="record">

      <el-table
      :data="tableData"
      style="width: 100%"
      height="89%"
      size="mini"
      >
      <el-table-column
      type="index"
      align="center"
      label="序号"
      width="60">
    </el-table-column>
      <el-table-column
        prop="name"
        label="SO2浓度"
        align="center"
        width="100">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        align="center"
        width="140">
      </el-table-column>
    </el-table>
      <div class="btn">
        <el-button 
        size="mini" 
        type="success" 
        plain 
        round
        @click="dialogTableVisible = true"
        >查看更多</el-button>
      </div>
    </div>
    </div>

    <!-- dialog -->
    <el-dialog 
    title="预警记录" 
    :visible.sync="dialogTableVisible"
    width="600px"
    center
    >
    <el-table 
    :data="tableData"
    style="overflow-y: auto;"
    >
    
      <el-table-column label="序号" type="index" width="150" align="center"></el-table-column>
    <el-table-column property="name" label="日期" align="center" width="200"></el-table-column>
    <el-table-column property="date" label="姓名" align="center" width="200"></el-table-column>
  </el-table>
</el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogTableVisible: false,
      forecast: [10, 11, 13, 11, 12, 12, 9,13, 10, 14],
          real: [13, 15, 19, 16, 14, 15, 14, 16, 15,12],
      mycharts: {},
       tableData: [{
            date: '2016-05-02',
            name: '王小虎',
          }, {
            date: '2016-05-04',
            name: '王小虎',
          }, {
            date: '2016-05-01',
            name: '王小虎',
          }
          , {
            date: '2016-05-03',
            name: '王小虎',
          }
          , {
            date: '2016-05-03',
            name: '王小虎',
          }
          , {
            date: '2016-05-03',
            name: '王小虎',
          }
          , {
            date: '2016-05-03',
            name: '王小虎',
          }
          , {
            date: '2016-05-03',
            name: '王小虎',
          }
          , {
            date: '2016-05-03',
            name: '王小虎',
          }
          , {
            date: '2016-05-03',
            name: '王小虎',
          }
          , {
            date: '2016-05-03',
            name: '王小虎',
          }
          , {
            date: '2016-05-03',
            name: '王小虎',
          }
          , {
            date: '2016-05-03',
            name: '王小虎',
          }
          , {
            date: '2016-05-03',
            name: '王小虎',
          }
          , {
            date: '2016-05-03',
            name: '王小虎',
          }
          , {
            date: '2016-05-03',
            name: '王小虎',
          }
          , {
            date: '2016-05-03',
            name: '王小虎',
          }
          ],
      
      /* 是否收藏 */
      iscollect:false
    };
  },
  mounted() {
    this.Echarts();
    /* 图表响应式 */
    let _this = this;
    window.onresize = function () {
      _this.mycharts.resize();
    };
  },
  methods: {
    /* Echarts相关配置 */
    Echarts() {
      /* 创建一个echarts实例 */
      this.mycharts = this.$echarts.init(document.getElementById("box"));
      /* 设置配置项 */
      const option = {
        title: {
          text: "排污数据",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          right:'0%',
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["-4", "-3", "-2", "-1", "today", "1", "2","3", "4", "5",],
        },
        yAxis: {
          type: "value",
          axisLabel: {
            // formatter: "{value} °C",
          },
        },
        series: [
          {
            name: "real",
            type: "line",
            data: this.real,
          },
          {
            name: "forecast",
            type: "line",
            data:this.forecast,
            markPoint: {
              data: [{ name: "周最低", value: -2, xAxis: 1, yAxis: -1.5 }],
            },
          },
        ],
      };

      /* 将配置项设置给echarts实例对象 */
      this.mycharts.setOption(option);
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
};
</script>
<style  scoped>
.contain{
 width: 75%;
 height: 100%; 
 /* background-color: pink;  */
margin-left: 6px;
}
.Enterprise_sewage{
  padding: 10px;
  display: flex;     
  flex-direction: row;
  height: 27vh;
}
.img{
  width: 18vw;
  height: 14vw;
  min-width: 145px;
  min-height: 145px;
  border-radius: 10px;
  margin-right: 10px;
}
img{
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.Introduction{
display: flex;
flex-direction: column;
height: 27vh;
width: 100vw;
/* background-color: white; */
}
.name{
flex: 1;
line-height: 5vh;
font-size: 22px;
font-weight: 600;
text-align: left;
}
.address{
  flex: 0.6;
line-height: 20px;
  text-align: left;
  color: #666;
}
.time{
  flex: 0.6;
  line-height: 20px;
  text-align: left;
  color: #666;
}
.describe{
flex: 2;
line-height: 30px;
text-align: left;
color: #666;

overflow: hidden;
display: -webkit-box;
-webkit-line-clamp: 3;
-webkit-box-orient: vertical;
}
.together{
  /* background-color: cadetblue; */
  display: flex;
  flex: row;
  width: 100%;
  height: 56vh; 
}
.record{
  /* background-color: yellow; */
  width: 24%;
  height: 100%; 
  position: relative;

}
.btn{
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  /* height: 50px; */
  background-color: white;
  line-height: 0;
  width: 100%;
}
.i1{
  font-size: 24px;
  /* background-color: pink; */
}
</style>
<style>
  
.has-gutter , .el-table__header-wrapper,.el-dialog__header{
  line-height: 0 !important; 
}
</style>