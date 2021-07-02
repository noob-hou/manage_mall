<template>
  <el-dialog title="收货地址" width="500" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="角色名称" >
      <el-input v-model="form.roleName" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="角色描述">
      <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="confirmAdd">确 定</el-button>
  </div>
</el-dialog>

</template>

<script>
export default {
  data() {
      return {
          dialogFormVisible:false,
          form:{
              roleName:'',
              roleDesc:''
          }
      }
  },
  methods: {
     async confirmAdd(){
        const{data:res} = await this.$http.post('roles',this.form)
        this.$emit('confirmAdd',res)
          this.dialogFormVisible = false
      }
  },
}
</script>

<style>

</style>