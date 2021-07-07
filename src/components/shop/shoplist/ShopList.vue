<template>
  <div id="shop-list">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <list-header @sreach="sreach"/>
      <list-body :tableData="listData.goods" />
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="listData.total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import ListBody from "./ListBody.vue";
import ListHeader from "./ListHeader.vue";
export default {
  components: { ListHeader, ListBody },
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      listData: {},
    };
  },
  created() {
    this.getListData();
  },
  methods: {
    //   获取数据
    async getListData() {
      const { data: res } = await this.$http.get(`goods`, {
        params: this.queryInfo,
      });
      this.listData = res.data;
      console.log(res.data);
    },
    //页码
    handleSizeChange(newPage){
      this.queryInfo.pagesize =newPage
      this.getListData()
    },
    handleCurrentChange(newPage){
          this.queryInfo.pagenum=newPage
      this.getListData()
    },
    // 搜索
    sreach(query){
      this.queryInfo.query = query
      this.getListData()
    }
  },
};
</script>

<style lang="less" scoped>
</style>