<template>
  <div id="power">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <power-table :data="powerList.data"/>
  </div>
</template>

<script>
import PowerTable from './PowerTable.vue'
export default {
  components: { PowerTable },
    data() {
        return {
            powerList:{}
        }
    },
    created(){
        this.getPowerList()
    },
    methods: {
        async getPowerList(){
        const{data:res} = await this.$http.get('rights/list')
        this.powerList = res
        }
    },
}
</script>

<style>
</style>