<template>
  <el-dialog title="权限分配" :visible.sync="dialogFormVisible" width="300">
    <p>当前用户名：{{ info.username }}</p>
    <p>当前角色：{{ info.role_name }}</p>
    <el-select placeholder="请选择" v-model="roleName">
      <el-option
        v-for="item in form"
        :value="item.id"
        :label="item.roleName"
      ></el-option>
    </el-select>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="YesAllocation">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import bus from "@/event.js";
export default {
  data() {
    return {
      dialogFormVisible: false,
      info: {},
      form: {},
      roleName: "",
    };
  },
  mounted() {
    bus.$on("allocationPower", (res, info) => {
      (this.info = info), (this.form = res.data);
    });
  },
  methods: {
    async YesAllocation() {
      const { data: res } = await this.$http.put(`users/${this.info.id}/role`, {
        rid: this.roleName,
      });
      this.dialogFormVisible = false;
      this.$emit("YesAllocation", res);
    },
  },
};
</script>

<style>
</style>