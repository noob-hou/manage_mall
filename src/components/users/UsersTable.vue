<template>
  <div id="table">
    <el-table :data="data" border stripe style="width: 100%">
      <el-table-column type="index"> </el-table-column>
      <el-table-column label="姓名" prop="username" width="180">
      </el-table-column>
      <el-table-column label="邮箱" prop="email" width="180"> </el-table-column>
      <el-table-column prop="mobile" label="电话"> </el-table-column>
      <el-table-column prop="role_name" label="角色"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            @change="stateChange(scope.row)"
            inactive-color="#ff4949"
            active-value="100"
            inactive-value="0"
          >
          </el-switch>
        </template>
        ></el-table-column
      >
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="upClick(scope.row.id)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            @click="remove(scope.row.id)"
          ></el-button>
          <el-button
            type="warning"
            icon="el-icon-setting"
            size="mini"
            @click="allocationPower(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import bus from "@/event.js";
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  methods: {
    async stateChange(userInfo) {
      console.log(userInfo);
      const { data: res } = await this.$http.put(
        `users/${userInfo.id}/state/${userInfo.mg_state}`
      );
      if (res.meta.status !== 200)
        return this.$message.error("用户权限管理失败");
      this.$message.success("操作用户权限成功");
    },
    upClick(data) {
      bus.$emit("upClick", data);
    },
    async remove(id) {
      const confirmResult = await this.$confirm("是否删除该用户", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch(err=>err)
      if(confirmResult == 'confirm'){
      const {data:res} = await this.$http.delete('users/'+id)
      if(res.meta.status !== 200) return this.$message.error('删除失败');
        this.$emit('remove',res)
      }
    },
    //分配权限展开
    async allocationPower(info){
       this.$emit('allocationPower')
       const {data:res} = await this.$http.get('roles')
       bus.$emit('allocationPower',res,info)
    }
  },
};
</script>

<style>
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
</style>