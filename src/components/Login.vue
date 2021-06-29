<template>
  <div id="login">
      <div class="login-box">
        <div class="logo">
          <img src="~@/assets/logo.png" alt="">
        </div>
        <el-form label-width="0px" class="inputs" :model="form" :rules="loginRules" ref="loginRef">
          <el-form-item prop="username">
            <el-input prefix-icon="iconfont icon-yonghu1" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" prefix-icon="iconfont icon-mima" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary" @click="loginClick">登录</el-button>
            <el-button type="info" @click="emptyClick">重置</el-button>
          </el-form-item>
      </el-form>
      </div>
  </div>
</template>

<script>
export default {
data() {
  return {
    form:{
      username:'admin',
      password:'123456'
    },
    loginRules:{
      username:[{required:true,message:'请输入用户名',tigger:'blur'},
                {min:3,max:10,message:'用户名长度3到6个字符',tigger:'blur'},
      ],
      password:[{required:true,message:'请输入密码',tigger:'blur'},
                {min:6,max:15,message:'密码长度6到15个字符',tigger:'blur'},
      ]
    }
  }
},
methods: {
  emptyClick(){
    this.$refs.loginRef.resetFields();
  },
  loginClick(){
    this.$refs.loginRef.validate(async valid => {
      if(!valid) return;
      const {data:res} =await this.$http.post('login',this.form)
      if(res.meta.status !== 200) return this.$message.error('用户名密码不正确')
      this.$message.success('登录成功')
      window.sessionStorage.setItem('token',res.data.token)
      this.$router.push('/home')
    })
  }
},
}
</script>

<style lang="less" scoped>
  #login{
    position: relative;
    background-color: #2b4b6b;
    height: 100%;
  }
  .login-box{
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    top: 50%;left: 50%;
    transform: translate(-50%,-50%);
    .logo{
      background-color: #fff;
      height: 100px;
      width: 100px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%,-50%);
      img{
        width: 100%;height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }
  }
  .btns{
    display: flex;
    justify-content: flex-end;
  }
  .inputs{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 20px;
  }
</style>