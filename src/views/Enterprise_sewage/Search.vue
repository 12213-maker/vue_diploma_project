<template>
  <div class="all">
    <div class="btns">
      <el-select
        v-model="top_search_province"
        clearable
        placeholder="请选择省份"
        style="
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
        "
        @change="cityid(2)"
        @blur="returninfo(1)"
      >
        <el-option
          v-for="item in province[0]"
          :key="item.value"
          :label="item.provinceName"
          :value="item.provinceId"
        >
        </el-option>
      </el-select>

      <el-select
        style="
          position: absolute;
          left: 250px;
          top: 50%;
          transform: translateY(-50%);
        "
        v-model="top_search_city"
        clearable
        no-data-text="请先选择省份"
        placeholder="请选择城市"
        @change="returninfo(0)"
      >
        <el-option
          v-for="item in top_search_citylist[0]"
          :key="item.value"
          :label="item.cityName"
          :value="item.cityId"
        >
        </el-option>
      </el-select>

      <div class="right">
        <el-input
          style="width: 300px"
          placeholder="公司名称"
          v-model="input"
          clearable
          @clear="recovertabledata"
        ></el-input>
        <el-button plain round @click="handlesearch">查找</el-button>
        <el-button
          plain
          round
          @click="dialogFormVisible_add = true"
          v-if="this.role == 2"
          >添加企业</el-button
        >
        <el-button plain round @click="recovertabledata"
          >返回全部数据</el-button
        >
      </div>
    </div>

    <!-- 显示的table表 -->
    <el-table
      v-loading="loading"
      element-loading-text="信息正在加载中"
      :header-cell-style="{
        background: '#F3F4F7',
        color: '#555',
        fontSize: '17px',
      }"
      :data="
        allcompanyInfo.slice(
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

      <el-table-column prop="eName" label="企业名称" width="150" align="center">
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
        width="80"
        align="center"
      >
      </el-table-column>
      <el-table-column prop="cityName" label="市区" width="80" align="center">
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
          <el-tag type="success" v-if="scope.row.state == '安全'">安全</el-tag>
          <el-tag type="warning" v-else-if="scope.row.state == '数据伪造'"
            >数据伪造</el-tag
          >
          <el-tag type="danger" v-else>软件生成数据</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        :width="role == 2 ? 240 : 100"
        align="center"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            plain
            @click.stop="Edit(scope.$index, scope.row)"
            v-if="role == 2"
            >Edit</el-button
          >
          <el-button
            size="mini"
            type="danger"
            plain
            @click.stop="Delete(scope.$index, scope.row)"
            v-if="role == 2"
            >Delete</el-button
          >

          <el-button
            size="mini"
            type="success"
            plain
            @click.stop="handleCollect(scope.$index, scope.row)"
            >Collect</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 底部的分页 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="allcompanyInfo.length"
    >
    </el-pagination>

    <el-dialog title="修改企业" :visible.sync="dialogFormVisible" top="1vh">
      <el-form :model="editForm">
        <el-form-item label="企业编号" :label-width="formLabelWidth">
          <el-input
            v-model="editForm.eNumber"
            disabled
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="企业名称" :label-width="formLabelWidth">
          <el-input v-model="editForm.eName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="省份" style="position: relative; left: 0px">
          <el-select
            v-model="editForm.provinceId"
            style="left: 120px; position: absolute; width: 425px"
            placeholder="请选择省份"
            @change="cityid(1)"
          >
            <el-option
              v-for="(item, index) in province[0]"
              :key="index"
              :label="item.provinceName"
              :value="item.provinceId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="城市" style="position: relative; left: 0px">
          <el-select
            v-model="editForm.cityId"
            style="left: 120px; position: absolute; width: 425px"
            no-data-text="请先选择省份"
            placeholder="请选择城市"
          >
            <el-option
              v-for="(item, index) in city[0]"
              :key="index"
              :label="item.cityName"
              :value="item.cityId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="企业介绍" :label-width="formLabelWidth">
          <el-input
            v-model="editForm.introduction"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="排污口" :label-width="formLabelWidth">
          <el-input v-model="editForm.outputNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth">
          <el-input v-model="editForm.eContact" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" style="position: relative; left: 0px">
          <el-select
            v-model="editForm.state"
            style="left: 120px; position: absolute; width: 425px"
            placeholder="请选择公司类别"
          >
            <el-option label="安全" value="安全"></el-option>
            <el-option label="数据伪造" value="数据伪造"></el-option>
            <el-option label="软件生成数据" value="软件生成数据"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="成立时间"
          class="timepicker"
          style="position: relative; left: 0px"
        >
          <el-col class="timepickercol" :span="8">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="timeForm.date1"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="7">
            <el-time-picker
              placeholder="选择时间"
              v-model="timeForm.date2"
              style="width: 100%"
            ></el-time-picker>
          </el-col>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="editcancel">取 消</el-button>
        <el-button type="primary" @click="Editpush">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="添加企业" :visible.sync="dialogFormVisible_add" top="1vh">
      <el-form :model="addForm" ref="addFormRef" :rules="rules">
        <el-form-item
          label="企业名称"
          prop="eName"
          :label-width="formLabelWidth"
        >
          <el-input v-model="addForm.eName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="企业编号"
          prop="eNumber"
          :label-width="formLabelWidth"
        >
          <el-input v-model="addForm.eNumber" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="省份" style="position: relative; left: 0px">
          <el-select
            v-model="addForm.provinceId"
            style="left: 120px; position: absolute; width: 425px"
            placeholder="请选择省份"
            @change="cityid(0)"
          >
            <el-option
              v-for="(item, index) in province[0]"
              :key="index"
              :label="item.provinceName"
              :value="item.provinceId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" style="position: relative; left: 0px">
          <el-select
            v-model="addForm.cityId"
            style="left: 120px; position: absolute; width: 425px"
            no-data-text="请先选择省份"
            placeholder="请选择城市"
          >
            <el-option
              v-for="(item, index) in city[0]"
              :key="index"
              :label="item.cityName"
              :value="item.cityId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="企业介绍"
          prop="introduction"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="addForm.introduction"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="排污口编号"
          prop="outputNum"
          :label-width="formLabelWidth"
        >
          <el-input v-model="addForm.outputNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="联系方式"
          prop="eContact"
          :label-width="formLabelWidth"
        >
          <el-input v-model="addForm.eContact" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" style="position: relative; left: 0px">
          <el-select
            v-model="addForm.state"
            style="left: 120px; position: absolute; width: 425px"
            placeholder="请选择公司类别"
          >
            <el-option label="安全" value="安全"></el-option>
            <el-option label="数据伪造" value="数据伪造"></el-option>
            <el-option label="软件生成数据" value="软件生成数据"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="成立时间"
          class="timepicker"
          style="position: relative; left: 0px"
        >
          <el-col class="timepickercol" :span="8">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="timeForm.date1"
              style="width: 100%"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="8">
            <el-time-picker
              placeholder="选择时间"
              v-model="timeForm.date2"
              style="width: 100%"
            ></el-time-picker>
          </el-col>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancleadd">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import VDistpicker from "v-distpicker";
export default {
  inject: ["reload"],
  name: "Search",
  components: { VDistpicker },
  mounted() {
    this.$nextTick(() => {
      this.tableHeight = window.innerHeight - 400;
      //后面的50：根据需求空出的高度，自行调整
    });
  },
  data() {
    var validateuserName = (rule, value, callback) => {
      if (!value || value.trim() == "") {
        return callback(new Error("企业名称不能为空"));
      } else if (value.length < 1 || value.length > 20) {
        return callback(new Error("名称长度为 1 - 20"));
      } else callback();
    };
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      //获取到的所有公司数据
      allcompanyInfo: [],
      copyinfo: [],

      //放置省 和 省id
      province: [],
      //放置城市 和 城市id
      city: [],
      //时间拼接
      timeForm: {
        date1: "",
        date2: "",
      },
      //修改公司对话框和表单
      dialogFormVisible: false,
      editForm: {},
      editcopyform: {},
      //添加公司对话框和表单
      dialogFormVisible_add: false,
      addForm: {
        eName: "",
        eNumber: "",
        provinceId: "",
        introduction: "",
        outputNum: "",
        eContact: "",
        state: "",
        cityId: "",
        creatTime: "",
      },
      //控制宽度
      formLabelWidth: "120px",

      /* -------------------以上的数据都不可删除-------------------- */
      top_search_province: "",
      top_search_citylist: [],
      top_search_city: "",

      // city: {
      //   sheng: "四川省",
      //   shi: "成都市",
      //   xian: "新都区",
      // },
      /* 公司名称 */
      input: "",
      tableHeight: 0,
      value: "",
      currentPage: 1,
      pageSize: 10,
      loading: false,

      searchinfonum: 2,
      searchnextpage: 2,
      rules: {
        eName: [{ required: true, validator: validateuserName, blur }],
        eNumber: [{ required: true, message: "请输入企业编号", blur }],
        introduction: [{ required: true, message: "请输入企业介绍", blur }],
        outputNum: [{ required: true, message: "请输入排污口编号", blur }],
        eContact: [{ required: true, validator: checkPhone, blur }],
      },
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
    async handleCurrentChange(val) {
      this.currentPage = val;
      // this.$message.info('我触发了')

      if (this.searchnextpage == 0) return;

        let res = await this.$request(
          "post",
          "/enterprise/queryAll",
          { pageNum: this.searchinfonum++ },
          0
        );
        this.searchnextpage = res.data.data.nextPage;
        this.allcompanyInfo.push(...res.data.data.list);
        this.copyinfo.push(...res.data.data.list);
      
      console.log(this.allcompanyInfo, "我是懒加载");

      
    },
    /* 处理搜索点击事件 */
    async handlesearch() {
      if (this.top_search_city == "" && this.input == "") {
        this.$message.info("请填写城市或者公司名称");
        return;
      } else if (this.input != "" && this.top_search_city == "") {
        this.loading = true;
        let num = 1;
        let nextPage = 2;
        while (nextPage) {
          let res = await this.$request(
            "post",
            "/enterprise/query",
            {
              pageNum: num++,
              eName: this.input,
            },
            0
          );
          nextPage = res.data.data.nextPage;
          this.allcompanyInfo = res.data.data.list;
        }
        this.loading = false;
      } else if (this.input == "" && this.top_search_city != "") {
        this.loading = true;
        let num = 1;
        let nextPage = 2;
        while (nextPage) {
          let res = await this.$request(
            "post",
            "/enterprise/query",
            {
              pageNum: num++,
              provinceId: this.top_search_province,
              cityId: this.top_search_city,
            },
            0
          );
          nextPage = res.data.data.nextPage;
          this.allcompanyInfo = res.data.data.list;
        }
        this.loading = false;
      } else {
        //使用全部信息查找
        this.loading = true;
        let num = 1;
        let nextPage = 2;
        while (nextPage) {
          let res = await this.$request(
            "post",
            "/enterprise/query",
            {
              pageNum: num++,
              provinceId: this.top_search_province,
              cityId: this.top_search_city,
              eName: this.input,
            },
            0
          );
          nextPage = res.data.data.nextPage;
          this.allcompanyInfo = res.data.data.list;
        }
        this.loading = false;
      }
    },

    returninfo(type) {
      if (type == 1) {
        this.top_search_city = "";
      }
      if (type == 0) {
        this.allcompanyInfo = this.copyinfo;
        // console.log("我返回了");
      }
    },

    /* 清除搜索框里面的内容的时候恢复tableData */
    recovertabledata() {
      this.allcompanyInfo = this.$store.state.TableData;
      (this.city = {
        sheng: "",
        shi: "",
        xian: "",
      }),
        (this.input = "");
    },

    // 管理员使用的修改企业信息
    Edit(index, row) {
      this.dialogFormVisible = true;

      //将editForm赋值 editForm与input是绑定的
      this.editForm = row;
    },
    editcancel() {
      this.dialogFormVisible = false;
    },

    //查询city的id
    async cityid(value) {
      console.log("我看看我到底什么时候输出");
      //每次改变都查询cityId
      if (value == 1) {
        let num = 1;
        let nextpage = 2;
        while (nextpage != 0) {
          let res = await this.$request(
            "post",
            "/city/query",
            {
              provinceId: this.editForm.provinceId,
              pageNum: num++,
            },
            0
          );
          nextpage = res.data.data.nextPage;
          this.city = [];
          this.city.push(res.data.data.list);
          console.log(res, "我是城市res");
        }
      } else if (value == 0) {
        let num = 1;
        let nextpage = 2;
        while (nextpage != 0) {
          let res = await this.$request(
            "post",
            "/city/query",
            {
              provinceId: this.addForm.provinceId,
              pageNum: num++,
            },
            0
          );
          nextpage = res.data.data.nextPage;
          this.city = [];
          this.city.push(res.data.data.list);
          console.log(res, "我是城市res");
        }
      } else {
        let num = 1;
        let nextpage = 2;
        while (nextpage != 0) {
          let res = await this.$request(
            "post",
            "/city/query",
            {
              provinceId: this.top_search_province,
              pageNum: num++,
            },
            0
          );
          nextpage = res.data.data.nextPage;
          this.top_search_citylist = [];
          this.top_search_citylist.push(res.data.data.list);
        }
      }
      console.log(this.city, "我是城市");
    },

    //管理员修改企业
    async Editpush() {
      console.log(this.editForm.provinceId, "我是省id", this.editForm.cityId);
      if (
        this.editForm.eName == "" ||
        this.editForm.eNumber == "" ||
        this.editForm.provinceId == null ||
        this.editForm.introduction == "" ||
        this.editForm.outputNum == "" ||
        this.editForm.eContact == "" ||
        this.editForm.state == "" ||
        this.editForm.cityId == null ||
        this.editForm.eContact.length != 11 ||
        this.timeForm.date1 == "" ||
        this.timeForm.date2 == ""
      ) {
        this.$message.warning("请填写所有信息并且保证信息正确 !");
        return;
      }
      this.$message.success("修改成功");

      this.dialogFormVisible = false;

      let year = `${this.timeForm.date1.getFullYear()}-${
        this.timeForm.date1.getMonth() + 1
      }-${this.timeForm.date1.getDate()}`;
      let time = `${this.timeForm.date2.getHours()}:${this.timeForm.date2.getMinutes()}:${this.timeForm.date2.getSeconds()}`;
      let alltime = `${year} ${time}`;

      // 赋值给editForm
      this.editForm.creatTime = alltime;

      // 算了不删除了 , 还是重新赋值把
      let {
        eName,
        eId,
        eNumber,
        provinceId,
        introduction,
        outputNum,
        eContact,
        state,
        cityId,
        creatTime,
      } = this.editForm;

      console.log(this.editForm, "我是number");
      let res = await this.$request(
        "post",
        "/enterprise/update",
        {
          eName,
          eNumber,
          provinceId: Number(provinceId),
          introduction,
          outputNum,
          eContact,
          state,
          cityId: Number(cityId),
          creatTime,
        },
        0
      );

      console.log(res, "enumber");
      this.reload();
    },

    cancleadd() {
      this.addForm = {};
      this.dialogFormVisible_add = false;
    },
    //管理员添加企业
    async add() {
      this.$refs.addFormRef.validate(async (valid) => {
        if (valid) {
          let year = `${this.timeForm.date1.getFullYear()}-${
            this.timeForm.date1.getMonth() + 1
          }-${this.timeForm.date1.getDate()}`;
          let time = `${this.timeForm.date2.getHours()}:${this.timeForm.date2.getMinutes()}:${this.timeForm.date2.getSeconds()}`;
          let alltime = `${year} ${time}`;
          console.log(alltime);
          this.addForm.creatTime = alltime;

          let {
            eName,
            eNumber,
            provinceId,
            introduction,
            outputNum,
            eContact,
            state,
            cityId,
            creatTime,
          } = this.addForm;

          this.dialogFormVisible_add = false;
          let res = await this.$request(
            "post",
            "/enterprise/add",
            {
              eName,
              eNumber,
              provinceId,
              introduction,
              outputNum,
              eContact,
              state,
              cityId,
              creatTime,
            },
            0
          );
          // console.log(res);
          this.reload();
        } else {
          this.$message.warning("请填写所有信息并保证信息正确 !");
          return;
        }
      });
    },

    //管理员删除企业
    async Delete(index, row) {
      this.$confirm("确认删除?")
        .then(async () => {
          let { eNumber } = row;
          console.log(eId, eNumber, "我是eId");
          let res = await this.$request(
            "post",
            "/enterprise/delete",
            {
              eNumber,
            },
            0
          );
          console.log(res, "删除enumber");
          this.$message.success("已删除");
          this.reload();
        })
        .catch(() => {});
    },

    //点击收藏
    async handleCollect(index, row) {
      let { eId } = row;
      let res = await this.$request(
        "post",
        "/collection/add",
        {
          userId: window.sessionStorage.getItem("userId"),
          eId,
        },
        0
      );
      if (res.data.code == 200) this.$message.success("成功收藏");
      else this.$message.info("已收藏该公司");
    },

    // 单击单元格跳转到相应页面
    clickcell(row) {
      //携带参数跳转页面
      this.$router.push({
        path: "/home/data/echarts",
        query: {
          companyInfo: row,
        },
      });
       this.$store.commit('changepath','/home/data')
      this.$store.commit("changeFreeze");
      window.sessionStorage.setItem("freeze", 0);
      // 单击之后flag置为1
      this.$store.commit("changeflag");

      // 把eid保存到session中
      window.sessionStorage.setItem("eId", row.eId);
      window.sessionStorage.setItem("eNumber", row.eNumber);
    },

    //获取公司的所有数据
    async allInfo() {
      let res = await this.$request(
        "post",
        "/enterprise/queryAll",
        { pageNum: 1 },
        0
      );
      this.allcompanyInfo.push(...res.data.data.list);
      this.copyinfo.push(...res.data.data.list);

      // //把返回的数据保存到store中
      this.$store.commit("changeTableData", this.allcompanyInfo);
    },

    // 查询省id
    async qwer() {
      let num = 1;
      let nextpage = 2;
      while (nextpage != 0) {
        let res = await this.$request(
          "post",
          "/province/query",
          {
            pageNum: num++,
          },
          0
        );
        nextpage = res.data.data.nextPage;
        this.province.push(res.data.data.list);
        console.log(res, "我是resid", this.province);
      }
    },
  },
  created() {
    this.allInfo();
    this.qwer();

    console.log("我是role", this.role);
  },
  computed: {
    role() {
      return window.sessionStorage.getItem("role");
    },
  },
};
</script>

<style scoped>
.el-form-item__content {
  text-align: left;
}
.timepicker {
  width: 100%;
  position: absolute;
  left: 75px;
  /* left: 50%;
  transform: translateX(-50%); */
  /* background-color: pink; */
}
.el-form-item__label {
  text-align: left;
}
.all {
  width: 90%;
  height: 85.5vh;
  padding: 30px 0;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
}
.el-table {
  width: 100%;
  height: 80vh;
}
.btns {
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
  display: flex;
  flex-direction: row;
}

.el-input {
  padding-right: 10px;
}

.el-pagination {
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
.el-table th.el-table__cell {
  background-color: rgb(243, 244, 247) !important;
}
.timepickercol {
  margin-left: 50px;
  /* background-color: aqua; */
}
.item_3_span,
label {
  text-align: left !important;
}
.v-modal {
  display: none;
}
.has-gutter,
.el-table__header-wrapper,
.el-dialog__header {
  line-height: 0 !important;
}
.el-table__header,
.el-table__body {
  width: 100% !important;
}
.el-input__inner {
  border-radius: 20px;
}
.el-table__row {
  cursor: pointer;
}
</style>