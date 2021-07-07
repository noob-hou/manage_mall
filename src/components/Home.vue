<template>
  <div id="home">
    <el-container>
      <el-header>
        <div class="header-left">
          <img src="../assets/logo1.png" alt="" height="50" />
          <span>noob_hou商城后台管理系统</span>
          <el-button type="info" class="tuichu" @click="quitClick">退出登录</el-button>
        </div>
      </el-header>
      <el-container>
        <el-aside :width="width+'px'">
          <div class="toggle-buotton" @click="toggleClick">|||</div>
          <home-aside :data="menuList" ref="aside"/>
        </el-aside>
        <el-main><router-view/></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import HomeAside from "./HomeAside.vue";
export default {
  components: { HomeAside },
  data() {
    return {
      menuList :null,
      width:200
    }
  },
  created(){
    this.getMenuList()
  },
  methods: {
  async getMenuList(){
    const {data:res} =await this.$http.get('menus')
    if(res.meta.status!==200) return this.$message.error()
    this.menuList = res.data
    },
    toggleClick(){
      this.$refs.aside.toggle = !this.$refs.aside.toggle
      if(this.$refs.aside.toggle==false){
        this.width = 200
      }else{
        this.width= 56
      }
      
    },
    quitClick(){
      window.sessionStorage.clear('token')
      this.$router.push('/login')
    }
  },
};
</script>

<style lang="less" scoped>
#home {
  height: 100%;
}
.el-container {
  height: 100%;
}
.el-aside,
.el-header {
  background-color: #333744;
  padding: 10px;
  position: relative;
}
.el-main {
  background-color: #eaedf1;
}
.header-left {
  float: left;
  color: #fff;
  img {
    vertical-align: middle;
    margin-right: 10px;
    background-color: #fff;
    border-radius: 50%;
  }
}
.toggle-buotton{
  background-color: #4a5064;
  text-align: center;
  color: #fff;
  height: 20px;
  line-height: 24px;
  letter-spacing: 2px;
  font-size: 10px;
  cursor: pointer;
  
}
.tuichu{
  position: absolute;
  right: 0;
  top: 10px;
}
</style>