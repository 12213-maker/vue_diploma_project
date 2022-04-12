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
        <div class="item_item item_0" @click="changepath">
          <div class="item_0_info" v-if="this.$store.state.flag === 1">
            <div class="imgshow">
              <img
                class="img321"
                src="../../../public/img/imgcompany.jpg"
                alt=""
              />
            </div>
            <div class="right">
              <div class="item_0_name">{{ this.searchinfo.eName }}</div>
              <div class="item_0_time">
                创建时间: {{ this.searchinfo.creatTime }}
              </div>
            </div>
          </div>
          <div class="item_0_info" v-else>
            <div class="imgshow">
              <img
                src="../../../public/img/imgcompany.jpg"
                class="img321"
                alt=""
              />
            </div>
            <div class="right">
              <div class="item_0_name">{{ this.first_companies.eName }}</div>
              <div class="item_0_time">
                创建时间: {{ this.first_companies.creatTime }}
              </div>
            </div>
          </div>
        </div>
        <div class="item_item item_1" @click="changepath">
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
          <div class="item_1_info" v-if="this.$store.state.flag === 1">
            <div class="item_0_contact">
              联系方式: {{ this.searchinfo.eContact }}
            </div>
            <div class="item_0_address">
              地址:
              {{ this.searchinfo.provinceName + this.searchinfo.cityName }}
            </div>
          </div>
          <div class="item_1_info" v-else>
            <div class="item_0_contact">
              联系方式: {{ this.first_companies.eContact }}
            </div>
            <div class="item_0_address">
              地址:
              {{
                this.first_companies.provinceName +
                this.first_companies.cityName
              }}
            </div>
          </div>
        </div>
        <div class="item_item item_1" @click="changepath">
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
          <div class="item_1_info" v-if="this.$store.state.flag === 1">
            <div class="item_0_contact">
              排污口: {{ this.searchinfo.outputNum }}
            </div>
            <div class="item_0_address">
              状态:
              {{ this.searchinfo.state }}
            </div>
            <div class="item_0_address">
              收藏:
              <i
                :class="
                  judgecollect == 0 ? 'el-icon-star-off' : 'el-icon-star-on'
                "
              ></i>
            </div>
          </div>
          <div class="item_1_info" v-else>
            <div class="item_0_contact">
              排污口: {{ this.first_companies.outputNum }}
            </div>
            <div class="item_0_address">
              状态:
              {{ this.first_companies.state }}
            </div>
            <div class="item_0_address">
              收藏:
              <i
                :class="
                  judgecollect == 0 ? 'el-icon-star-off' : 'el-icon-star-on'
                "
              ></i>
            </div>
          </div>
        </div>
        <div class="item_item item_3">
          <button class="butn321" @click="handletap(1)">Collect</button>
          <button
            class="butn321"
            @click="handletap(0)"
            style="--color: #f3738a"
          >
            Cancel
          </button>
        </div>
      </div>
      <div class="classitem class_2">
        <div id="box" class="contain"></div>
        <div class="time_picker" @click="infoToUser">
          <el-date-picker
            size="mini"
            v-model="chosetime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="timepickerchange"
          >
          </el-date-picker>
        </div>
      </div>
      <div class="classitem class_4">
        <div class="record">
          <el-table :data="Violation_record" style="width: 100%" height="70vh">
            <el-table-column
              type="index"
              align="center"
              label="序号"
              width="100"
            >
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="违规日期"
              align="center"
              width="220"
            >
            </el-table-column>
            <el-table-column
              prop="state"
              fixed="right"
              label="状态"
              align="center"
              width="230"
            >
              <template slot-scope="scope">
                <el-button
                  class="item_btn"
                  v-if="scope.row.state == 1"
                  type="warning"
                  size="small"
                  plain
                  >软件伪造数据</el-button
                >
                <el-button
                  class="item_btn"
                  v-else
                  type="danger"
                  plain
                  size="small"
                  >数据伪造</el-button
                >
              </template>
            </el-table-column>
            <div class="lookmore" @click="changepath" slot="append" style="height:30px;lineHeight:30px;">
              <div >
                查看更多<i class="el-icon-caret-right"></i>
              </div>
            </div>
          </el-table>
        </div>
        <div class="both_right" id="echarts4"></div>
      </div>
      <div class="classitem class_3">
        <div class="item3_item item3_0" id="echarts1"></div>
        <div class="item3_item item3_1" id="echarts2"></div>
        <div class="item3_item item3_2" id="echarts3"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  //注入刷新依赖provide/inject
  inject: ["reload"],
  name: "Data",
  // components:{NavBar},
  data() {
    return {
      mycharts: {},
      mycharts1: {},
      mycharts2: {},
      mycharts3: {},
      mycharts4: {},

      //item4中污染物的浓度是否超标
      isOOS: false,
      dialogTableVisible: false,

      forecast: [10, 11, 13, 11, 12, 12, 9, 13, 10, 14],
      real: [13, 15, 19, 16, 14, 15, 14, 16, 15, 12],

      //企业的违规记录
      Violation_record: [],
      //触底的时候停止无限加载
      disabled123: false,
      //加载的页数
      num: 0,

      //真实排污数据
      show_data: [],

      //预测排污数据
      forcastinfo_data: [],
      forcastinfo_name: [],

      //所有公司(申请所有的公司以获取第一个公司的数据)
      all_companies: {},
      //第一个公司的数据:
      first_companies: {},

      /* 是否收藏 */
      iscollect: false,
      // 判断这个公司是否被用户收藏
      judgecollect: false,
      /* 从search跳转过来 , 保存路由信息 , 这个页面里面的公司的所有数据*/
      searchinfo: {},

      //下面是污水数据模块
      All_sewage: {},
      All_sewage_data: [],
      All_sewage_name: [],

      Echarts_1_serieslist: [],

      //第一张表上的选择时间
      chosetime: "",
      //第一张表的选择时间
      timelist: [],

      //下面三张表
      Echarts_show_1: {
        name: "",
        data: [],
      },
      Echarts_show_2: {
        name: "",
        data: [],
      },
      Echarts_show_3: {},
      name: "",
      data: [],
    };
  },
  methods: {
    /* Echarts相关配置 */
    Echarts() {
      /* 创建一个echarts实例 */
      this.mycharts = this.$echarts.init(document.getElementById("box"));
      let option = {
        title: {
          text: "真实排污数据",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          left: "10%",
          data: this.All_sewage_name,
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "5%",
          containLabel: true,
        },
        xAxis: {
          axisTick: {
            show: false,
          },
          type: "category",
          boundaryGap: false,
          data: this.timelist,
        },
        yAxis: {
          axisLabel: {
            // formatter: "{value} °C",
            color: "rgb(48, 65, 86)",
          },
          axisLine: {
            show: true,
            color: "rgb(72, 171, 219)",
          },
          type: "value",
        },
        series: this.Echarts_1_serieslist,
      };

      /* 将配置项设置给echarts实例对象 */
      this.mycharts.setOption(option);
    },

    Echarts1() {
      this.mycharts1 = this.$echarts.init(document.getElementById("echarts1"));
      let option = {
        title: {
          text: this.Echarts_show_1.name || "暂无数据",
          textStyle: {
            color: "white",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        series: [
          {
            name: this.Echarts_show_1.name,
            type: "pie",
            radius: [20, 100],
            center: ["50%", "50%"],
            itemStyle: {
              borderRadius: 8,
            },
            data: this.Echarts_show_1.data,
          },
        ],
      };
      this.mycharts1.setOption(option);
    },

    Echarts2() {
      this.mycharts2 = this.$echarts.init(document.getElementById("echarts2"));
      let option = {
        title: {
          text: this.Echarts_show_2.name || "暂无数据",
          textStyle: {
            color: "white",
          },
        },
        tooltip: {
          trigger: "axis",
        },
        // legend: {
        //   data: ["Rainfall", "Evaporation"],
        // },
        xAxis: [
          {
            axisLabel: {
              rotate: -45,
              textStyle: {
                color: "#999",
              },
            },
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
            name: this.Echarts_show_2.name,
            type: "bar",
            data: this.Echarts_show_2.data,
          },
        ],
      };
      this.mycharts2.setOption(option);
    },

    Echarts3() {
      this.mycharts3 = this.$echarts.init(document.getElementById("echarts3"));
      let option = {
        title: {
          text: this.Echarts_show_3.name || "暂无数据",
          textStyle: {
            color: "white",
          },
        },
        radar: {
          indicator: [
            { name: -5 },
            { name: -4 },
            { name: -3 },
            { name: -2 },
            { name: -1 },
            { name: "today" },
            { name: 1 },
            { name: 2 },
            { name: 3 },
            { name: 4 },
          ],
        },
        series: [
          {
            itemStyle: {
              //此属性的颜色和下面areaStyle属性的颜色都设置成相同色即可实现
              color: "#5840D4",
              borderColor: "#5840D4",
            },
            areaStyle: {
              color: "#5840D4",
            },
            name: "Budget vs spending",
            type: "radar",
            data: [
              {
                value: this.Echarts_show_3.data || null,
                name: "Allocated Budget",
              },
            ],
          },
        ],
      };
      this.mycharts3.setOption(option);
    },

    Echarts4() {
      this.mycharts4 = this.$echarts.init(document.getElementById("echarts4"));
      const option = {
        title: {
          text: "预测排污数据",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          left: "120px",
          data: this.forcastinfo_name,
        },
        grid: {
          top: "50px",
          left: "50px",
          right: "35px",
          bottom: "50px",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["today", "tomorrow", "acquired"],
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
        series: this.forcastinfo_data,
      };
      this.mycharts4.setOption(option);
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
    async handletap(value) {
      if (value) {
        //判断是不是默认的公司
        if (this.$store.state.flag === 1) {
          // console.log(this.searchinfo);
          // 订阅此企业
          let res = await this.$request(
            "post",
            "/collection/add",
            {
              userId: window.sessionStorage.getItem("userId"),
              eId: this.searchinfo.eId,
            },
            0
          );
          // console.log(res,'search');
        } else {
          let res = await this.$request(
            "post",
            "/collection/add",
            {
              userId: window.sessionStorage.getItem("userId"),
              eId: this.first_companies.eId,
            },
            0
          );
        }

        this.iscollect = true;
        this.$message.success("成功收藏");
        this.$store.commit("changeIsCollect", true);
        this.judgecollect = 1;
        // console.log(this.iscollect);
      } else {
        //判断是不是默认的公司
        if (this.$store.state.flag === 1) {
          // 取消订阅此企业
          let res = await this.$request(
            "post",
            "/collection/cancel",
            {
              userId: window.sessionStorage.getItem("userId"),
              eId: this.searchinfo.eId,
            },
            0
          );
        } else {
          let res = await this.$request(
            "post",
            "/collection/cancel",
            {
              userId: window.sessionStorage.getItem("userId"),
              eId: this.first_companies.eId,
            },
            0
          );
        }

        this.iscollect = false;
        this.$message.info("取消收藏");
        this.$store.commit("changeIsCollect", false);
        this.judgecollect = 0;
      }
      this.iscollect = !this.iscollect;
    },

    //查询用户是否收藏该企业
    async iscollect121138() {
      let eId =
        window.sessionStorage.getItem("eId") ||
        window.sessionStorage.getItem("default_eid");
      let res = await this.$request(
        "post",
        "/collection/isCollected",
        {
          userId: window.sessionStorage.getItem("userId"),
          eId,
        },
        0
      );
      // console.log(res);
      //1 订阅 , 0 未订阅
      this.judgecollect = res.data.data;
      // console.log('是否订阅',this.judgecollect==0?'未订阅':"订阅");
    },

    changepath() {
      // this.$router.push("/home/enterprise_information");
      this.$router.push({
        path: "/home/enterprise_information",
        query: {
          companyInfo: this.searchinfo || this.first_companies,
        },
      });
    },

    //先暂时获取一段时间的污染物的数据
    async getContaminantData() {
      let data = new Date();
      let left_time = `${data.getFullYear()}-${data.getMonth() + 1}-${
        data.getDate() - 5
      } ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;

      // console.log(left_time, "我是左边的时间");

      let right_time = `${data.getFullYear()}-${data.getMonth() + 1}-${
        data.getDate() + 4
      } ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;

      // console.log(right_time, "我是右边的时间");

      //请求的时候使用左边的时间left_time和右边的时间right_time来
      let res4 = await this.$request(
        "post",
        "/data/query/getContaminantData",
        {
          eNumber: 1,
          startTime: "2021-10-01 0:0:0",
          endTime: "2021-10-11 0:0:0",
        },
        0
      );

      // console.log(res4,'我是真实');

      //设置时间的显示
      this.timelist = [
        "2021-10-01",
        "2021-10-02",
        "2021-10-03",
        "2021-10-04",
        "2021-10-05",
        "2021-10-06",
        "2021-10-07",
        "2021-10-08",
        "2021-10-09",
        "2021-10-10",
      ];

      this.All_sewage = res4.data.data;

      // console.log(this.All_sewage, "我是全部数据");
      // console.log(Object.keys(this.All_sewage), "我是全部数据的属性名");
      //我只需要前三个属性名
      let attr1 = Object.keys(this.All_sewage)[0];
      let attr2 = Object.keys(this.All_sewage)[1];
      let attr3 = Object.keys(this.All_sewage)[2];

      //这是表一的数据
      this.Echarts_show_1.data =
        this.All_sewage[Object.keys(this.All_sewage)[0]];
      this.Echarts_show_1.name = Object.keys(this.All_sewage)[0];
      //处理表一的数据
      this.Echarts_show_1.data = this.Echarts_show_1.data.map((item, index) => {
        return { value: item, name: index + 1 };
      });

      //表二的数据
      this.Echarts_show_2.data =
        this.All_sewage[Object.keys(this.All_sewage)[1]];
      this.Echarts_show_2.name = Object.keys(this.All_sewage)[1];

      //表三的数据
      this.Echarts_show_3.data =
        this.All_sewage[Object.keys(this.All_sewage)[3]];
      this.Echarts_show_3.name = Object.keys(this.All_sewage)[3];

      for (let i in this.All_sewage) {
        this.All_sewage_name.push(i);
        this.All_sewage_data.push(this.All_sewage[i]);
      }

      let len = this.All_sewage_data.length;
      for (let i = 0; i < len; i++) {
        let that = this;
        this.Echarts_1_serieslist.push({
          name: that.All_sewage_name[i],
          type: "line",
          data: that.All_sewage_data[i],
        });
      }

      // console.log(this.Echarts_1_serieslist, "我是初始化的数据");
    },

    //点击时间选择器的时候提醒用户
    infoToUser() {
      const h = this.$createElement;

      this.$notify({
        title: "提示",
        message: h(
          "i",
          { style: "color: teal" },
          "请在 2020-1-1 至 2021-12-29 之间进行选择"
        ),
        duration: 5000,
      });
    },
    //第一张表选择时间改变的时候触发
    async timepickerchange(value) {
      let startTime = `${value[0].getFullYear()}-${
        value[0].getMonth() + 1
      }-${value[0].getDate()} ${value[0].getHours()}:${value[0].getMinutes()}:${value[0].getSeconds()}`;
      let endTime = `${value[1].getFullYear()}-${
        value[1].getMonth() + 1
      }-${value[1].getDate()} ${value[1].getHours()}:${value[1].getMinutes()}:${value[1].getSeconds()}`;

      //截取年份
      let time1 = startTime.split(" ")[0].toString().split("-");
      let time1_year = Number(time1[0]);
      let time1_month = Number(time1[1]);
      let time1_day = Number(time1[2]);
      let time2 = endTime.split(" ")[0].toString().split("-");
      let time2_year = Number(time2[0]);
      let time2_month = Number(time2[1]);
      let time2_day = Number(time2[2]);

      if (time1_year < 2020 || time2_year > 2021) {
        this.$message.warning("请在 2020-1-1 至 2021-12-29 之间进行选择");
        return;
      }

      let res4 = await this.$request(
        "post",
        "/data/query/getContaminantData",
        {
          eNumber: 1,
          startTime,
          endTime,
        },
        0
      );
      let all = res4.data.data;
      let a = [];
      let b = [];
      for (let i in all) {
        a.push(i);
        let series = {
          name: i,
          type: "line",
          data: all[i],
        };
        b.push(series);
      }
      //重新渲染大图表
      this.mycharts.setOption({
        series: b,
        legend: {
          data: a,
        },
        xAxis: {
          data: [time1, "1", "2", "3", "4", "5", "6", "7", "8", time2],
        },
      });

      //那我就给这里显示最后面的三个数据
      //这是三个属性
      let Echarts_1 = {
        name: [],
        data: [],
      };
      //这是返回的所有属性的名字
      let arr_name = Object.keys(all);
      Echarts_1.name = arr_name[0];
      //饼图的data格式是[{value:  , name:  },{value:  , name:  }]
      Echarts_1.data = all[arr_name[0]].map((item, index) => {
        if (index == 0) return { value: item, name: startTime.split(" ")[0] };
        if (index == all[arr_name[0]].length - 1)
          return { value: item, name: endTime.split(" ")[0] };
        return { value: item, name: index + 1 };
      });
      // //重新渲染下面的三个图表中的第一个图表
      this.mycharts1.setOption({
        title: {
          text: `${Echarts_1.name} ${startTime.split(" ")[0]}` || "暂无数据",
        },
        series: [
          {
            name: Echarts_1.name,
            data: Echarts_1.data,
          },
        ],
      });

      let Echarts_2 = {
        name: [],
        data: [],
      };
      Echarts_2.name = arr_name[1];
      Echarts_2.data = all[arr_name[0]];

      this.mycharts2.setOption({
        title: {
          text: `${Echarts_2.name} ${startTime.split(" ")[0]}` || "暂无数据",
        },
        series: [
          {
            name: Echarts_2.name,
            data: Echarts_2.data,
          },
        ],
        xAxis: [
          {
            data: [
              startTime.split(" ")[0],
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              endTime.split(" ")[0],
            ],
          },
        ],
      });

      //现在来设置表三
      let Echarts_3 = {
        name: [],
        data: [],
      };
      Echarts_3.name = arr_name[3];
      Echarts_3.data = all[arr_name[3]];
      this.mycharts3.setOption({
        radar: {
          indicator: [
            { name: startTime.split(" ")[0] },
            { name: 1 },
            { name: 2 },
            { name: 3 },
            { name: 4 },
            { name: 5 },
            { name: 6 },
            { name: 7 },
            { name: 8 },
            { name: endTime.split(" ")[0] },
          ],
        },
        title: {
          text: `${Echarts_2.name} ${startTime.split(" ")[0]}` || "暂无数据",
        },
        series: [
          {
            name: "Budget vs spending",
            type: "radar",
            data: [
              {
                value: Echarts_3.data || null,
                name: "Allocated Budget",
              },
            ],
          },
        ],
      });
    },
    //查询某个企业的违规记录
    async selectEnterpriseIllegalHistory() {
      let res = await this.$axios({
        url: "/data/selectEnterpriseIllegalHistory",
        method: "get",
        params: {
          pageNum: 1,
          eNumber: 1,
        },
      });

      this.Violation_record.push(...res.data.data.list);
    },

    //无限滚动加载更多
    // loadmore() {
    //   // this.disabled123 = true
    //   this.$message.success("我触发了");
    //   // setTimeout(()=>{
    //   //   this.selectEnterpriseIllegalHistory(this.num+1)
    //   // },500)
    // },
    //获取全部的公司
    async allInfo() {
      let res = await this.$request(
        "post",
        "/enterprise/queryAll",
        { pageNum: 1 },
        0
      );

      this.first_companies = res.data.data.list[0];
      this.$store.commit("changecompanyInfoShow", this.first_companies);
      window.sessionStorage.setItem("default_eid", this.first_companies.eId);
      console.log(this.first_companies, "我是login默认的");
    },

    //查询预测数据
    async forecastdata() {
      let data = [];
      let res = await this.$axios({
        url: "/data/queryRedata",
        method: "get",
        params: {
          eNumber: 1,
        },
      });
      data = res.data.data;

      for (let i in data) {
        this.forcastinfo_name.push(i);
        this.forcastinfo_data.push(data[i]);
      }
      this.forcastinfo_data = this.forcastinfo_data.map((item, index) => {
        return {
          data: item,
          type: "line",
          areaStyle: {},
          name: this.forcastinfo_name[index],
        };
      });
      // console.log(this.forcastinfo_data, this.forcastinfo_name);
    },
  },
  async mounted() {
    /* 图表响应式 */
    let _this = this;
    window.onresize = function () {
      _this.mycharts.resize();
      _this.mycharts1.resize();
      _this.mycharts2.resize();
      _this.mycharts3.resize();
      _this.mycharts4.resize();
    };
  },
  async created() {
    this.searchinfo = this.$route.query.companyInfo;
    this.searchinfo = this.$store.state.companyInfoShow;
    this.first_companies = this.$store.state.companyInfoShow;

    await this.forecastdata();
    this.selectEnterpriseIllegalHistory();
    /* 从search跳转过来 , searchInfo保存路由信息 */

    this.$store.commit("changecompanyInfoShow", this.searchinfo);
    console.log(this.searchinfo, "我是搜索显示的数据");
    await this.getContaminantData();
    this.Echarts();
    this.Echarts1();
    this.Echarts2();
    this.Echarts3();
    this.Echarts4();
    this.allInfo();
    // this.getallinfo();
    // this.searchinfo1();
    this.iscollect121138();
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

.item_1_info {
  position: absolute;
  right: 0;
  /* background-color: pink; */
  width: 65%;
  height: 100%;
  /* display: flex;
  flex-direction: column; */
}
.item_0_info {
  position: absolute;
  /* right: 0; */
  /* background-color: pink; */
  width: 100%;
  height: 100%;
  /* display: flex;
  flex-direction: row; */
}
.imgshow {
  width: 45%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.img321 {
  width: 100%;
  object-fit: cover;
}
.right {
  width: 50%;
  position: absolute;
  right: 0;
  /* background-color: blue; */
  top: 0;
  height: 100%;
}

.item_0_name {
  /* flex: 1; */
  position: relative;
  top: 25px;
  /* margin-bottom: 10px; */
  /* height: 55%; */
  line-height: 150%;
  text-align: left;
  font-size: 22px;
  color: rgb(240, 242, 245);
  font-weight: 600;
  /* background-color: #37fc62; */
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.item_0_contact {
  /* width: 100%; */
  height: 60%;
  line-height: 600%;
  text-align: left;
  font-size: 16px;
  color: rgb(240, 242, 245);
  font-weight: 600;
  /* background-color: #37fc62; */
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.item_0_address {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  /* flex: 1; */
  font-size: 16px;
  font-weight: 600;
  /* height: 50%; */
  line-height: 150%;
  text-align: left;
  color: rgb(240, 242, 245);
  /* background-color: blue; */
}
.item_0_time {
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  /* flex: 1; */
  height: 50%;
  line-height: 550%;
  text-align: left;
  color: rgb(240, 242, 245);
  position: absolute;
  bottom: 15px;
  /* background-color: blue; */
}
.item_1 {
  flex: 2;
  position: relative;
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
  position: relative;
  /* background-color: pink; */
}
.time_picker {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
.el-date-picker {
  cursor: pointer;
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
  /* box-shadow: 0 3px 8px 6px rgba(167, 98, 20, 0.06); */
  /* background-color: #37e8fc; */
  height: 70vh;
  width: 100%;
  background-color: rgb(240, 242, 245);
  display: flex;
  flex-direction: row;
}

.record {
  box-shadow: 0 3px 8px 6px rgba(167, 98, 20, 0.06);
  margin-right: 30px;
  height: 70vh;
  width: 50%;
  /* display: relative; */
}
.lookmore {
  /* display: absolute; */
  /* right: 0; */
  font-size: 14px;
  color: rgb(144, 147, 153);
  width: 100%;
  /* background-color: pink; */
  text-align: right;
  cursor: pointer;
}
.both_right {
  border-radius: 10px;
  box-shadow: 0 3px 8px 6px rgba(167, 98, 20, 0.06);
  height: 100%;
  /* background-color: #bfa; */
  width: 50%;
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
.el-table th.el-table__cell,
.el-table__fixed-right-patch {
  background-color: rgb(243, 244, 247) !important;
}
.item_3_span,
label {
  text-align: left;
}
.has-gutter,
.el-table__header-wrapper,
.el-dialog__header,
.el-table_3_column_12,
.is-leaf,
.el-table__cell {
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
.el-table__cell {
  line-height: 0 !important;
}
</style>
 