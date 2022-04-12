<template>
  <div class="all">
    <div class="top" id="box"></div>
    <div class="bottom">
      <!-- 显示的table表 v-el-table-infinite-scroll="loadmore" -->
      <el-table
        height="100%"
        v-el-table-infinite-scroll="loadmore"
        :header-cell-style="{
          background: '#F3F4F7',
          color: '#555',
          fontSize: '17px',
        }"
        :data="allcompanyInfo"
        border
        ref="table"
      >
        <el-table-column
          type="index"
          :index="(this.currentPage - 1) * this.pageSize + 1"
          align="center"
          label="序号"
          width="60"
        >
        </el-table-column>

        <el-table-column
          prop="eName"
          label="企业名称"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="creatTime"
          label="创建时间"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="eContact"
          label="联系方式"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="state" label="状态" width="100" align="center">
          <template slot-scope="scope">
            <el-tag type="success" size="mini" v-if="scope.row.state == '安全'"
              >安全</el-tag
            >
            <el-tag
              type="warning"
              size="mini"
              v-else-if="scope.row.state == '数据伪造'"
              >数据伪造</el-tag
            >
            <el-tag type="danger" size="mini" v-else>软件生成数据</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mycharts: {},
      allcompanyInfo: [],
      copyinfo: [],
      currentPage: 1,
      pageSize: 10,
      tenInfo: [],
      tenData: [],
      //所有违规的数据
      infractioninfo: [],
      disabled123: false,
      pageNum: 2,

      max:0,
      nextPage:1
    };
  },
  methods: {
    /* 每页多少条 */
    handleSizeChange(val) {
      this.pageSize = val;
    },
    /* 当前页改变的时候 */
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    Echarts() {
      this.mycharts = this.$echarts.init(document.getElementById("box"));
      // prettier-ignore
      let data = [22, 18, 19, 23, 29, 33, 31, 12, 44, 32];
      let yMax = 500;
      let dataShadow = [];
      for (let i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
      }

      const CubeLeft = this.$echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: function (ctx, shape) {
          const xAxisPoint = shape.xAxisPoint;
          const c0 = [shape.x, shape.y];
          const c1 = [shape.x - 9, shape.y - 9];
          const c2 = [xAxisPoint[0] - 9, xAxisPoint[1] - 9];
          const c3 = [xAxisPoint[0], xAxisPoint[1]];
          ctx
            .moveTo(c0[0], c0[1])
            .lineTo(c1[0], c1[1])
            .lineTo(c2[0], c2[1])
            .lineTo(c3[0], c3[1])
            .closePath();
        },
      });
      const CubeRight = this.$echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: function (ctx, shape) {
          const xAxisPoint = shape.xAxisPoint;
          const c1 = [shape.x, shape.y];
          const c2 = [xAxisPoint[0], xAxisPoint[1]];
          const c3 = [xAxisPoint[0] + 18, xAxisPoint[1] - 9];
          const c4 = [shape.x + 18, shape.y - 9];
          ctx
            .moveTo(c1[0], c1[1])
            .lineTo(c2[0], c2[1])
            .lineTo(c3[0], c3[1])
            .lineTo(c4[0], c4[1])
            .closePath();
        },
      });
      const CubeTop = this.$echarts.graphic.extendShape({
        shape: {
          x: 0,
          y: 0,
        },
        buildPath: function (ctx, shape) {
          const c1 = [shape.x, shape.y];
          const c2 = [shape.x + 18, shape.y - 9];
          const c3 = [shape.x + 9, shape.y - 18];
          const c4 = [shape.x - 9, shape.y - 9];
          ctx
            .moveTo(c1[0], c1[1])
            .lineTo(c2[0], c2[1])
            .lineTo(c3[0], c3[1])
            .lineTo(c4[0], c4[1])
            .closePath();
        },
      });
      this.$echarts.graphic.registerShape("CubeLeft", CubeLeft);
      this.$echarts.graphic.registerShape("CubeRight", CubeRight);
      this.$echarts.graphic.registerShape("CubeTop", CubeTop);

      const MAX = this.max 
      const VALUE = this.tenInfo
      let option = {
          tooltip: {
          trigger: "axis",
        },
        backgroundColor: "#010d3a",
        title: {
          text: "近十天违规企业数量",
          top: 32,
          left: 'center',
          textStyle: {
            color: "rgb(72, 175, 250)",
            fontSize: 24,
          },
        },
        grid: {
          left: 20,
          right: 40,
          bottom: "10%",
          top: "15%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          data: this.tenData.reverse(),
          axisLine: {
            show: true,
            lineStyle: {
              color: "white",
            },
          },
          offset: 20,
          axisTick: {
            show: false,
            length: 9,
            alignWithLabel: true,
            lineStyle: {
              color: "#7DFFFD",
            },
          },
          axisLabel: {
            fontSize: 10,
          },
        },
        yAxis: {
          type: "value",
          axisLine: {
            show: true,
            lineStyle: {
              color: "white",
            },
          },
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 16,
          },
          boundaryGap: ["20%", "20%"],
        },
        series: [
          {
            type: "custom",
            renderItem: function (params, api) {
              const location = api.coord([api.value(0), api.value(1)]);
              return {
                type: "group",
                children: [
                  {
                    type: "CubeLeft",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: "rgba(7,29,97,.6)",
                    },
                  },
                  {
                    type: "CubeRight",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: "rgba(10,35,108,.7)",
                    },
                  },
                  {
                    type: "CubeTop",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: "rgba(11,42,106,.8)",
                    },
                  },
                ],
              };
            },
            data: MAX,
          },
          {
            type: "custom",
            renderItem: (params, api) => {
              const location = api.coord([api.value(0), api.value(1)]);
              return {
                type: "group",
                children: [
                  {
                    type: "CubeLeft",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: "#3B80E2",
                        },
                        {
                          offset: 1,
                          color: "#49BEE5",
                        },
                      ]),
                    },
                  },
                  {
                    type: "CubeRight",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: "#3B80E2",
                        },
                        {
                          offset: 1,
                          color: "#49BEE5",
                        },
                      ]),
                    },
                  },
                  {
                    type: "CubeTop",
                    shape: {
                      api,
                      xValue: api.value(0),
                      yValue: api.value(1),
                      x: location[0],
                      y: location[1],
                      xAxisPoint: api.coord([api.value(0), 0]),
                    },
                    style: {
                      fill: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                          offset: 0,
                          color: "#3B80E2",
                        },
                        {
                          offset: 1,
                          color: "#49BEE5",
                        },
                      ]),
                    },
                  },
                ],
              };
            },
            data: VALUE,
          },
          {
            type: "bar",
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: (e) => {
                  switch (e.name) {
                    case "10kV线路":
                      return VALUE[0];
                    case "公用配变":
                      return VALUE[1];
                    case "35kV主变":
                      return VALUE[2];
                    case "水":
                  }
                },
                fontSize: 16,
                color: "#fff",
                offset: [4, -25],
              },
            },
            itemStyle: {
              color: "transparent",
            },
            data: MAX,
          },
        ],
      };

      const zoomSize = 6;
      this.mycharts.on("click", function (params) {
        console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
        this.mycharts.dispatchAction({
          type: "dataZoom",
          startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
          endValue:
            dataAxis[
              Math.min(params.dataIndex + zoomSize / 2, data.length - 1)
            ],
        });
      });
      this.mycharts.setOption(option);
    },

    async getTenInfo() {
      let res = await this.$request(
        "get",
        "/data/selectIllegalEnterprise",
        {},
        0
      );
      let result = res.data.data;
      //遍历十条数据获取
      result.forEach((item) => {
        // console.log(item);
        for (let i in item) {
          if (i == "count") this.tenInfo.push(item[i]);
          if (i == "createTime") {
            this.tenData.push(item[i].split("").splice(0, 10).join(""));
          }
        }
      });

      let temp = 0
      //找出十条数据里面最大的数据
      this.tenInfo.forEach(item=>{
        temp=temp>item?temp:item
      })

      this.max = new Array(10).fill(temp)

      console.log(this.tenInfo,'我是显示的十条数据');
    },
    //查询所有企业的违规记录
    async getallinfractioninfo() {
      let res = await this.$axios({
        url: "/data/selectIllegalInfo",
        method: "get",
        params: {
          pageNum: 1,
        },
      });
      this.allcompanyInfo.push(...res.data.data.list);
      console.log(this.allcompanyInfo, "我是所有数据");
    },

    //懒加载
    async loadmore() {
      let that = this;
      this.disabled123 = true;
      if(this.nextPage==0){
        this.$message.info('所有信息展示完毕')
        return
      }
      
      let res = await this.$axios({
        url: "/data/selectIllegalInfo",
        method: "get",
        params: {
          pageNum: that.pageNum++,
        },
      });
      this.allcompanyInfo.push(...res.data.data.list);
      this.nextPage = res.data.data.nextPage
      console.log(res);
    },
  },
  async mounted() {
    this.$store.commit("changeIsCollapse", true);
    this.getallinfractioninfo();
    await this.getTenInfo();
    this.Echarts();
    let that = this;
    window.onresize = function () {
      that.mycharts.resize();
    };
  },
  beforeDestroy() {
    /* 打开折叠框 */
    this.$store.commit("changeIsCollapse", false);
  },
};
</script>

<style scoped>
.all {
  /* background-color: pink; */
  width: 100%;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: row;
  /* padding: 40px; */
  box-sizing: border-box;
}
.top {
  /* border-radius: 15px; */
  box-shadow: 0 3px 8px 6px rgba(167, 98, 20, 0.06);
  width: 60%;
  height: 100%;
  background-color: rgb(255, 255, 255);
  background: linear-gradient(rgb(155, 158, 202), rgb(78, 100, 128));
  /* margin-bottom: 35px; */
}
.bottom {
  background-color: rgb(240, 242, 245);
  width: 40%;
  /* padding-bottom: 30px; */
}
.el-table {
  background-color: rgb(240, 242, 245);
  /* border-radius: 15px; */
  box-shadow: 0 3px 8px 6px rgba(167, 98, 20, 0.06);
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
<style>
.el-table th.el-table__cell {
  background-color: rgb(243, 244, 247) !important;
}
.el-table__header,
.el-table__body {
  width: 100% !important;
}
</style>