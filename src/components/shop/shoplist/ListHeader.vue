<template>
  <div id="shop-header">
    <el-input
      placeholder="请输入内容"
      class="input-with-select"
      v-model="query"
      clearable
      @clear = "clearSreach"
    >
      <el-button slot="append" icon="el-icon-search" @click="sreach"></el-button>
    </el-input>
    <el-button type="primary" @click="goAddShop">添加商品</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query:''
    }
  },
  methods: {
    sreach(){
      this.$emit('sreach',this.query)
    },
    // 清空搜索框
    clearSreach(){
      this.$parent.$parent.getListData()
    },
    // 去往添加页面
    goAddShop(){
      this.$router.push('goods/add')
    }
  },
};
</script>

<style lang="less" scoped>
.el-input{
    width: 300px;
    margin-right: 15px;
}
</style>