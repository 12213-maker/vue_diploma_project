<template>
  <div class="all">
    <div class="btns">

      <!-- <div data-toggle="distpicker">
        <select data-province="浙江省"></select>
        <select data-city="杭州市"></select>
        <select data-district="西湖区"></select>
      </div> -->

    <a-form-item 
    label="所属辖区" 
    :label-col="{ span: 4 }" 
    :wrapper-col="{ span: 16 }">
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

      <el-input
        placeholder="公司名称"
        v-model="input"
        style="width: 200px"
        clearable
        @clear="recovertabledata"
      ></el-input>
      <el-button type="success" plain  @click="handlesearch">查找</el-button>
      <el-button type="success" plain @click="recovertabledata" >返回全部数据</el-button>
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
    >
      <el-table-column type="index" align="center" label="序号" width="100">
      </el-table-column>

      <el-table-column prop="name" label="姓名" width="120" align="center">
      </el-table-column>
      <el-table-column prop="date" label="日期" width="150" align="center">
      </el-table-column>
      <el-table-column prop="province" label="省份" width="120" align="center">
      </el-table-column>
      <el-table-column prop="city" label="市区" width="120" align="center">
      </el-table-column>
      <el-table-column prop="address" label="地址" width="300" align="center">
      </el-table-column>
      <el-table-column prop="zip" label="邮编" width="135" align="center">
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
import VDistpicker from 'v-distpicker'
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
      city:{
      sheng: '四川省',
      shi: '成都市',
      xian: '新都区',
      },
      
      /* 公司名称 */
      input: "",
      tableHeight: 0,
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "成都",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333,
        },
        {
          date: "2016-05-04",
          name: "小李",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1517 弄",
          zip: 200333,
        },
        {
          date: "2016-05-01",
          name: "张三",
          province: "北京",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1519 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "喜羊羊",
          province: "重庆",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "灰太狼",
          province: "香港",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "红太狼",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "海绵宝宝",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "派大星",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "章鱼哥",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "一十四洲",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
          zip: 200333,
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1516 弄",
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

      if(this.input!=''&&this.city.shi==''){
      this.tableData = this.tableData.filter((item) => {
        if (item.name.indexOf(this.input) != -1 || item.name === this.input)
          return item;
      });
      }else if(this.input==''&&this.city.shi!=''){
        this.tableData = this.tableData.filter(item=>{
          if(this.city.shi.indexOf(item.province)!=-1||item.province===this.city.shi)
          return   item
        })
      }else{
        this.tableData = this.tableData.filter(item=>{
          if((this.city.shi.indexOf(item.province)!=-1||item.province===this.city.shi)&&(item.name.indexOf(this.input) != -1 || item.name === this.input))
          return   item
        })
      }

    },
    /* 清除搜索框里面的内容的时候恢复tableData */
    recovertabledata() {
      this.tableData = this.$store.state.TableData;
      this.city={
        sheng: '',
      shi: '',
      xian: '',
      },
      this.input=''
    },
    /* 点击查看更多跳转页面 */
    routerpush() {
      this.$router.push("/home/data/echarts");
    },
    /* 城市选择器 */
    selected(data){
      this.city.sheng = data.province.value
      this.city.shi = data.city.value
      this.xian = data.area.value
    },
    onChangeProvince(value){
      this.city.sheng = value.value
    },
    onChangeCity(value){
      this.city.shi = value.value
    },
    onChangeArea(value){
      this.xian = value.value
    }
  },
  created() {
    /* 拿到公司数据的时候保存到vuex中 */
    this.$store.commit("changeTableData", this.tableData);
  },
};
</script>

<style scoped>
.all {
  /* background-color: rgb(176, 204, 195); */
  /* width: 100%; */
  height: 85.5vh;
  padding-left: 30px;
}
.el-table {
  /* margin: 1vw; */
  /* height: calc(89vh - 30px); */
  /* background-color: yellow !important; */
  width: 83vw !important;
  height: 75vh;
}
.btns {
  /* background-color: aqua; */
  display: flex;
  flex-direction: row;
  height: 5vh;
  line-height: 5vh;
  justify-content: space-between;
  width: 70vw;
  padding: 0 20px;
  padding-top: 20px;
}
/* .showmore {
  color: blue;
} */
.el-pagination {
  /* background-color: aqua; */
  height: 4vh;
  padding: 0 0 15px 0;
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
</style>