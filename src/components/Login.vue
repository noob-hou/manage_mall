<template>
  <div id="login">
      <div class="login-box">
        <div class="logo">
          <img src="~@/assets/logo.png" alt="">
        </div>
        <el-form label-width="0px" class="inputs" :model="form">
          <el-form-item>
            <el-input prefix-icon="iconfont icon-yonghu1" v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" prefix-icon="iconfont icon-mima" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item class="btns">
            <el-button type="primary">登录</el-button>
            <el-button type="info">重置</el-button>
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
      username:'',
      password:''
    }
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