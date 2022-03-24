<template>
  <div class="all">
    <!--小图标-->
    <div class="icon">
      <el-badge :value="12" class="item">
        <el-button size="small">紧急</el-button>
      </el-badge>
      <el-badge :value="1" class="item" type="primary">
        <el-button size="small">其他</el-button>
      </el-badge>
      <span class="select" display="line－block" style="margin-to: 20px">
        <el-input
          v-model="tableDataName"
          placeholder="请输入账号"
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
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="所属店铺">
                <span>{{ props.row.shop }}</span>
              </el-form-item>
              <el-form-item label="商品 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.shopId }}</span>
              </el-form-item>
              <el-form-item label="商品分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="商品描述">
                <span>{{ props.row.desc }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <!-- 表格内容 -->
        <el-table-column prop="date" sortable label="日期" width="180px">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="账号" width="180px">
        </el-table-column>
        <el-table-column prop="address" sortable label="编号" width="180px">
        </el-table-column>

        <!-- 筛选 -->
        <el-table-column
          prop="tag"
          label="类型"
          width="180"
          :filters="[
            { text: '紧急', value: '紧急' },
            { text: '普通', value: '普通' },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.tag === '紧急' ? 'danger' : 'success'"
              disable-transitions
              >{{ scope.row.tag }}</el-tag
            >
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              slot="reference"
              @click="check(scope.$index, scope.row)"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[1, 2, 3, 4]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalItems"
      >
      </el-pagination>
    </div>

    <!-- 弹出层 -->
    <el-dialog :visible.sync="dialogFormVisible" height="100px">
      <div class="content">
        <div>
          <span>申请人：<el-divider direction="vertical"></el-divider> </span
          ><span>{{}}</span>
          <el-divider></el-divider>
          <div>
            <span>电话:<el-divider direction="vertical"></el-divider> </span
            ><span>{{}}</span>
          </div>
          <el-divider></el-divider>
          <div>
            <span>城市：<el-divider direction="vertical"></el-divider> </span
            ><span>{{}}</span>
          </div>
          <el-divider></el-divider>
          <div>
            <span>理由：<el-divider direction="vertical"></el-divider> </span
            ><span>{{}}</span>
          </div>
        </div>
      </div>
      <div slot="footer">
        <el-button @click="dialogFormVisible = false">退出</el-button>
        <el-button type="primary" @click="createData()">驳回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Unfinished",
  data() {
    return {
      phone:11222,
      dialogFormVisible: false,
      tableDataName: "",
      tableDataEnd: [],
      currentPage: 1,
      pageSize: 4,
      totalItems: 0,
      filterTableDataEnd: [],
      flag: false,

      tableDataBegin: [
        {
          date: "2016-05-01",
          name: "1103740248",
          manager: "王小一",
          address: 1,
          tag: "紧急",
        },
        {
          date: "2016-05-02",
          manager: "李小二",
          name: "11037402",
          address: 2,
          tag: "紧急",
        },
        {
          date: "2016-05-03",
          name: "11248",
          manager: "赵小三",
          address: 3,
          tag: "普通",
        },
        {
          date: "2016-05-04",
          name: "0374024",
          manager: "陈小四",
          address: 4,
          tag: "普通",
        },
        {
          date: "2016-05-05",
          name: "118824",
          manager: "周小五",
          address: 5,
          tag: "紧急",
        },
        {
          date: "2016-05-06",
          name: "0248",
          manager: "秦小六",
          address: 6,
          tag: "紧急",
        },
        {
          date: "2016-05-07",
          name: "3213442",
          manager: "朱小八",
          address: 7,
          tag: "紧急",
        },
        {
          managerdate: "2016-05-08",
          name: "122",
          manager: "张小九",
          address: 8,
          tag: "紧急",
        },
      ],
    };
  },
  created() {
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
  },
  methods: {
    //前端搜索功能需要区分是否检索,因为对应的字段的索引不同
    //用两个变量接收currentChangePage函数的参数
    doFilter() {
      if (this.tableDataName == "") {
        this.$message.warning("查询条件不能为空！");
        return;
      }
      this.tableDataEnd = [];
      //每次手动将数据置空,因为会出现多次点击搜索情况
      this.filterTableDataEnd = [];
      this.tableDataBegin.forEach((value, index) => {
        if (value.name) {
          if (value.name.indexOf(this.tableDataName) >= 0) {
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

    //点击下一页
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
    filterTag(value, row) {
      return row.tag === value;
    },
    check(index, row) {
      console.log(index, row);
      this.dialogFormVisible = true;
    },
    async createData() {
      const params = this.questionForm;
      alert(JSON.stringify(params));
    },
  },
};
</script>

<style scope>
.icon {
  text-align: left;
}
.item {
  margin-right: 40px;
}
.all {
  min-width: 1000px;
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
.content{
  /* height: 100px; */
  font-size: 18px;
}
</style>