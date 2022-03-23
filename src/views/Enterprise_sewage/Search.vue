<template>
  <div class="all">
    <div class="btns">
      <a-form-item
        label="所属辖区"
        :label-col="{ span: 4 }"
        :wrapper-col="{ span: 16 }"
      >
        <v-distpicker
          :province="city.sheng"
          :city="city.shi"
          :area="city.xian"
          @selected="selected"
          @province="onChangeProvince"
          @city="onChangeCity"
          @area="onChangeArea"
        ></v-distpicker>
      </a-form-item>

      <div class="right">
        <el-input
          placeholder="公司名称"
          v-model="input"
          clearable
          @clear="recovertabledata"
        ></el-input>
        <el-button type="success" plain round @click="handlesearch">查找</el-button>
        <el-button type="success" plain round @click="recovertabledata"
          >返回全部数据</el-button
        >
      </div>
    </div>

    <el-table
      :header-cell-style="{
        background: '#F3F4F7',
        color: '#555',
        fontSize: '17px',
      }"
      :data="
        tableData.slice(
          (this.currentPage - 1) * this.pageSize,
          currentPage * pageSize
        )
      "
      border
      max-height="550"
      ref="table"
      style="width: 100%; overflow-y: auto"
      @cell-click="clickcell"
    >
      <el-table-column
        type="index"
        :index="(this.currentPage - 1) * this.pageSize + 1"
        align="center"
        label="序号"
        width="91"
      >
      </el-table-column>

      <el-table-column prop="eName" label="企业名称" width="120" align="center">
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
      <el-table-column prop="cityName" label="市区" width="120" align="center">
      </el-table-column>
      <el-table-column
        prop="eContact"
        label="联系方式"
        width="200"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="zip" label="状态" width="135" align="center">
      </el-table-column>
      <el-table-column class="showmore" label="操作" width="150" align="center">
        <span class="showmoremore" @click="routerpush">查看更多</span>
      </el-table-column>
    </el-table>

    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    >
    </el-pagination>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";
export default {
  name: "Search",
  components: { VDistpicker },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 400;
      //后面的50：根据需求空出的高度，自行调整
    });
  },
  data() {
    return {
      city: {
        sheng: "四川省",
        shi: "成都市",
        xian: "新都区",
      },

      /* 公司名称 */
      input: "",
      tableHeight: 0,
      tableData: [
        {
          creatTime: "2016-05-02",
          eName: "王小虎",
          provinceName: "成都",
          cityName: "普陀区",
          eContact: 18980530858,
          zip: 200333,
        },
        {
          creatTime: "2016-05-04",
          eName: "小李",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: 18980530858,
          zip: 200333,
        },
        {
          creatTime: "2016-05-01",
          eName: "张三",
          provinceName: "北京",
          cityName: "普陀区",
          eContact: 18980530858,
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "喜羊羊",
          provinceName: "重庆",
          cityName: "普陀区",
          eContact: 18980530858,
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "灰太狼",
          provinceName: "香港",
          cityName: "普陀区",
          eContact: 18980530858,
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "红太狼",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: 18980530858,
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "海绵宝宝",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: 18980530858,
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "派大星",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: 18980530858,
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "章鱼哥",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: 18980530858,
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "一十四洲",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: 18980530858,
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: 18980530858,
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          creatTime: "2016-05-03",
          eName: "王小虎",
          provinceName: "上海",
          cityName: "普陀区",
          eContact: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
      ],
      cities: [
        {
          value: "Beijing",
          label: "北京",
        },
        {
          value: "Shanghai",
          label: "上海",
        },
        {
          value: "Nanjing",
          label: "南京",
        },
        {
          value: "Chengdu",
          label: "成都",
        },
        {
          value: "Shenzhen",
          label: "深圳",
        },
        {
          value: "Guangzhou",
          label: "广州",
        },
      ],
      value: "",
      currentPage: 1,
      pageSize: 10,
    };
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    /* 每页多少条 */
    handleSizeChange(val) {
      this.pageSize = val;
    },
    /* 当前页改变的时候 */
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    /* 处理搜索点击事件 */
    handlesearch() {

      //判断公司名字和地区

      if (this.input != "" && this.city.shi == "") {
        this.tableData = this.tableData.filter((item) => {
          if (item.eName.indexOf(this.input) != -1 || item.eName == this.input)
            return item;
        });
      } else if (this.input == "" && this.city.shi != "") {
        this.tableData = this.tableData.filter((item) => {
          if (
            this.city.shi.indexOf(item.provinceName) != -1 ||
            item.provinceName === this.city.shi
          )
            return item;
        });
      } else {
        this.tableData = this.tableData.filter((item) => {
          if (
            (this.city.shi.indexOf(item.provinceName) != -1 ||
              item.provinceName === this.city.shi) &&
            (item.eName.indexOf(this.input) != -1 || item.eName === this.input)
          )
            return item;
        });
      }
    },
    /* 清除搜索框里面的内容的时候恢复tableData */
    recovertabledata() {
      this.tableData = this.$store.state.TableData;
      (this.city = {
        sheng: "",
        shi: "",
        xian: "",
      }),
        (this.input = "");
    },
    /* 点击查看更多跳转页面 */
    routerpush() {
      this.$router.push("/home/data/echarts");
      this.$store.commit("changeFreeze");
      window.sessionStorage.setItem("freeze", 0);
    },
    /* 城市选择器 */
    selected(data) {
      this.city.sheng = data.province.value;
      this.city.shi = data.city.value;
      this.xian = data.area.value;
    },
    onChangeProvince(value) {
      this.city.sheng = value.value;
    },
    onChangeCity(value) {
      this.city.shi = value.value;
    },
    onChangeArea(value) {
      this.xian = value.value;
    },

    // 单击单元格跳转到相应页面
    clickcell(row){
      //携带参数跳转页面
      this.$router.push({
        path:'/home/data/echarts',
        query:{
          companyInfo:row
        }
      })
      this.$store.commit("changeFreeze");
      window.sessionStorage.setItem("freeze", 0);
    },


    //获取公司的所有数据
    async allInfo() {
      let res = await this.$request(
        "post",
        "/enterprise/queryAll",
        { pageNum: 1 },
        0
      );

      console.log(res);
    },

    //查询企业
    async searchInfo() {
      let res = await this.$request(
        "post",
        "/enterprise/query",
        {
          pageNum: 1,
          eId: 1,
        },
        0
      );
      console.log(res);
    },
    async deleteInfo() {
      let res = await this.$request(
        "post",
        "/enterprise/delete",
        {
          pageNum: 1,
          eId: 1,
        },
        0
      );
      console.log(res);
    },
    async changeInfo() {
      let res = await this.$request(
        "post",
        "/enterprise/update",
        {
          eId: 1,
        },
        0
      );
      console.log(res);
    },
    async addInfo() {
      let res = await this.$request(
        "post",
        "/enterprise/add/add",
        {
          eName: "我是灰太狼",
          eNumber: "111",
          provinceId: 1,
          introduction:
            "我是一只羊 , 草因为我变的更香 ,我是一只狼 , 羊因为我变的更香",
          outputNum: "1110",
          eContact: "18980530858",
          state: "1",
          cityId: 1,
          creatTime: "2022-3-21 03-34-23",
        },
        0
      );
      console.log(res);
    },
    //查询省份
  },
  created() {
    /* 拿到公司数据的时候保存到vuex中 */
    this.$store.commit("changeTableData", this.tableData);
    // this.allInfo();
    // this.searchInfo()
    // this.deleteInfo()
    // this.changeInfo()
    // this.addInfo()
    // console.log(new Date());
    // this.$request('get','/application/applications',{pageNum:'1'},1).then((value)=>{console.log(value);})
  },
};
</script>

<style scoped>
.all {
  /* background-color: rgb(176, 204, 195); */
  width: 90%;
  height: 85.5vh;
  padding: 30px 0;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.el-table {
  /* margin: 1vw; */
  /* height: calc(89vh - 30px); */
  /* background-color: yellow !important; */
  /* width: 83vw !important; */
  width: 100%;
  height: 80vh;
}
.btns {
  /* background-color: rgb(202, 196, 196); */
  box-shadow: 0 3px 8px 6px rgba(167, 98, 20, 0.06);
  display: flex;
  flex-direction: row;
  height: 5vh;
  line-height: 5vh;
  justify-content: space-between;
  width: 96.5%;
  padding: 0 20px;
  padding-top: 15px;
  padding-bottom: 20px;
  position: relative;
}

.right {
  position: absolute;
  right: 0;
  /* background-color: blue; */
  display: flex;
  flex-direction: row;
  width: 37%;
  /* height: 100%; */
}

.el-input {
  padding-right: 10px;
}

.el-pagination {
  /* background-color: aqua; */
  width: 100%;
  height: 4vh;
  padding: 0 0 15px 0;
  line-height: 70px;
}
.showmoremore {
  color: rgb(90, 177, 241);
  font-size: 14px;
  cursor: pointer;
}
</style>
<style>
.has-gutter,
.el-table__header-wrapper,
.el-dialog__header {
  line-height: 0 !important;
}
.el-table__header,
.el-table__body {
  width: 100% !important;
}
.el-input__inner{
  border-radius: 20px;
}
.el-table__row{
  cursor: pointer;
}
</style>