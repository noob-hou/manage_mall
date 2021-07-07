<template>
  <el-dialog title="修改信息" width="30%" :visible.sync="dialogFormVisible">
    <el-form :model="updateData">
      <el-form-item label="商品名称">
        <el-input v-model="updateData.cat_name"></el-input>
      </el-form-item>
      <el-form-item label="是否有效">
        <el-select v-model="updateData.cat_deleted">
          <el-option label="有效" :value="false"></el-option>
          <el-option label="无效" :value="true"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品等级">
        <el-select v-model="updateData.cat_level">
          <el-option label="一级" :value="0"></el-option>
          <el-option label="二级" :value="1"></el-option>
          <el-option label="三级" :value="2"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmUpdated">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    updateData: {
      type: Object,
      defaule() {
        return {};
      },
    },
  },
  data() {
    return {
      dialogFormVisible: false,
    };
  },
  methods: {
    async confirmUpdated() {
      console.log(this.updateData);
      const { data: res } = await this.$http.put(
        `categories/${this.updateData.cat_id}`,
        this.updateData
      );
       if(res.meta.status == 200){
          this.$parent.$parent.$parent.getData()
          this.$message.success('修改成功')
          this.dialogFormVisible = false
       }
    },
  },
};
</script>

<style>
</style>