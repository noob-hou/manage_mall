<template>
  <el-menu
    :default-active="activePath"
    class="el-menu-vertical-demo"
    background-color="#333744"
    text-color="#fff"
    active-text-color="#409eff"
    :unique-opened="true"
    :collapse="toggle"
    :collapse-transition="false"
    router
    
  >
    <el-submenu :index="item.id + ''"  v-for="item in data" :key="item.id">
      <template slot="title">
        <i :class="iconList[item.id]"></i>
        <span>{{item.authName}}</span>
      </template>
        <el-menu-item :index="'/home/'+value.path" 
        v-for="value in item.children" :key="value.id"
        @click="savePath('/home/'+value.path)"
        >
        <i class="el-icon-menu"></i>{{value.authName}}</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  props:{
    data:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data() {
    return {
      iconList:{
        '125':'iconfont icon-users',
        '103':'iconfont icon-tijikongjian',
        '101':'iconfont icon-shangpin',
        '102':'iconfont icon-dingdan',
        '145':'iconfont icon-baobiao',
      },
      toggle:false,
      activePath:null
    }
  },
  created(){
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods:{
    savePath(activePath){
      window.sessionStorage.setItem('activePath',activePath)
      this.activePath = activePath
    }
  }
};
</script>

<style scoped>
.el-menu{
  border-right: 0px;
}
.el-submenu__title span{
  margin-left: 10px;
}
</style>