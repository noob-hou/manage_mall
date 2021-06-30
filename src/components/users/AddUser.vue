<template>
  <el-dialog title="添加用户" 
   :visible.sync="dialogVisible" width="30%" @close="clearData">
    <el-form
      ref="ruleForm"
      label-width="70px"
      class="demo-ruleForm"
      :model="addForm"
      :rules="addFormRules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="addForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="passwor">
        <el-input v-model="addForm.paaword"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="addForm.mobile"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="emall">
        <el-input v-model="addForm.emall"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  
  data() {
      let checkEmaill=(rule,value,callback)=>{
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if(regEmail.test(value)){
        return callback()
      }
      callback(new Error('邮箱格式错误'))
    }
     let checkTel=(rule,value,callback)=>{
      const regMobil = /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/
      if(regMobil.test(value)){
        return callback()
      }
      callback(new Error('手机号格式不正确'))
    }
    return {
      dialogVisible: false,
      addForm:{
        username:'',
        password:'',
        mobile:'',
        emall:''
      },
      addFormRules:{
        username:[{required:true,message:'请输入用户名',trigger:'blur'},
                {min:3,max:10,message:'用户名长度3到10个字符',trigger:'blur'}],
        password:[{required:true,message:'请输入密码',trigger:'blur'},
                {min:6,max:15,message:'用户名长度3到10个字符',trigger:'blur'}],
        mobile:[{required:true,message:'请输入手机号码',trigger:'blur'},
        {validator:checkTel,trigger:'blur'}],
        emall:[{required:true,message:'请输入邮箱地址',trigger:'blur'},
        {validator:checkEmaill,trigger:'blur'}]
    },
   methods: {
       clearData(){
      this.$refs.ruleForm.resetFields()
    }
   },
    }
  },
  methods: {
    clearData(){
      this.$refs.ruleForm.resetFields()
    }
  },
};
</script>

<style>
</style>