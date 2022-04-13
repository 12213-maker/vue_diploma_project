<template>
  <div class="all" v-loading="loading">
    <!--小图标-->
    <div class="icon">
      <span class="remind">需要搜索的用户：</span>
      <span class="select" display="line－block" style="margin-to: 20px">
        <el-input
          v-model.trim="tableDataName"
          placeholder="请输入电话号码"
          style="width: 240px; overflow: right"
          @keyup.native.enter="doFilter"
        ></el-input>
        <span class="seletend"
          ><el-button type="primary" @click="doFilter">搜索</el-button></span
        >
      </span>
    </div>

    <!-- 表格 -->
    <div class="table">
      <!-- 表格 -->
      <el-table
        ref="filterTable"
        :data="tableDataEnd"
        border
        style="width: 100%"
        :header-cell-style="{ textAlign: 'center' }"
        :cell-style="{ textAlign: 'center' }"
      >
        <!-- 下拉框 -->
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="用户id:">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="用户名:">
                <span>{{ props.row.userName }}</span> </el-form-item
              >>
              <el-form-item label="用户密码：">
                <span>{{ props.row.password }}</span>
              </el-form-item>
              <el-form-item label="用户电话：">
                <span>{{ props.row.phoneNumber }}</span>
              </el-form-item>
              <el-form-item label="城市id：">
                <span>{{ props.row.cityId }}</span>
              </el-form-item>
              <el-form-item label="所在城市:">
                <span>{{ props.row.cityName }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <!-- 表格内容 -->
        <el-table-column prop="createTime" sortable label="日期" width="180px">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{
              timeFormatter(scope.row.createTime)
            }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="userName" label="用户名" width="180px">
        </el-table-column>
        <el-table-column prop="id" sortable label="ID" width="180px">
        </el-table-column>
        <el-table-column prop="phoneNumber" label="电话" width="180px">
        </el-table-column>
        <el-table-column prop="userRole" label="权限" width="180px">
        </el-table-column>
        <el-table-column prop="cityName" label="城市" width="180px">
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              slot="reference"
              style="width: 50%"
              @click="check(scope.$index, scope.row)"
              >查看详情</el-button
            >
            <!-- <el-dialog :visible.sync="dialogFormVisible" height="100px"> -->
            <!-- <div class="content">
                <div>
                  <span
                    >申请人：<el-divider
                      direction="vertical"
                    ></el-divider> </span
                  ><span>{{ more.id }}</span>
                  <el-divider></el-divider>
                  <div>
                    <span
                      >电话:<el-divider
                        direction="vertical"
                      ></el-divider> </span
                    ><span>{{ more.phoneNumber }}</span>
                  </div>
                  <el-divider></el-divider>
                  <div>
                    <span
                      >城市：<el-divider
                        direction="vertical"
                      ></el-divider> </span
                    ><span>{{ more.cityName }}</span>
                  </div>
                  <el-divider></el-divider>
                  <el-form :model="more">
                    <el-form-item label="备注/说明" prop="desc">
                      <el-divider direction="vertical"></el-divider>
                      <el-input
                        type="textarea"
                        v-model="more.resolution"
                        maxlength="100"
                        show-word-limit
                      ></el-input>
                    </el-form-item>
                  </el-form>
                  <div>
                    <span
                      >理由：<el-divider
                        direction="vertical"
                      ></el-divider> </span
                    ><span>{{ more.resolution }}</span>
                  </div>
                </div>
              </div> -->
            <div class="dialog-outer" v-if="dialogFormVisible">
              <div class="card">
                <div class="wrapper">
                  <div class="clash-card wizard">
                    <div class="clash-card__image clash-card__image--wizard">
                      <img
                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                        alt="wizard"
                        style="height: 113%"
                      />
                    </div>
                    <div class="clash-card__level clash-card__level--wizard">
                      ID：{{ more.id }}
                    </div>
                    <div class="clash-card__level clash-card__level--wizard">
                      {{more.cityName}}
                    </div>
                    <div class="clash-card__unit-name">{{ more.userName }}</div>
                    <div class="clash-card__unit-description">
                      理由：{{ more.resolution }}
                    </div>

                    <div
                      class="
                        clash-card__unit-stats clash-card__unit-stats--wizard
                        clearfix
                      "
                    >
                      <div class="one-third" @click="refused(more.id)">
                        <div class="stat">通过</div>
                        <div class="stat-value">通过</div>
                      </div>

                      <div class="one-third" @click="dialogFormVisible = false">
                        <div class="stat">取消</div>
                        <div class="stat-value">取消</div>
                      </div>

                      <div
                        class="one-third no-border"
                        @click="createData(more.id)"
                      >
                        <div class="stat">驳回</div>
                        <div class="stat-value">驳回</div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- end clash-card wizard-->
              </div>
            </div>

            <!-- <div slot="footer">
                <el-button @click="refused(more.id)">驳回</el-button>
                <el-button type="primary" @click="createData(more.id)"
                  >通过</el-button
                >
              </div> -->
            <!-- </el-dialog> -->
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页  current-change为当前在第几页-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalItems"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Unfinished",
  data() {
    return {
      dialogFormVisible: false,
      // 搜索框内容
      tableDataName: "",
      tableDataEnd: [],

      currentPage: 1,
      pageSize: 15,
      totalItems: 0,
      filterTableDataEnd: [],
      flag: false,
      more: {},
      tableDataBegin: [],
      loading: false,
      circleUrl:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
    };
  },
  async created() {
    // 获取初始内容
    this.loading = true;
    console.log("我是mounted");
    let num = 1;
    let nextPage = 2;
    while (nextPage != 0) {
      let res = await this.$axios({
        url: "/user/application/applications",
        method: "get",
        params: {
          pageNum: num++,
        },
        headers: { Authorization: window.sessionStorage.getItem("token") },
      });
      this.tableDataBegin.push(...res.data.data.list);
      nextPage = res.data.data.nextPage;
      console.log("这是res", res);
    }
    console.log(this.tableDataBegin);

    //页面初始化时让分页的总条数等于数据的总条数
    this.totalItems = this.tableDataBegin.length;
    //如果分页的页数等于当页要展示的条数
    if (this.totalItems > this.pageSize) {
      for (let index = 0; index < this.pageSize; index++) {
        //那么就将这几条push进展示表格中
        this.tableDataEnd.push(this.tableDataBegin[index]);
      }
    } else {
      //否则就展示首页
      this.tableDataEnd = this.tableDataBegin;
    }
    this.loading = false;
  },
  methods: {
    //前端搜索功能需要区分是否检索,因为对应的字段的索引不同
    //用两个变量接收currentChangePage函数的参数
    //时间转换
    ///有时分秒
    ///无时分秒
    timeFormatter(time) {
      if (!time) return time;
      var date = time.substr(0, 10); //年月日
      var hours = time.substring(11, 13);
      var minutes = time.substring(14, 16);
      var seconds = time.substring(17, 19);
      var timeFlag = date + " " + hours + ":" + minutes + ":" + seconds;
      timeFlag = timeFlag.replace(/-/g, "/");
      timeFlag = new Date(timeFlag);
      timeFlag = new Date(timeFlag.getTime() + 8 * 3600 * 1000);
      timeFlag =
        timeFlag.getFullYear() +
        "-" +
        (timeFlag.getMonth() + 1 < 10
          ? "0" + (timeFlag.getMonth() + 1)
          : timeFlag.getMonth() + 1) +
        "-" +
        (timeFlag.getDate() < 10
          ? "0" + timeFlag.getDate()
          : timeFlag.getDate()) +
        " " +
        (timeFlag.getHours() < 10
          ? "0" + timeFlag.getHours()
          : timeFlag.getHours()) +
        ":" +
        (timeFlag.getMinutes() < 10
          ? "0" + timeFlag.getMinutes()
          : timeFlag.getMinutes()) +
        ":" +
        (timeFlag.getSeconds() < 10
          ? "0" + timeFlag.getSeconds()
          : timeFlag.getSeconds());
      return timeFlag;
    },
    // 搜索筛选
    doFilter() {
      if (this.tableDataName == "") {
        this.$message.warning("查询条件不能为空！");
        return;
      }
      this.tableDataEnd = [];
      //每次手动将数据置空,因为会出现多次点击搜索情况
      this.filterTableDataEnd = [];

      this.tableDataBegin.forEach((value, index) => {
        if (value.phoneNumber) {
          if (value.phoneNumber.indexOf(this.tableDataName) >= 0) {
            this.filterTableDataEnd.push(value);
          }
        }
      });
      //页面数据改变重新统计数据数量和当前页
      this.currentPage = 1;
      this.totalItems = this.filterTableDataEnd.length;
      //渲染表格,根据值
      this.currentChangePage(this.filterTableDataEnd);
      //页面初始化数据需要判断是否检索过
      this.flag = true;
    },
    //每页展示条数
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pageSize = val;
      this.handleCurrentChange(1);
    },
    // 页数改变触发
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentPage = val;
      //需要判断是否检索
      if (!this.flag) {
        this.currentChangePage(this.tableDataBegin);
        console.log(this.tableDataEnd);
      } else {
        this.currentChangePage(this.filterTableDataEnd);
        console.log(this.tableDataEnd);
      }
    }, //组件自带监控当前页码

    //翻页
    currentChangePage(list) {
      let from = (this.currentPage - 1) * this.pageSize;
      let to = this.currentPage * this.pageSize;
      this.tableDataEnd = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.tableDataEnd.push(list[from]);
        }
      }
    },
    // 点击展示详情
    check(index, row) {
      console.log("index 和 row.id");
      console.log(index, row);
      this.dialogFormVisible = true;
      // console.log(this);
      this.more = row; //很重要！！
      // console.log("more", this.more);
    },
    async refused(id) {
      this.loading = true;
      let res = await this.$axios({
        url: "/user/application/reject",
        method: "delete",
        params: { userId: id },
        headers: { Authorization: window.sessionStorage.getItem("token") },
      });
      this.reload();
      this.dialogFormVisible = false;
      console.log(res.data.msg);
      this.loading = false;
    },
    async createData(id) {
      this.loading = true;
      let res = await this.$axios({
        url: "/user/application/offer",
        method: "get",
        params: { userId: id },
        headers: { Authorization: window.sessionStorage.getItem("token") },
      });
      this.reload();
      this.dialogFormVisible = false;
      console.log(res.data.msg);
      this.loading = false;
    },
    async reload() {
      if (this.tableDataEnd.length == 1 && this.currentPage > 1) {
        this.currentPage--;
      }
      let num = 1;
      let nextPage = 2;
      this.tableDataBegin = [];
      while (nextPage != 0) {
        let res = await this.$axios({
          url: "/user/application/applications",
          method: "get",
          params: {
            pageNum: num++,
          },
          headers: { Authorization: window.sessionStorage.getItem("token") },
        });
        this.tableDataBegin.push(...res.data.data.list);
        nextPage = res.data.data.nextPage;
      }
      if (this.flag) {
        this.filterTableDataEnd = [];
        this.tableDataBegin.forEach((value, index) => {
          if (value.phoneNumber) {
            if (value.phoneNumber.indexOf(this.tableDataName) >= 0) {
              this.filterTableDataEnd.push(value);
            }
          }
        });
        this.totalItems = this.filterTableDataEnd.length;
        this.currentChangePage(this.filterTableDataEnd);
      } else {
        this.currentChangePage(this.tableDataBegin);
        this.totalItems = this.tableDataBegin.length;
      }
      console.log("这是重新加载后的", this.tableDataEnd);
    },
  },
};
</script>

<style scope>
@import url(https://fonts.googleapis.com/css?family=Lato:400,700,900);

*,
*:before,
*:after {
  box-sizing: border-box;
}
.dialog-outer {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100000;
  background-size: cover;
  font: 14px/20px "Lato", Arial, sans-serif;
  color: #9e9e9e;
  margin-top: 30px;
}

img {
  transition: all 0.12s linear;
}

.slide-container {
  /* position: relative; */
  display: inline;
  margin: auto;
  width: 600px;
  text-align: center;
}

.wrapper {
  /* display: inline; */
  padding-top: 40px;
  padding-bottom: 40px;
}

.wrapper:focus {
  outline: 0;
}
/* el-dialog {
background-color: #309eff;
max-width: 1200px;
} */
.clash-card {
  /* display: inline; */
  overflow: hidden;
  background: white;
  width: 300px;
  display: inline-block;
  margin: auto;
  border-radius: 19px;
  position: relative;
  text-align: center;
  box-shadow:  -10px 80px 200px -50px rgb(64, 158, 255);
  z-index: 2;
  transition: all 0.1s linear;
  cursor: pointer;
}

.clash-card:hover {
  overflow: visible;
  transform: translateY(-20px) scale(1.05);
  box-shadow: -10px 100px 200px -80px rgb(64, 158, 255);
  transition: all 0.2s linear;
}

.clash-card:hover .clash-card__image--barbarian {
  /* height: 250px; */
  transition: all 0.2s linear;
}

.clash-card:hover img {
  transition: all 0.3s linear;
  transform: scale(0.95);
}

.clash-card__image {
  position: relative;
  height: 230px;
  margin-bottom: 35px;
  border-top-left-radius: 14px;
  border-top-right-radius: 14px;
}

.clash-card__image--wizard img {
  width: 330px;
  position: absolute;
  top: -28px;
  left: -10px;
}

.clash-card__level {
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 3px;
}

.clash-card__level--wizard {
  color: #4facff;
}

.clash-card__unit-name {
  font-size: 26px;
  color: black;
  font-weight: 900;
  margin-bottom: 5px;
}

.clash-card__unit-description {
  padding: 20px;
  margin-bottom: 10px;
}

.clash-card__unit-stats--wizard {
  background: #4facff;
}

.clash-card__unit-stats--wizard .one-third {
  border-right: 1px solid #309eff;
}

.clash-card__unit-stats {
  color: white;
  font-weight: 700;
  border-bottom-left-radius: 14px;
  border-bottom-right-radius: 14px;
}

.clash-card__unit-stats .one-third {
  overflow: hidden;
  width: 33%;
  float: left;
  height: 80px;
  padding: 20px 15px;
}

.clash-card__unit-stats sup {
  position: absolute;
  bottom: 4px;
  font-size: 45%;
  margin-left: 2px;
}

.clash-card__unit-stats .stat {
  transform: translateY(80px);
  position: relative;
  font-size: 30px;
  margin-bottom: 10px;
  transition: all 0.1s linear;
}

.one-third:hover .stat {
  transition: all 0.2s linear;
  transform: translateY(0px);
}

.one-third:hover .stat-value {
  transition: all 0.2s linear;
  transform: translateY(-100px);
}

.clash-card__unit-stats .stat-value {
  transform: translateY(-40px);
  transition: all 0.1s linear;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 15px;
}

.clash-card__unit-stats .no-border {
  border-right: none;
}
.stat {
  font-size: 20px;
  line-height: 40px;
}
.clearfix:after {
  visibility: hidden;
  display: block;
  font-size: 0;
  content: " ";
  clear: both;
  height: 0;
}

.slick-prev {
  left: 100px;
  z-index: 999;
}

.slick-next {
  right: 100px;
  z-index: 999;
}

.icon {
  margin-left: -10%;
}
.remind {
  color: rgb(64, 158, 255);
  font-family: NSimSun;
  font-weight: bold;
}
.item {
  margin-right: 40px;
}
.all {
  min-width: 1300px;
}
.seletend {
  margin-left: 10px;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.content {
  /* height: 100px; */
  font-size: 18px;
}
</style>