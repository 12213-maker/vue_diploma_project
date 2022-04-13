<template>
  <div class="all0" v-if="this.$store.state.freeze === 1">
    <h1 @click="changepath" class="title_all0">
      Please select the company to view corporate information.
    </h1>
  </div>

  <div v-else class="blog">
    <!-- 1 -->
    <div class="blog-part is-menu">
      <span class="blog-menu router" @click="pageForward('/home/data/echarts')">
        Sewage data
      </span>
      <span class="blog-menu router" @click="pageForward('/home/search')"
        >All enterprise</span
      >
      <span class="blog-menu router" @click="pageForward('/home/analysis')"
        >Data analysis</span
      >
      <span class="blog-menu router" @click="pageForward('/home/user')"
        >Personal page</span
      >
      <span class="blog-menu mention">@ROUTERPUSH</span>
      <span class="blog-menu subscribe">navigation</span>
    </div>
    <!-- 2 -->
    <div class="blog-header blog-is-sticky">
      <div class="blog-article header-article">
        <div class="blog-big__title">Firm</div>
        <div class="blog-menu rounded small-title">
          {{ this.testinfo.eName }}
        </div>
      </div>
      <div class="blog-article time">{{ this.testinfo.creatTime }}</div>
    </div>
    <!-- 3 -->
    <div class="blog-header-container">
      <!-- 3-1 -->
      <div class="blog-header">
        <div class="blog-article header-article">
          <div class="blog-big__title">Present</div>
          <div class="blog-menu small-title date">
           Established Time : {{ this.testinfo.creatTime }}
          </div>
        </div>
        <div class="blog-article">
          <img src="../../../public/img/imgcompany.jpg" alt="" />

          <h2 style="paddingBottom:30px;">Company Profile : {{ this.testinfo.introduction }}</h2>

          <div class="blog-detail">
            <div class="blog_item">
              <span>address</span>
              <span
                >{{ this.testinfo.provinceName }}
                {{ this.testinfo.cityName }}</span
              >
            </div>
            <div class="blog_item">
              <span>Sewage data</span>
              <span>{{ this.testinfo.state }}</span>
            </div>
            <div class="blog_item">
              <span>sewage outfall</span>
              <span>{{ this.testinfo.outputNum }}</span>
            </div>
            <div class="blog_item">
              <span>Company Profile</span>
              <span>{{ this.testinfo.introduction }}</span>
            </div>
          </div>
          <!-- <p>Company Profile : {{ this.testinfo.introduction }}</p> -->
          <a href="#" style="cursion: text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-corner-down-right"
              viewBox="0 0 24 24"
            >
              <!-- <path d="M15 10l5 5-5 5" />
              <path d="M4 4v7a4 4 0 004 4h12" /> -->
            </svg>
            <i class="el-icon-bottom"></i>
            Next
          </a>
        </div>
      </div>
      <!-- 3-2 -->
      <div class="blog-header">
        <div class="blog-article header-article">
          <div class="blog-big__title">Contact</div>
          <div class="blog-menu small-title date">
           Telephone Number : {{ this.testinfo.eContact }}
          </div>
        </div>
        <div class="blog-article">
          <img src="../../../public/img/src=http _up.enterdesk.com_edpic_source_e2_bb_96_e2bb96f4f5a3d5618c6481a3044f8917.jpg&refer=http _up.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto.webp" alt="" />
          <h2 style="paddingBottom:30px;">Contamination type : </h2>

          <p>
           {{sewagetype.join(' ')}}
          </p>
          <a href="#" style="cursion: text">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="feather feather-corner-down-right"
              viewBox="0 0 24 24"
            >
            </svg>
            <i class="el-icon-top"></i>
            In the end
          </a>
        </div>
      </div>
      
    </div>
    <!-- 4 -->
    <div class=" right-blog">
    <el-table

            v-el-table-infinite-scroll="loadmore"
            :data="Violation_record"
            height="100vh"
          >
            <el-table-column
              type="index"
              align="center"
              label="序号"
              width="50"
            >
            </el-table-column>
            <el-table-column
              prop="createTime"
              label="违规日期"
              align="center"
              width="200"
            >
            </el-table-column>
            <el-table-column
              prop="state"
              fixed="right"
              label="状态"
              width="120"
              align="center"
            >
              <template slot-scope="scope">
                <el-tag
                  class="item_btn"
                  v-if="scope.row.state == 1"
                  type="warning"
                  size="mini"
                  plain
                  >软件伪造数据</el-tag
                >
                <el-tag
                  class="item_btn"
                  v-else
                  type="danger"
                  plain
                  size="mini"
                  >数据伪造</el-tag
                >
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
      // 第一次展示的公司的数据
      testinfo: {},
      //企业的违规记录
      Violation_record: [],

      // 还要备用两张照片
      imgs: {
        img1: "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic_source%2Fe2%2Fbb%2F96%2Fe2bb96f4f5a3d5618c6481a3044f8917.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1650782449&t=bf5e7941bbbd599def4d0db883121d60",
        img2: "https://img1.baidu.com/it/u=2838359103,4082675852&fm=253&fmt=auto&app=120&f=JPEG?w=889&h=500",
      },

      //这个公司的污染数据
      All_sewage:{},

      //污染物种类
      sewagetype:[],
      nextPage:1,
      disabled123: false,
      pageNum: 2,
    };
  },
  methods: {
    async loadmore(){
      if(this.nextPage==0){
        this.$message.info('所有信息展示完毕')
        return
      }
      let res = await this.$axios({
        url: "/data/selectEnterpriseIllegalHistory",
        method: "get",
        params: {
          pageNum: this.pageNum++,
          eNumber: 1,
        },
      });
      this.nextPage = res.data.data.nextPage
      this.Violation_record.push(...res.data.data.list);
    },
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
      console.log(res);

    },
    /* 点击左边的导航跳转到相应的页面 */
    pageForward(value) {
      if(value=='/home/data/echarts')
      {
        this.$store.commit("changepath",'/home/data');
        this.$router.push({
        path:value,
        query:{
          companyInfo:this.testinfo
        }
      });
      return;
      }
      this.$store.commit("changepath",value);
      this.$router.push(value)
    },
    changepath() {
      this.$store.commit("changepath",'/home/data');
      this.$router.push("/home/data/echarts");
    },
    //获取这个公司的污染数据
    //先暂时获取一段时间的污染物的数据
    async getContaminantData() {
      let data = new Date();
      let left_time = `${data.getFullYear()}-${data.getMonth() + 1}-${
        data.getDate() - 5
      } ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;

      console.log(left_time, "我是左边的时间");

      let right_time = `${data.getFullYear()}-${data.getMonth() + 1}-${
        data.getDate() + 4
      } ${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;

      console.log(right_time, "我是右边的时间");

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

      this.All_sewage = res4.data.data;

      for(let i in this.All_sewage){
          this.sewagetype.push(i)
      }
      


      console.log(this.All_sewage, "我是全部数据");
     
    },
    //根据id查询公司信息
    async getinfobyid(){
      let eNumber =window.sessionStorage.getItem("eNumber")||window.sessionStorage.getItem("default_eNumber")

      let res = await this.$request('post','/enterprise/query',{
        pageNum:1,
        eNumber
      },0)

      // console.log(res,'我是根据公司id查询的公司信息');
      this.testinfo = res.data.data.list[0]
    },
  },
  created() {
    this.getinfobyid()
    this.getContaminantData()
    this.selectEnterpriseIllegalHistory()
  },
  mounted() {
    this.$store.commit("changeIsCollapse", true);
  },
  beforeDestroy() {
    /* 打开折叠框 */
    this.$store.commit("changeIsCollapse", false);
  },
};
</script>

<style scoped>
.all0 {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  z-index: 999;
  background: linear-gradient(white, rgb(48, 65, 86));
}
.title_all0 {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 40px;
  cursor: pointer;
}
.el-main {
  line-height: 0 !important;
}
.time {
  position: absolute;
  bottom: 0;
  font-size: 40px;
}

@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,400;1,500&family=Inter:wght@300;400;500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap");
* {
  outline: none;
  box-sizing: border-box;
}
.router {
  cursor: pointer;
}
html {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

img {
  max-width: 100%;
}

body {
  background-color: #121418;
  display: flex;
  font-family: "Inter", sans-serif;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 0 2em;
  font-weight: 400;
  height: 100vh;
}
@media screen and (max-width: 768px) {
  body {
    padding: 0;
  }
}

.blog {
  background-color: rgb(240, 242, 245);
  /* max-width: 1350px; */
  display: grid;
  /* height: 90vh; */
  height: 100%;
  max-height: 800px;
  overflow: hidden;
  grid-template-columns: 15% 20% 35% 30%;
  grid-template-rows: 100%;
  width: 100%;
  /* padding: 40px 4px; */
  position: relative;
}
@media screen and (max-width: 1030px) {
  .blog {
    grid-template-columns: 20% 50% 30%;
  }
}
@media screen and (max-width: 768px) {
  .blog {
    grid-template-columns: 25% 75%;
    width: 100%;
    max-width: none;
  }
}
@media screen and (max-width: 560px) {
  .blog {
    grid-template-columns: 100%;
  }
}
.blog-part {
  padding: 0 20px;
}
.blog-part:not(:last-child) {
  border-right: 1px solid #94918f;
}
.blog-menu {
  font-size: 22px;
  text-decoration: none;
  color: #161419;
  display: flex;
  letter-spacing: -0.5px;
  align-items: center;
}
@media screen and (max-width: 1260px) {
  .blog-menu {
    font-size: 1.6vw;
  }
}
.blog-menu svg {
  width: 22px;
  margin-left: 4px;
}
.blog-menu + .blog-menu {
  margin-top: 24px;
}
.blog-menu.mention {
  margin-top: auto;
  font-size: 19px;
}
@media screen and (max-width: 1260px) {
  .blog-menu.mention {
    font-size: 1.4vw;
  }
}
.blog-menu.subscribe {
  margin-top: 8px;
  font-size: 19px;
  position: relative;
}
@media screen and (max-width: 1260px) {
  .blog-menu.subscribe {
    font-size: 1.4vw;
  }
}
.blog-menu.subscribe:before {
  content: "";
  width: 16px;
  height: 16px;
  background-color: #161419;
  left: 0;
  border-radius: 1px;
  margin-right: 14px;
}
.blog-menu.rounded:before {
  content: "";
  border-radius: 50%;
  width: 12px;
  height: 12px;
  background-color: #161419;
  margin-right: 12px;
}
.blog .is-menu {
  display: flex;
  flex-direction: column;
}
@media screen and (max-width: 1030px) {
  .blog .is-menu {
    display: none;
  }
}
.blog-big__title {
  font-size: 132px;
  font-family: "Space Grotesk", sans-serif;
  font-weight: 700;
  letter-spacing: -5px;
  line-height: 1;
  margin-bottom: 6px;
}
@media screen and (max-width: 1400px) {
  .blog-big__title {
    font-size: 120px;
  }
}
@media screen and (max-width: 1260px) {
  .blog-big__title {
    font-size: 9vw;
    letter-spacing: -2px;
  }
}
@media screen and (max-width: 560px) {
  .blog-big__title {
    font-size: 36px;
    margin-bottom: 12px;
  }
}
.blog-header {
  display: flex;
  flex-direction: column;
}
.blog-article {
  padding: 0 20px;
}
.blog-article img {
  height: 260px;
  max-height: 22vh;
  width: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  filter: grayscale(1);
}

.page-number {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 100%;
  font-size: 72px;
  text-align: center;
  letter-spacing: -3px;
  font-weight: lighter;
  font-family: "Space Grotesk", sans-serif;
  border-right: 1px solid #94918f;
  white-space: nowrap;
}
@media screen and (max-width: 1260px) {
  .page-number {
    font-size: 5vw;
  }
}

.small-title {
  border-bottom: 1px solid #94918f;
  margin-bottom: 20px;
  padding-bottom: 20px;
}
@media screen and (max-width: 560px) {
  .small-title {
    font-size: 14px;
    position: absolute;
    top: 10px;
    right: 24px;
    border-bottom: 0;
  }
}

.date {
  display: flex;
  justify-content: flex-end;
}

.blog-article h2 {
  font-size: 26px;
  font-weight: 500;
  line-height: 1.2;
  margin: 8px 0 8px;
}
.blog-article h2 span {
  font-family: "Playfair Display", serif;
}
.blog-article p {
  line-height: 1.5;
  margin: 14px 0;
}
.blog-article a {
  color: #161419;
  text-decoration: none;
  font-size: 26px;
  letter-spacing: -1px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: auto;
  border-top: 1px solid #94918f;
  padding-top: 14px;
}
.blog-article a svg {
  width: 26px;
  margin-right: 10px;
}

.blog-detail {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  /* background-color: bisque; */
}
.blog_item{
  width: 100%;
  /* background-color: aquamarine; */
  display: flex;
  padding-bottom: 10px;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
}
.blog-detail span {
  font-family: "Playfair Display", serif;
}

.blog-header-container {
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  -ms-scroll-snap-type: y mandatory;
  scroll-snap-type: y mandatory;
  border-right: 1px solid #94918f;
}
@media screen and (max-width: 768px) {
  .blog-header-container {
    border-right: 0;
  }
}
.blog-header-container > * {
  flex-shrink: 0;
  min-height: 100%;
  scroll-snap-align: start;
}
.blog-header-container .blog-article:not(.header-article) {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

marquee {
  font-size: 20px;
  background-color: rgb(48, 65, 86);
  color: #e9e6e4;
  padding: 6px 0;
  width: calc(100% + 44px);
  margin-left: -20px;
  flex-shrink: 0;
}
marquee span:before {
  display: inline-block;
  content: "";
  border-radius: 50%;
  width: 10px;
  height: 10px;
  position: relative;
  top: -1px;
  vertical-align: baseline;
  background-color: #e9e6e4;
  margin: 0 16px;
}

.blog-right {
  overflow: auto;
  height: calc(100% + 60px);
}
.blog-right .rounded {
  font-style: italic;
  font-size: 18px;
}
.blog-right .rounded:before {
  content: "";
  border-radius: 50%;
  width: 9px;
  height: 9px;
  background-color: #161419;
  margin-right: 6px;
}

.blog-right-title {
  font-size: 25px;
  font-family: "Playfair Display", serif;
}

.blog-right-title-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #94918f;
  margin-bottom: 20px;
  padding-bottom: 20px;
  margin-top: 100px;
  letter-spacing: -1px;
}
@media screen and (max-width: 1400px) {
  .blog-right-title-container {
    margin-top: 88px;
  }
}
@media screen and (max-width: 1260px) {
  .blog-right-title-container {
    margin-top: 6vw;
  }
}
@media screen and (max-width: 1030px) {
  .blog-right-title-container {
    margin-top: 5vw;
  }
}

.blog-title-date {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.blog-right-page {
  font-size: 56px;
  margin-bottom: 16px;
  font-family: "Space Grotesk", sans-serif;
}
.blog-right-page-title {
  font-family: "Space Grotesk", sans-serif;
  font-size: 28px;
  font-weight: 600;
  max-width: 16ch;
  letter-spacing: -2px;
}
.blog-right-page-subtitle {
  max-width: 33ch;
  font-size: 15px;
  margin-top: 12px;
  line-height: 1.4;
}

.blog-right-container + .blog-right-container {
  margin-top: 40px;
}

.right-blog {
  display: flex;
  flex-direction: column;
}
@media screen and (max-width: 768px) {
  .right-blog {
    display: none;
  }
}
@media screen and (max-width: 1030px) {
  .right-blog .blog-menu {
    display: none;
  }
}

::-webkit-scrollbar {
  display: none;
}

.circle {
  width: 100%;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: #121418;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: #e9e6e4;
  padding: 20px;
  text-align: center;
  margin-top: 40px;
}
.circle-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 12px;
  font-family: "Space Grotesk", sans-serif;
}
@media screen and (max-width: 1030px) {
  .circle-title {
    display: none;
  }
}
.circle-subtitle {
  max-width: 30ch;
  font-size: 14px;
  line-height: 1.3;
  margin-bottom: 16px;
}
.circle-footer {
  font-family: "Playfair Display", serif;
  font-size: 30px;
}

@media screen and (max-width: 560px) {
  .blog-is-sticky {
    display: none;
  }
}
</style>