<template>
  <div id="home-user">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input
            placeholder="请输入内容"
            class="input-with-select"
            v-model="queryInfo.query"
            clearable
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="AddUsers">添加用户</el-button>
        </el-col>
      </el-row>
    </el-card>
    <users-table :data="userList" @remove="remove" />
    <home-page
      :data="queryInfo"
      :total="total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"
    />
    <add-user ref="adduser" @addUser="addSusscess" />
    <updated-user @submit="submit" />
  </div>
</template>

<script>
import AddUser from "./AddUser.vue";
import HomePage from "./HomePage.vue";
import UpdatedUser from "./UpdatedUser.vue";
import UsersTable from "./UsersTable.vue";
export default {
  components: { UsersTable, HomePage, AddUser, UpdatedUser },
  data() {
    return {
      queryInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      userList: [],
      total: 0,
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("users", {
        params: this.queryInfo,
      });
      if (res.meta.status !== 200) return this.$message.error("数据获取失败");
      this.userList = res.data.users;
      this.total = res.data.total;
      console.log(this.userList);
    },
    handleSizeChange(size) {
      this.getUserList();
    },
    handleCurrentChange(page) {
      this.getUserList();
    },
    AddUsers() {
      this.$refs.adduser.dialogVisible = true;
    },
    addSusscess(res) {
      console.log(res);
      if (res.meta.status !== 201) return this.$message.error("添加失败");
      this.getUserList();
      return this.$message.success("添加成功");
    },
    submit(res) {
      if (res.meta.status !== 200) {
        return this.$message.error("添加失败");
      } else {
        this.getUserList();
        return this.$message.success("添加成功");
      }
    },
    remove(res) {
      this.getUserList();
      return this.$message.success("添加成功");
    },
  },
};
</script>

<style lang="less" scoped>
.el-card {
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.5);
  font-size: 12px;
}
</style>