<template>
  <!-- 可以在这里实现懒加载 -->
  <div class="all" v-if="allcollectinfo.length != 0">
    <el-input
      v-model="inputinfo"
      placeholder="输入企业名称"
      style="width: 500px"
      class="input"
      clearable
      @change="SearchInfo"
      @clear="returnINFOINFo"
    ></el-input>

    <div class="allbottom">
      <div v-for="(item, index) in showinfo" :key="index" class="item">
        <ul>
          <li>
            <span @click="routerpath(0, item.eId)">{{ item.ename }} </span>
          </li>
          <li>
            <span @click="routerpath(1, item.eId)">企业详情</span>
          </li>
          <li>
            <span @click="routerpath(2, item.eId)">View all companies</span>
          </li>
        </ul>
        <div class="deleteitem">
          <el-popconfirm
            title="确定取消收藏该公司？"
            @confirm="handletap('yes', item.eId)"
            @cancel="handletap('cancel')"
          >
            <el-button
              type="danger"
              size="mini"
              slot="reference"
              plain
              icon="el-icon-delete"
              circle
            ></el-button>
          </el-popconfirm>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="all" style="paddingtop: 30vh">暂无收藏企业</div>
</template>

<script>
export default {
  name: "Collect",
  inject: ["reload"],
  data() {
    return {
      //想要查询的企业名称
      inputinfo: "",

      //保存用户的所有收藏企业
      allcollectinfo: [],
      allcollectinfocopy: [],

      //用来显示的数据
      showinfo: [],

      // collectlist:[],
      iscollect: true,
    };
  },
  methods: {
    //点击跳转
    async routerpath(value, eId) {
      if (value == 0) {
        this.$store.commit("changepath",'/home/data');
          //跳转过去之前 , 要把公司的数据传递给它
          let res =await this.$request("post", "/enterprise/query", {
            eId,
            pageNum:1
          }, 0);

          console.log(res);

        this.$router.push({
          path:'/home',
          query:{
            companyInfo:res.data.data.list[0]
          }
        });
        
      } else if(value==1){
        window.sessionStorage.setItem("eId", eId);
        this.$store.commit("changepath",'/home/enterprise_information');
        this.$router.push("/home/enterprise_information");
        
      }
      else
      {
      this.$store.commit("changepath",'/home/search');
      this.$router.push('/home/search')
      
      }
    },
    //点击删除
    async handletap(type, eId) {
      if (type == "yes") {
        let res = await this.$request(
          "post",
          "/collection/cancel",
          {
            userId: window.sessionStorage.getItem('userId'),
            eId,
          },
          0
        );
        this.$message.success("删除成功");
        //删除成功之后重新刷新页面
        this.reload();
        // console.log(res);
      } else {
        this.$message.info("取消");
      }
    },
    //请求用户收藏的所有企业
    async getallcollect() {
      let num = 1;
      let nextpage = 2;
      while (nextpage != 0) {
      let res = await this.$request(
        "post",
        "/collection/query",
        {
          userId: window.sessionStorage.getItem('userId'),
          pageNum: num++,
        },
        0
      );
      nextpage = res.data.data.nextPage;
      this.allcollectinfo.push(...res.data.data.list)
      this.allcollectinfocopy.push(...res.data.data.list)
      this.showinfo.push(...res.data.data.list)
      }
    },
    //搜索功能
    SearchInfo() {
      console.log("我被触发了");
      let arr = this.allcollectinfo.filter((item) => {
        if (
          item.ename.indexOf(this.inputinfo) != -1 ||
          item.ename == this.inputinfo
        )
          return item;
      });
      console.log(arr);
      this.showinfo = arr;
    },
    //点击清除返回所有数据
    returnINFOINFo() {
      this.allcollectinfo = this.allcollectinfocopy;
    },
  },
  created() {
    this.collectlist = this.$store.state.collectList;
    this.getallcollect();
  },
};
</script>


<style scoped>
.all {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  padding-top: 30px;
}
.allbottom {
  padding: 20px 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
}
span {
  cursor: pointer;
}
.item:hover {
  transform: translate(-3px, -3px);
  transition-duration: 0.4s;
  /* box-shadow: 3px 3px 10px rgb(192, 190, 190); */
}
.item {
  position: relative;
}
.deleteitem {
  position: absolute;
  top: 0;
  right: 10px;
}

.i1 {
  font-size: 24px;
  /* background-color: pink; */
}
body ul {
  /* width: 40%; */
  /* margin: 0 5px; */
  /* height: 200px; */
  list-style-type: none;
  background: rgb(48, 65, 86);
  padding: 20px 70px 30px 80px;
  box-sizing: border-box;
  border-radius: 5px;
  box-shadow: 0 40px 30px -20px rgba(0, 0, 0, 0.25);
  overflow: hidden;
}
body ul li {
  text-align: left;
  position: relative;
}
body ul li:hover:after {
  box-shadow: 0 0 0 5px #1155cb, 0 0 0 7px #e0ff00;
}
body ul li:after {
  content: "";
  position: absolute;
  width: 7.5px;
  height: 7.5px;
  background: #c2ff00;
  border-radius: 100%;
  left: -25px;
  top: 50%;
  transform: translate(0, -50%);
  box-shadow: 0 0 0 0 #1155cb, 0 0 0 0 #e0ff00;
  transition: 0.4s ease-in-out;
}
body ul li:nth-of-type(2) a:before {
  bottom: -50px;
  transform-origin: left;
}
body ul li:nth-of-type(2) a:hover:before {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200%25' height='100%25'%3E%3Cdefs%3E%3Cstyle%3E .wave%7B animation:wave 2s cubic-bezier(0.175, 0.885, 0.32, 1) infinite; animation-delay:-0.25s; stroke:%23e0ff00; stroke-width:2; stroke-linecap:square; %7D @keyframes wave%7B 25%25%7B d:path('M 0 20 L 10 15 L 20 20 L 30 25 L 40 20 ');%0A%7D%0A50%25%7B%0Ad:path('M 0 20 L 10 25 L 20 20 L 30 15 L 40 20  ');%0A%7D%0A75%25%7B%0Ad:path('M 0 20 L 10 15 L 20 20 L 30 25 L 40 20 ');%0A%7D %7D %3C/style%3E%3C/defs%3E%3Cpattern id='wavePattern' x='0' y='0' width='40' height='40' patternUnits='userSpaceOnUse'%3E%3Cpath fill='none' class='wave' d='M 0 20 L 10 25 L 20 20 L 30 15 L 40 20' /%3E%3C/pattern%3E%3Crect x='0' y='0' width='100%25' height='100%25' fill='url(%23wavePattern)'%3E%3C/rect%3E%3C/svg%3E")
    0px 50%/40px 40px repeat-x;
  animation: waving 6s linear infinite reverse;
  transform-origin: right;
}
body ul li:nth-of-type(3) a:before {
  transform-origin: right;
  width: calc(100% + 25px);
}
body ul li:nth-of-type(3) a:hover:before {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200%25' height='100%25'%3E%3Cdefs%3E%3Cstyle%3E .wave%7B animation:wave 2s linear infinite; animation-delay:0s; stroke:%23e0ff00; stroke-width:2; stroke-dashoffset:0px; stroke-dasharray:80px; stroke-linecap:round; fill:%231155cb; %7D @keyframes wave%7B 25%25%7B stroke-dashoffset:-80px; %7D 50%25%7B stroke-dashoffset:-80px; %7D 100%25%7B stroke-dashoffset:-160px; %7D %7D %3C/style%3E%3C/defs%3E%3Cpattern id='wavePattern' x='0' y='0' width='80' height='80' patternUnits='userSpaceOnUse'%3E%3Cpath class='wave' d='M 0 40 L 50 40 L 80 40 L 54 44 L 54 36 L 80 40 ' /%3E%3C/pattern%3E%3Crect x='0' y='0' width='100%25' height='100%25' fill='url(%23wavePattern)'%3E%3C/rect%3E%3C/svg%3E")
      calc(100% - 10px) 50%/40px 80px no-repeat,
    url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200%25' height='100%25'%3E%3Cdefs%3E%3Cstyle%3E .wave%7B stroke:%23e0ff00; stroke-width:2; stroke-linecap:round; %7D %3C/style%3E%3C/defs%3E%3Cpattern id='wavePattern' x='0' y='0' width='80' height='80' patternUnits='userSpaceOnUse'%3E%3Cpath fill='none' class='wave' d='M 0 40 Q 20 40 40 40 Q 60 40 80 40' /%3E%3C/pattern%3E%3Crect x='0' y='0' width='100%25' height='100%25' fill='url(%23wavePattern)'%3E%3C/rect%3E%3C/svg%3E")
      0px 50% / calc(100% - 25px) 80px no-repeat;
  -webkit-animation: none;
  animation: none;
  transform-origin: left;
}

body span {
  display: inline-block;
  margin: 20px 0;
  position: relative;
  color: #fff;
  font-family: "Futura";
  text-decoration: none;
  font-size: 22px;
  z-index: 2;
  transition: 0.2s ease-in-out;
}
body span:hover {
  color: #c2ff00;
}
body span:hover:before {
  transition: transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-origin: left;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200%25' height='100%25'%3E%3Cdefs%3E%3Cstyle%3E .wave%7B animation:wave 1s ease-in-out infinite alternate; animation-delay:-0.25s; stroke:%23e0ff00; stroke-width:2; stroke-linecap:square; %7D @keyframes wave%7B to%7B d:path('M 0 40 Q 20 42.5 40 40 Q 60 37.5 80 40'); %7D %7D %3C/style%3E%3C/defs%3E%3Cpattern id='wavePattern' x='0' y='0' width='80' height='80' patternUnits='userSpaceOnUse'%3E%3Cpath fill='none' class='wave' d='M 0 40 Q 20 37.5 40 40 Q 60 42.5 80 40' /%3E%3C/pattern%3E%3Crect x='0' y='0' width='100%25' height='100%25' fill='url(%23wavePattern)'%3E%3C/rect%3E%3C/svg%3E")
    0px 50%/80px 80px repeat-x;
  -webkit-animation: waving 3s linear infinite;
  animation: waving 3s linear infinite;
  transform: scaleX(1);
}
@-webkit-keyframes waving {
  to {
    background-position: 80px 50%, 160px 50%;
  }
}
@keyframes waving {
  to {
    background-position: 80px 50%, 160px 50%;
  }
}
body span:before {
  content: "";
  position: absolute;
  width: 100%;
  height: 80px;
  left: 0;
  bottom: -45px;
  z-index: -1;
  transform: scaleX(0);
  transition: transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1);
  transform-origin: right;
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200%25' height='100%25'%3E%3Cdefs%3E%3Cstyle%3E .wave%7B stroke:%23e0ff00; stroke-width:2; stroke-linecap:square; %7D %3C/style%3E%3C/defs%3E%3Cpattern id='wavePattern' x='0' y='0' width='80' height='80' patternUnits='userSpaceOnUse'%3E%3Cpath fill='none' class='wave' d='M 0 40 Q 20 40 40 40 Q 60 40 80 40' /%3E%3C/pattern%3E%3Crect x='0' y='0' width='100%25' height='100%25' fill='url(%23wavePattern)'%3E%3C/rect%3E%3C/svg%3E")
    0px 50%/80px 80px repeat-x;
}
</style>