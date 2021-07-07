<template>
  <div id="table">
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="30"></el-table-column>
      <el-table-column label="商品名称" width="450" prop="goods_name">
      </el-table-column>
      <el-table-column label="商品价格" width="100" prop="goods_price">
      </el-table-column>
      <el-table-column label="商品重量" width="100" prop="goods_weight">
      </el-table-column>
      <el-table-column label="创立时间" width="150">
        <template slot-scope="scope">
          <div class="text">{{ dataTransiton(scope.row.add_time) }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.goods_id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    //编辑
    handleEdit() {},
    // 删除
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(async () => {
        await this.$http.delete(`goods/${id}`)
        this.$parent.$parent.getListData()
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 时间转换
    dataTransiton(date) {
      const moment = require("moment");
      return moment(date * 1000).format("YYYY-MM-DD HH:mm:ss");
    },
  },
};
</script>

<style lang="less" scoped>
#table {
  margin-top: 10px;
}
.text {
  font-size: 12px;
}
</style>