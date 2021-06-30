<template>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="data.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="data.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
export default {
    props:{
        data:{
            type:Object,
            default(){
                return {}
            }
        },
        total:Number
    },
    methods:{
        handleSizeChange(size){
           this.data.pagesize = size
           this.$emit('handleSizeChange',size)
        },
        handleCurrentChange(page){
          this.data.pagenum = page
          this.$emit('handleCurrentChange',page)
        } 
}
}
</script>

<style scoped>
.block{
    position: absolute;
    bottom: 0;
}
</style>