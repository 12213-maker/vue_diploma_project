<template>
  <div class="all0" v-if="this.$store.state.freeze === 1">
    <div class="main">
      <h1>
        Please select the next action
        <div class="roller">
          <span
            @click="routerchange(1)"
            class="rolltext cursion"
            style="width: 1000px; height: 60px"
            >View default companies
            <span
              @click.stop="routerchange(2)"
              class="cursion"
              style="height: 50px"
              >View all companies</span
            ><br />
            <span id="spare-time">Please make your choice</span> </span
          ><br />
        </div>
      </h1>
    </div>
  </div>

  <div v-else>
    <div class="all">
      <div class="classitem class_0">
        <div class="item_item item_0">
          <svg id="graph" class="graphclass" viewBox="0 0 100 100">
            <g class="background">
              <circle cx="50" cy="50" r="47" pathLength="100" />
              <circle cx="50" cy="50" r="41" pathLength="100" />
              <circle cx="50" cy="50" r="35" pathLength="100" />
              <circle cx="50" cy="50" r="29" pathLength="100" />
              <circle cx="50" cy="50" r="23" pathLength="100" />
              <circle cx="50" cy="50" r="17" pathLength="100" />
            </g>

            <g class="graph">
              <circle cx="50" cy="50" r="47" pathLength="100" class="one" />
              <circle cx="50" cy="50" r="41" pathLength="100" class="two" />
              <circle cx="50" cy="50" r="35" pathLength="100" class="three" />
              <circle cx="50" cy="50" r="29" pathLength="100" class="four" />
              <circle cx="50" cy="50" r="23" pathLength="100" class="five" />
              <circle cx="50" cy="50" r="17" pathLength="100" class="six" />
            </g>
          </svg>
        </div>
        <div class="item_item item_1"></div>
        <div class="item_item item_2"></div>
        <div class="item_item item_3">
          <button class="butn321" @click="handletap(1)">Collect</button>
          <button class="butn321" @click="handletap(0)" style="--color: #f3738a; ">
            Cancel
          </button>
        </div>
      </div>
      <!-- <div class="classitem class_1">
        <div class="img">
          <img src="../../../public/img/3N3VLY0K31YM8@CSQ_JZSQ5.jpg" alt="" />
        </div>

        <el-descriptions
          class="margin-top"
          :column="3"
          border
          size="small"
          labelStyle="width:1vw;height:13vh;textAlign:center;"
          contentStyle="width:15%;textAlign:center;"
        >
          <el-descriptions-item>
            <template slot="label">
              <i class="el-icon-user"></i>
              企业名
            </template>
            酷诺有限公司
            <i
              v-if="!iscollect"
              @click="handletap(1)"
              class="i1 el-icon-star-off"
            ></i>
            <i v-else @click="handletap(0)" class="i1 el-icon-star-on"></i>
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
            <span class="describe"
              >母爱是一滴甘露，亲吻干涸的泥土，它用细雨的温情，用钻石的坚毅，期待着闪着碎光的泥土的肥沃；母爱不是人生中的一个凝固点，而是一条流动的河，这条河造就了我们生命中美丽的情感之景。我们要珍惜生命,每个不曾起舞的日子,都是对生命的辜负母爱是一滴甘露，亲吻干涸的泥土，它用细雨的温情，用钻石的坚毅，期待着闪着碎光的泥土的肥沃；母爱不是人生中的一个凝固点，而是一条流动的河，这条河造就了我们生命中美丽的情感之景。我们要珍惜生命,每个不曾起舞的日子,都是对生命的辜负母爱是一滴甘露，亲吻干涸的泥土，它用细雨的温情，用钻石的坚毅，期待着闪着碎光的泥土的肥沃；母爱不是人生中的一个凝固点，而是一条流动的河，这条河造就了我们生命中美丽的情感之景。我们要珍惜生命,每个不曾起舞的日子,都是对生命的辜负</span
            >
          </el-descriptions-item>
        </el-descriptions>
      </div> -->
      <div class="classitem class_2">
        <div id="box" class="contain"></div>
      </div>
      <div class="classitem class_3">
        <div class="item3_item item3_0" id="echarts1"></div>
        <div class="item3_item item3_1" id="echarts2"></div>
        <div class="item3_item item3_2" id="echarts3"></div>
      </div>
      <div class="classitem class_4">
        <div class="record">
          <el-table :data="Sewage_data" style="width: 100%" height="70vh">
            <el-table-column
              type="index"
              align="center"
              label="序号"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="outputVolume"
              label="SO2浓度"
              align="center"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="date"
              label="日期"
              align="center"
              width="200"
            >
            </el-table-column>
            <el-table-column fixed="right" label="状态" width="150">
              <template>
                <el-button
                  class="item_btn"
                  v-if="!isOOS"
                  type="success"
                  size="mini"
                  plain
                  >浓度正常</el-button
                >
                <el-button
                  class="item_btn"
                  v-else
                  type="danger"
                  size="mini"
                  plain
                  >浓度超标</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!-- dialog -->
      <!-- <el-dialog
        title="预警记录"
        :visible.sync="dialogTableVisible"
        width="600px"
        center
      >
        <el-table :data="tableData" style="overflow-y: auto">
          <el-table-column
            label="序号"
            type="index"
            width="150"
            align="center"
          ></el-table-column>
          <el-table-column
            property="name"
            label="日期"
            align="center"
            width="200"
          ></el-table-column>
          <el-table-column
            property="date"
            label="姓名"
            align="center"
            width="200"
          ></el-table-column>
        </el-table>
      </el-dialog> -->
    </div>
  </div>
</template>

<script>
// import LoginVue from '../../components/login/Login.vue';
// import NavBar from '../../components/NavBar/NavBar'
export default {
  //注入刷新依赖provide/inject
  inject: ["reload"],
  name: "Data",
  // components:{NavBar},
  data() {
    return {
      //item4中污染物的浓度是否超标
      isOOS: false,
      dialogTableVisible: false,

      forecast: [10, 11, 13, 11, 12, 12, 9, 13, 10, 14],
      real: [13, 15, 19, 16, 14, 15, 14, 16, 15, 12],

      //真实排污查询data(calss_4中左边的数据)
      Sewage_data: [
        {
          date: "2016-05-02",
          outputVolume: 2,
        },
        {
          date: "2016-05-04",
          outputVolume: 3,
        },
        {
          date: "2016-05-01",
          outputVolume: 4,
        },
        {
          date: "2016-05-03",
          outputVolume: 3,
        },
        {
          date: "2016-05-03",
          outputVolume: 9,
        },
        {
          date: "2016-05-03",
          outputVolume: 4,
        },
        {
          date: "2016-05-03",
          outputVolume: 6,
        },
        {
          date: "2016-05-03",
          outputVolume: 8,
        },
        {
          date: "2016-05-03",
          outputVolume: 5,
        },
        {
          date: "2016-05-03",
          outputVolume: 1,
        },
      ],
      //真实排污数据
      show_data: [],

      //所有公司(申请所有的公司以获取第一个公司的数据)
      all_companies: {},
      //第一个公司的数据:
      first_companies: {},

      /* 是否收藏 */
      iscollect: false,
    };
  },
  mounted() {
    this.Echarts();
    this.Echarts1();
    this.Echarts2();
    this.Echarts3();

    /* 图表响应式 */
    let _this = this;
    window.onresize = function () {
      _this.mycharts.resize();
      _this.mycharts1.resize();
      _this.mycharts2.resize();
      _this.mycharts3.resize();
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
          right: "0%",
        },
        grid: {
          top: "50px",
          left: "50px",
          right: "15px",
          bottom: "50px",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["-4", "-3", "-2", "-1", "today", "1", "2", "3", "4", "5"],
          axisLabel: {
            color: "rgb(72, 171, 219)",
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            // formatter: "{value} °C",
            color: "rgb(72, 171, 219)",
          },
          axisLine: {
            show: true,
            color: "rgb(72, 171, 219)",
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
            data: this.forecast,
            markPoint: {
              data: [{ name: "周最低", value: -2, xAxis: 1, yAxis: -1.5 }],
            },
          },
        ],
      };

      /* 将配置项设置给echarts实例对象 */
      this.mycharts.setOption(option);
    },

    Echarts1() {
      this.mycharts1 = this.$echarts.init(document.getElementById("echarts1"));
      let option = {
        legend: {
          top: "bottom",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [20, 100],
            center: ["50%", "45%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: [
              { value: 40, name: "rose 1" },
              { value: 38, name: "rose 2" },
              { value: 32, name: "rose 3" },
              { value: 30, name: "rose 4" },
              { value: 28, name: "rose 5" },
              { value: 26, name: "rose 6" },
              { value: 22, name: "rose 7" },
              { value: 18, name: "rose 8" },
            ],
          },
        ],
      };
      this.mycharts1.setOption(option);
    },

    Echarts2() {
      this.mycharts2 = this.$echarts.init(document.getElementById("echarts2"));
      let option = {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["Rainfall", "Evaporation"],
        },
        xAxis: [
          {
            type: "category",
            data: ["-4", "-3", "-2", "-1", "today", "1", "2", "3", "4", "5"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "real",
            type: "bar",
            data: this.real,
          },
          {
            name: "forecast",
            type: "bar",
            data: this.forecast,
          },
        ],
      };
      this.mycharts2.setOption(option);
    },

    Echarts3() {
      this.mycharts3 = this.$echarts.init(document.getElementById("echarts3"));
      let option = {
        radar: {
          // shape: 'circle',
          indicator: [
            { name: "Sales", max: 6500 },
            { name: "Administration", max: 16000 },
            { name: "Information Technology", max: 30000 },
            { name: "Customer Support", max: 38000 },
            { name: "Development", max: 52000 },
            { name: "Marketing", max: 25000 },
          ],
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            data: [
              {
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: "Allocated Budget",
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: "Actual Spending",
              },
            ],
          },
        ],
      };
      this.mycharts3.setOption(option);
    },

    //跳转
    routerchange(value) {
      if (value == 1) {
        //点了这个之后就解封 , 并且之后都不在出现
        this.$store.commit("changeFreeze");
        //  1. dom没有渲染 , 我们要重新渲染dom
        // location.reload()//这种刷新方式太耗能了,亟待优化

        //优化方法 , 使用provide/inject中的reload
        this.reload();

        //  2. 强制刷新之后freeze还会出现-->把值保存在session中
        window.sessionStorage.setItem("freeze", 0);
      } else {
        //在这里要阻止事件冒泡 ， click.stop
        this.$router.push("/home/search");
      }
    },

    //点击收藏
    handletap(value) {
      /* 要判断是否收藏此公司 */
      console.log(value);
      if (value) {
        this.iscollect = true;
        this.$message.success("成功收藏");
        this.$store.commit("changeIsCollect", true);
        // console.log(this.iscollect);
      } else {
        this.iscollect = false;
        this.$message.info("取消收藏");
        this.$store.commit("changeIsCollect", false);
      }
      this.iscollect = !this.iscollect
      console.log(this.iscollect);
    },

    /* 第一次搜索页面 */
    async getSearchinfo(value) {
      console.log(value);
      //查找企业
      // let res = await this.$request('post','/enterprise/query',{
      //   pageNum:1,
      //   eid:1
      // },0)
      // this.$store.commit('changeIsFirst')
    },

    //获取所有企业
    async getallinfo() {
      let res = await this.$request(
        "post",
        "/enterprise/queryAll",
        { pageNum: 1 },
        0
      );
      console.log(res);
      // this.all_companies = res.data.data;
      // this.first_companies = this.all_companies[0];
      // console.log(this.first_companies);
    },

    //查询企业的真实排污数据
    async searchinfo1() {
      let res = await this.$request(
        "post",
        "/data/query",
        {
          eid: 1,
          pageNum: 5,
        },
        0
      );
      console.log(res);
      this.Sewage_data = res.data.list;
      this.Sewage_data.forEach((item) => {
        this.show_data.push(item.outputVolume);
      });
      console.log(this.show_data);
    },

    /* 在这个页面里面 */
  },
  created() {
    //修改state中的登录次数
    // this.$store.commit('changeIsFirst')
    // console.log(this.$store.state.isFirst);

    // console.log(this.$store.state.freeze);
    // console.log(this.$route.query.companyInfo);

    this.getallinfo()
    // this.searchinfo1()





    /* 以下方式请求全部请求的数据可以申请回来 */
    // this.$axios({
    //   method:'post',
    //   baseURL:'/api',
    //   url:'/enterprise/queryAll',
    //   data:{
    //     pageNum:1,
    //   },
    //   headers:{
    //         'Content-Type': 'application/json'
    //   }
    // }).then((value)=>{console.log(value);})

  },
};
</script>
<style  scoped>
.all0 {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  z-index: 999;
  background: linear-gradient(white, rgb(48, 65, 86));
}
.all {
  /* box-shadow: 0 3px 8px 6px rgba(167, 98, 20, 0.06); */
  background-color: rgb(240, 242, 245);
  padding: 25px 30px;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.classitem {
  /* background-color: pink; */
  margin: 15px 0;
  border-radius: 10px;
}

.contain {
  /* position: absolute; */
  /* left:30px; */
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  box-sizing: border-box;
}
.class_0 {
  height: 20vh;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.item_item:hover {
  transform: translateY(-5px);
  transition-duration: 0.4s;
}
.item_item {
  cursor: pointer;
  width: 25%;
  /* background-color: rgb(48, 65, 86); */
  background: radial-gradient(
    circle at center,
    rgb(74, 94, 117),
    rgb(55, 80, 100),
    rgb(48, 65, 86)
  );
  opacity: 0.85;
  border-radius: 10px;
}
.item_0 {
  position: relative;
  flex: 2;
}
.item_1 {
  flex: 2;
}
.item_2 {
  flex: 2;
}
.item_3 {
  flex: 1;
  position: relative;
  /* background: rgba(255, 255, 255, 0.7); */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: rgb(24, 25, 30);
}
.item_item:nth-child(2),
.item_item:nth-child(3) {
  margin-right: 20px;
}
.item_item:nth-child(2) {
  margin-left: 20px;
}
.class_1 {
  /* padding: 10px; */
  display: flex;
  flex-direction: row;
  height: 27vh;
}
.class_2 {
  box-shadow: 0 3px 8px 6px rgba(167, 98, 20, 0.06);
}

.class_3 {
  height: 43vh;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  /* justify-content: space-between; */
}
.item3_item:hover {
  transform: translateY(-5px);
  transition-duration: 0.4s;
}
.item3_item {
  background: radial-gradient(
    circle at center,
    rgb(74, 94, 117),
    rgb(55, 80, 100),
    rgb(48, 65, 86)
  );
  opacity: 0.85;

  box-shadow: 0 3px 8px 6px rgba(167, 98, 20, 0.06);
  width: 33.33%;
  background-color: white;
  border-radius: 10px;
}
.item3_item:nth-child(1),
.item3_item:nth-child(2) {
  margin-right: 30px;
}
.class_4 {
  box-shadow: 0 3px 8px 6px rgba(167, 98, 20, 0.06);
  height: 70vh;
  background-color: pink;
}

.record {
  /* background-color: yellow; */
  width: 50%;
  height: 70vh;
}
.btn {
  position: absolute;
  /* bottom: 0; */
  left: 25%;
  transform: translateX(-50%);
  /* height: 50px; */
  /* background-color: white; */
  line-height: 0;
  width: 100%;
}

.img {
  width: 18vw;
  height: 14vw;
  min-width: 145px;
  min-height: 145px;
  border-radius: 10px;
  margin-right: 10px;
}
img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.Introduction {
  display: flex;
  flex-direction: column;
  height: 27vh;
  width: 100vw;
  /* background-color: white; */
}
.name {
  flex: 1;
  line-height: 5vh;
  font-size: 22px;
  font-weight: 600;
  text-align: left;
}
.address {
  flex: 0.6;
  line-height: 20px;
  text-align: left;
  color: #666;
}
.time {
  flex: 0.6;
  line-height: 20px;
  text-align: left;
  color: #666;
}
.describe {
  flex: 2;
  line-height: 30px;
  text-align: left;
  color: #666;

  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.class_2 {
  /* background-color: cadetblue; */
  display: flex;
  flex: row;
  width: 100%;
  height: 56vh;
}

.i1 {
  font-size: 24px;
  /* background-color: pink; */
}
</style>
<style>
.item_3_span,
label {
  text-align: left;
}
.has-gutter,
.el-table__header-wrapper,
.el-dialog__header {
  line-height: 0 !important;
}
.el-table,
.el-table--fit,
.el-table--scrollable-y,
.el-table--enable-row-transition {
  margin-top: 0;
  border-radius: 10px;
}
.el-input__inner {
  border-radius: 20px;
}
.el-input {
  top: 10%;
  left: -6%;
}
</style>
<style scoped>
* {
  margin: 0;
  padding: 0;
  font-family: "Arvo";
}
.cursion {
  cursor: pointer;
  /* background-color: pink; */
}

.main {
  /* background-color: pink; */
  height: 100%;
  width: 100%;
  position: relative;
  top: 30%;
  left: 45%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

h1 {
  text-align: center;
  text-transform: uppercase;
  color: #f1faee;
  font-size: 4rem;
}

.roller {
  height: 4.125rem;
  line-height: 4rem;
  position: relative;
  overflow: hidden;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1d3557;
}

#spare-time {
  font-size: 1rem;
  font-style: italic;
  letter-spacing: 1rem;
  margin-top: 0;
  color: #a8dadc;
}

.roller .rolltext {
  position: absolute;
  top: 0;
  animation: slide 6s infinite;
}

@keyframes slide {
  0% {
    top: 0;
  }

  25% {
    top: -4rem;
  }

  50% {
    top: -8rem;
  }

  72.5% {
    top: -12.25rem;
  }
}

@media screen and (max-width: 600px) {
  h1 {
    text-align: center;
    text-transform: uppercase;
    color: #f1faee;
    font-size: 2.125rem;
  }

  .roller {
    height: 2.6rem;
    line-height: 2.125rem;
  }

  #spare-time {
    font-size: 1rem;
    letter-spacing: 0.1rem;
  }

  .roller .rolltext {
    animation: slide-mob 5s infinite;
  }

  @keyframes slide-mob {
    0% {
      top: 0;
    }

    25% {
      top: -2.125rem;
    }

    50% {
      top: -4.25rem;
    }

    72.5% {
      top: -6.375rem;
    }
  }
}
</style>
<style scoped>
.graphclass {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 10px;
  width: 35%;
  height: 75%;
}

.graph circle.one {
  --color: blue;
  --value: 3;
  --max: 4;
}

.graph circle.two {
  --color: teal;
  --value: 4;
  --max: 6;
}

.graph circle.three {
  --color: rebeccapurple;
  --value: 6;
  --max: 7;
}

.graph circle.four {
  --color: green;
  --value: 30;
  --max: 100;
}

.graph circle.five {
  --color: orange;
  --value: 4;
  --max: 10;
}

.graph circle.six {
  --color: orangered;
  --value: 7;
  --max: 10;
}

circle {
  fill: none;
  stroke: var(--color, red);
  stroke-width: 4;
  stroke-linecap: round;
  stroke-dasharray: calc(100px * var(--value, 0) / var(--max, 100)) 100;
  transform: rotate(90deg);
  transform-origin: 50% 50%;
}
.background circle {
  stroke: var(--line-background, rgb(82, 102, 119));
  stroke-width: 5;
  stroke-dasharray: none;
}
.graph circle {
  -webkit-animation: circle 2s ease-in-out both;
  animation: circle 2s ease-in-out both;
}

@-webkit-keyframes circle {
  0% {
    opacity: 0;
    stroke-dasharray: 0 100;
  }
}

@keyframes circle {
  0% {
    opacity: 0;
    stroke-dasharray: 0 100;
  }
}
circle:nth-child(1) {
  --color: hsl(0 100% 48%);
  -webkit-animation-delay: 1s;
  animation-delay: 1s;
}

circle:nth-child(2) {
  --color: hsl(40 100% 48%);
  -webkit-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

circle:nth-child(3) {
  --color: hsl(80 100% 48%);
  -webkit-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

circle:nth-child(4) {
  --color: hsl(120 100% 48%);
  -webkit-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

circle:nth-child(5) {
  --color: hsl(160 100% 48%);
  -webkit-animation-delay: 0.2s;
  animation-delay: 0.2s;
}

circle:nth-child(6) {
  --color: hsl(200 100% 48%);
  -webkit-animation-delay: 0s;
  animation-delay: 0s;
}
</style>
<style scoped>
.butn321 {
  height: 46%;
  line-height: 46%;

  --border: 5px;
  /* the border width */
  --slant: 0.7em;
  /* control the slanted corners */
  --color: #37e8fc;
  /* the color */

  font-size: 30px;
  padding: 0.4em 1.2em;
  border: none;
  cursor: pointer;
  font-weight: bold;
  color: var(--color);
  background: linear-gradient(to bottom left, var(--color) 50%, #0000 50.1%) top
      right,
    linear-gradient(to top right, var(--color) 50%, #0000 50.1%) bottom left;
  background-size: calc(var(--slant) + 1.3 * var(--border))
    calc(var(--slant) + 1.3 * var(--border));
  background-repeat: no-repeat;
  box-shadow: 0 0 0 200px inset var(--s, #0000),
    0 0 0 var(--border) inset var(--color);
  clip-path: polygon(
    0 0,
    calc(100% - var(--slant)) 0,
    100% var(--slant),
    100% 100%,
    var(--slant) 100%,
    0 calc(100% - var(--slant))
  );
  transition: color var(--t, 0.3s), background-size 0.3s;
}

.butn321:hover,
.butn321:active {
  background-size: 100% 100%;
  color: #fff;
  --t: 0.2s 0.1s;
}

.butn321:focus-visible {
  outline-offset: calc(-1 * var(--border));
  outline: var(--border) solid #000a;
}

.butn321:active {
  --s: #0005;
  transition: none;
}
.has-gutter,
.el-table__header-wrapper,
.el-dialog__header,
.el-table_3_column_12,
.is-leaf, 
.el-table__cell
{
  line-height: 0 !important;
}
</style>
 