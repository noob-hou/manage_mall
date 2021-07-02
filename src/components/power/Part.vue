<template>
  <div id="part-list">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">角色管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div><el-button type="primary" @click="addPart">添加角色</el-button></div>
      <part-add ref="partAdd" @confirmAdd="confirmAdd"/>
      <part-list ref="partList"/>
      <part-updated @confirmUp="confirmUp"/>
    </el-card>
  </div>
</template>

<script>
import PartAdd from './PartAdd.vue';
import PartList from "./PartList.vue";
import PartUpdated from './PartUpdated.vue';
export default {
  components: { PartList, PartAdd, PartUpdated },
  data() {
    return {
      PartId:null
    }
  },
  methods: {
    addPart(){
      this.$refs.partAdd.dialogFormVisible = true
    },
    confirmAdd(res){
      if(res.meta.status !==201){
        return this.$message.error('创建失败，请检查是否已存在')
      }else{
        this.PartId = res.data.roleId
        this.$message.success('创建成功')
        this.$refs.partList.getData()
      }
    },
    confirmUp(res){
       if(res.meta.status ==200){
        this.$message.success('创建成功')
        this.$refs.partList.getData()
        
       }
    }
  },
};
</script>

<style lang="less" scoped>
</style>