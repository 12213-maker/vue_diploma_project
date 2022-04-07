<template>
  <div class="all">
    <div class="top" id="box" ></div>
    <div class="bottom">
      <!-- 显示的table表 -->
      <el-table
        :header-cell-style="{
          background: '#F3F4F7',
          color: '#555',
          fontSize: '17px',
          }"
        :data="allcompanyInfo"
        border
        max-height="550"
        ref="table"
        style="width: 100%; overflow-y: auto"
      >
        <el-table-column
          type="index"
          :index="(this.currentPage - 1) * this.pageSize + 1"
          align="center"
          label="序号"
          width="91"
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
          prop="provinceName"
          label="省份"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="cityName"
          label="市区"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="eContact"
          label="联系方式"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column prop="state" label="状态" width="100" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.state == '安全'"
              >安全</el-tag
            >
            <el-tag type="warning" v-else-if="scope.row.state == '数据伪造'"
              >数据伪造</el-tag
            >
            <el-tag type="danger" v-else>软件生成数据</el-tag>
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
      let option = {
        grid: {
          left: "3%",
          right: "4%",
          bottom: "4%",
          containLabel: true,
        },
        title: {
          text: "近十天企业违规显示",
        },
        tooltip: {
          trigger: "axis",
        },
        xAxis: {
          data: ["-4", "-3", "-2", "-1", "today", "1", "2", "3", "4", "5"],
          axisLabel: {
            color: "#fff",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          // splitLine:{show:  false },
          z: 10,
        },
        yAxis: {
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "white",
          },
          splitLine:{show:  false },
        },
        dataZoom: [
          {
            type: "inside",
          },
        ],
        series: [
          {
            type: "bar",
            showBackground: true,
            barWidth:40,
            itemStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: "#83bff6" },
                { offset: 0.5, color: "#188df0" },
                { offset: 1, color: "#188df0" },
              ]),
            },
            emphasis: {
              itemStyle: {
                color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  { offset: 0, color: "#2378f7" },
                  { offset: 0.7, color: "#2378f7" },
                  { offset: 1, color: "#83bff6" },
                ]),
              },
            },
            data: data,
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

    //获取公司的所有数据
    async allInfo() {
      let num = 1;
      let nextpage = 2;
      while (nextpage != 0) {
        let res = await this.$request(
          "post",
          "/enterprise/queryAll",
          { pageNum: num++ },
          0
        );
        nextpage = res.data.data.nextPage;
        this.allcompanyInfo.push(...res.data.data.list);
        this.copyinfo.push(...res.data.data.list);
      }
    },
  },
  created() {},
  mounted() {
    this.Echarts();
    this.allInfo();
    let that = this
    window.onresize = function(){
      that.mycharts.resize();
    }
  },
};
</script>

<style scoped>
.all {
  /* background-color: pink; */
  width: 100%;
  overflow-x: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px;
  box-sizing: border-box;
}
.top {
  border-radius: 15px;
  box-shadow: 0 3px 8px 6px rgba(167, 98, 20, 0.06);
  width: 100%;
  height:85%;
  background-color: rgb(255, 255, 255);
  background: linear-gradient(rgb(155, 158, 202), rgb(78, 100, 128));
  margin-bottom: 35px;
}
.bottom {
  background-color: rgb(240, 242, 245);
  width: 100%;
  padding-bottom: 30px;
}
.el-table {
  background-color: rgb(240, 242, 245);
  border-radius: 15px;
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
.el-table th.el-table__cell{
background-color: rgb(243, 244, 247) !important;
}
.el-table__header,
.el-table__body {
  width: 100% !important;
}
</style>