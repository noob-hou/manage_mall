<template>
  <el-dialog title="添加分类" :visible.sync="dialogVisible" width="50%">
    <el-form ref="form" label-width="80px" :model="form">
      <el-form-item label="分类名称">
        <el-input v-model="form.cat_name"></el-input>
      </el-form-item>
      <el-form-item label="父级分类">
        <el-cascader
        expand-trigger="hover"
          v-model="selectKeys"
          :options="parentList"
          :props="pops"
          @change="handleChange"
          clearable
          :change-on-select="true"
        ></el-cascader>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="confirmAdd">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        cat_name: "",
        cat_pid: 0,
        cat_level: 0,
      },
      parentList: [],
      pops:{
          value:'cat_id',
          label:'cat_name',
          children:'children'
      },
      selectKeys:[]
    };
  },
  created() {
    this.getParentList();
  },
  methods: {
    async getParentList() {
      const { data: res } = await this.$http.get("categories", {
        params: { type: 2 },
      });
      this.parentList = res.data;
    },
    handleChange(){
      if(this.selectKeys.length>0){
          this.form.cat_pid = this.selectKeys[this.selectKeys.length-1]
          this.form.cat_level = this.selectKeys.length
      }else{
          this.form.cat_pid = 0
          this.form.cat_level = 0
      }
    },
    async confirmAdd(){
        const{data:res} = await this.$http.post('categories',this.form)
        this.$emit('confirmAdd',res)
    }
  },
};
</script>

<style>
</style>