<template>
  <el-card v-if="Object.keys(data).length !== 0">
    <el-table border :stripe="true" style="width: 100%" :data="data">
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="300">
      </el-table-column>
      <el-table-column prop="path" label="路径" width="300"> </el-table-column>
      <el-table-column prop="level" label="权限等级" width="300">
        <template slot-scope="scope">
          <el-tag type="info" v-if="scope.row.level == '2'">三级</el-tag>
          <el-tag type="danger" v-if="scope.row.level == '0'">一级</el-tag>
          <el-tag type="success" v-if="scope.row.level == '1'">二级</el-tag>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
    methods: {},
  },
};
</script>

<style lang="less" scoped>
.cell {
  text-align: center !important;
}
</style>