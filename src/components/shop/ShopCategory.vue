<template>
  <div id="category">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-button type="primary" @click="addCategory">添加分类</el-button>
        <add-categroy ref="addCategroy" @confirmAdd="confirmAdd"/>
      </div>
      <category-list :data="cateList" />
      <!-- 页码 -->
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[3, 5, 10, 15]"
          :page-size="queryInfo.pagesize"
          :total="total"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import AddCategroy from "./AddCategroy.vue";
import CategoryList from "./CategoryList.vue";
export default {
  components: { CategoryList, AddCategroy },
  data() {
    return {
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      cateList: [],
      total: 0,
    };
  },
  created() {
    this.getData();
  },
  methods: {
    // 点击打开添加弹出框
    addCategory() {
      this.$refs.addCategroy.dialogVisible = true;
    },
    // 获取数据
    async getData() {
      const { data: res } = await this.$http.get("categories", {
        params: this.queryInfo,
      });
      this.cateList = res.data.result;
      this.total = res.data.total;
    },
    // 页码数量发生改变
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getData();
    },
    // 页码发生改变
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getData();
    },
    confirmAdd(res){
      this.getData()
      this.$message.success('添加成功')
      this.$refs.addCategroy.dialogVisible = false;
    }
  },
};
</script>

<style>
.zk-table {
  margin: 15px auto;
}
</style>