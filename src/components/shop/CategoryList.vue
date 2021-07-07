<template>
  <div>
    <tree-table
      :data="data"
      :columns="columns"
      :selection-type="false"
      :expand-type="false"
      show-index
      :show-row-hover="false"
      border
    >
      <template slot="isok" slot-scope="scope">
        <div>
          <i
            class="el-icon-success"
            style="color: green"
            v-if="scope.row.cat_deleted == false"
          ></i>
          <i class="el-icon-error" style="color: red" v-else></i>
        </div>
      </template>
      <template slot="order" slot-scope="scope">
        <div>
          <el-tag type="danger" size="mini" v-if="scope.row.cat_level === 0"
            >一级</el-tag
          >
          <el-tag
            type="success"
            size="mini"
            v-else-if="scope.row.cat_level === 1"
            >二级</el-tag
          >
          <el-tag type="info" size="mini" v-else>三级</el-tag>
        </div>
      </template>
      <template slot="opt" slot-scope="scope">
        <div>
          <el-button type="primary" icon="el-icon-edit" size="mini"
            @click="updatedList(scope.row)">编辑</el-button
          >

          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="deleteCategory(scope.row.cat_id)"
            >删除</el-button
          >
        </div>
      </template>
    </tree-table>
     <updated-category :updateData="updateData" ref="updeted"/>
  </div>
</template>

<script>
import UpdatedCategory from './UpdatedCategory.vue';
export default {
  components: { UpdatedCategory },
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      columns: [
        { label: "分类名称", prop: "cat_name" },
        { label: "是否有效", type: "template", template: "isok" },
        { label: "排序", type: "template", template: "order" },
        { label: "操作", type: "template", template: "opt" },
      ],
      updateData:{}
    };
  },
  methods: {
    async deleteCategory(id) {
      const result = await this.$confirm("是否删除该用户权限", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch((err) => err);
      if (result == "confirm") {
        const { data: res } = await this.$http.delete(`categories/${id}`);
        if (res.meta.status == 200) {
          this.$parent.$parent.getData();
          return this.$message.success("删除商品分类成功");
        }
      }
    },
    updatedList(data){
      this.$refs.updeted.dialogFormVisible = true
      this.updateData = data
    }
  },
};
</script>

<style>
</style>