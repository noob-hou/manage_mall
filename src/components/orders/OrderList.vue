<template>
  <div id="orders">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">订单管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <header-sreach />
      <list-table :tableData="tableData.goods" />
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.pagenum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="queryinfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import HeaderSreach from "./HeaderSreach.vue";
import ListTable from "./ListTable.vue";
export default {
  components: { HeaderSreach, ListTable },
  data() {
    return {
      queryinfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      tableData: {},
    };
  },
  created() {
    this.getListData();
  },
  methods: {
    //获取表单数据
    async getListData() {
      const { data: res } = await this.$http.get("orders", {
        params: this.queryinfo,
      });
      this.tableData = res.data;
      console.log(res.data);
    },
    //页码大小改变
    handleSizeChange(page) {
      this.queryinfo.pagesize = page;
      this.getListData();
    },
    //页码改变
    handleCurrentChange(page) {
      this.queryinfo.pagenum = page;
      this.getListData();
    },
  },
};
</script>

<style>
</style>