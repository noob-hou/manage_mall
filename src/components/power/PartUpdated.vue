<template>
  <el-dialog title="收货地址" width="500" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="角色名称">
        <el-input v-model="form.roleName"></el-input>
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="form.roleDesc"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmUp">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import bus from "@/event.js";
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {},
    };
  },
  mounted() {
    bus.$on("updatedClick", (res) => {
      this.dialogFormVisible = true;
      this.form = res;
    });
  },
  methods: {
    async confirmUp() {
      const { data: res } = await this.$http.put(
        `roles/${this.form.id}`,
        this.form
      );
      this.$emit("confirmUp", res);
      setTimeout(() => {
        this.dialogFormVisible = false;
      }, 500);
    },
  },
};
</script>

<style>
</style>