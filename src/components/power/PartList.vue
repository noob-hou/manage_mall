<template>
  <div id="part-list">
    <el-table border :stripe="true" style="width: 100%" :data="data">
      <el-table-column type="expand" width="30">
        <template slot-scope="scope">
          <div>
            <el-row v-for="(item, i) in scope.row.children" :key="item.id">
              <el-col :span="5">
                <el-tag
                  type="danger"
                  closable
                  @close="removeTag(scope.row, item.id)"
                  >{{ item.authName }}<i class="el-icon-caret-right"></i
                ></el-tag>
              </el-col>
              <el-col :span="19">
                <el-row v-for="(item2, i2) in item.children" :key="item2.id">
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeTag(scope.row, item2.id)"
                      >{{ item2.authName }}<i class="el-icon-caret-right"></i
                    ></el-tag>
                  </el-col>
                  <el-col :span="18"
                    ><el-tag
                      v-for="item3 in item2.children"
                      type="info"
                      closable
                      @close="removeTag(scope.row, item3.id)"
                      >{{ item3.authName }}</el-tag
                    ></el-col
                  >
                </el-row>
              </el-col>
            </el-row>
          </div>
        </template>
      </el-table-column>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column label="角色名称" width="300" prop="roleName">
      </el-table-column>
      <el-table-column label="角色描述" width="300" prop="roleDesc">
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" @click="updatedClick(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" size="mini" icon="el-icon-delete"
          @click="deleteClick(scope.row)"
            >删除</el-button
          >
          <el-button
            type="warning"
            size="mini"
            icon="el-icon-setting"
            @click="setPower(scope.row)"
            >分配权限</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <part-set ref="setPower" :powerList="setPowerList" :roleId="roleId" @allocation="allocation"/>
  </div>
</template>

<script>
import PartSet from "./PartSet.vue";
import bus from "@/event.js";
export default {
  components: { PartSet },
  data() {
    return {
      data: [],
      setPowerList: [],
      roleId:null
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //获取数据
    async getData() {
      const { data: res } = await this.$http.get("roles");
      this.data = res.data;
    },
    //删除角色权限
    async removeTag(role, id) {
      const result = await this.$confirm("是否删除该用户权限", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch((err) => err);
      if (result == "confirm") {
        const { data: res } = await this.$http.delete(
          `roles/${role.id}/rights/${id}`
        );
        if (res.meta.status == 200) {
          role.children = res.data;
          return this.$message.success("删除角色权限成功");
        }
      }
    },
    //分配权限
    async setPower(role) {
      this.$refs.setPower.setDefkey(role,this.$refs.setPower.defKey)
      this.$refs.setPower.dialogVisible = true;
      const { data: res } = await this.$http.get("rights/tree");
      this.setPowerList = res.data;
      this.roleId = role.id
    },
    allocation(){
        this.$message.success('分配成功')
        this.getData()
    },
    //修改角色
    updatedClick(res){
        bus.$emit('updatedClick',res)
    },
    //修改角色
   async deleteClick(data){
       const confirmResult = await this.$confirm("是否删除该用户", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).catch(err=>err)
      if(confirmResult == 'confirm'){
      const {data:res} = await this.$http.delete('roles/'+data.id)
      if(res.meta.status !== 200) return this.$message.error('删除失败');
        this.getData()
        this.$message.success('删除成功')
    }}
  },
};
</script>
<style lang="less" scoped>
#part-list {
  margin-top: 15px;
}
.el-tag {
  margin: 10px;
}
.el-col {
  box-sizing: border-box;
  border-top: 1px solid #eee;
}
.el-row {
  display: flex;
  align-items: center;
}
</style>