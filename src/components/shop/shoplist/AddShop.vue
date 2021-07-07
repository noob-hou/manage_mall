<template>
  <div id="add-shop">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/home/goods' }"
        >商品列表</el-breadcrumb-item
      >
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert title="添加商品信息" type="info" show-icon> </el-alert>
      <el-steps
        :space="200"
        :active="active - 0"
        finish-status="success"
        align-center
      >
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="完成添加"></el-step>
      </el-steps>
      <el-form
        ref="form"
        :model="addform"
        label-width="100px"
        label-position="top"
        :rules="addformRules"
      >
        <el-tabs
          @tab-click="tabClick"
          tab-position="left"
          :before-leave="beforeLeave"
          v-model="active"
        >
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addform.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addform.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addform.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="数量" prop="goods_number">
              <el-input v-model="addform.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                expand-trigger="hover"
                v-model="addform.goods_cat"
                :options="cateListData"
                :props="cateProps"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item
              v-for="item in manyTable"
              :label="item.attr_name"
              :key="item.attr_id"
            >
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox
                  v-for="(item2, index) in item.attr_vals"
                  :key="index"
                  :label="item2"
                  border
                ></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item
              :label="item.attr_name"
              v-for="item in onlyTable"
              :key="item.attr_id"
            >
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              action="https://lianghj.top:8888/api/private/v1/upload"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="headersObj"
              :on-success="handleSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">
                只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="内容编辑" name="4">
              <quill-editor v-model="addform.goods_inctroduce"></quill-editor>
              <el-button type="primary" @click="addClick">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components:{
      quillEditor
  },
  data() {
    return {
      active: "0",
      addform: {
        goods_name: "",
        goods_price: null,
        goods_weight: null,
        goods_number: null,
        goods_cat: [],
        pics:[],
        goods_inctroduce:''
      },
      addformRules: {
        goods_name: [
          { required: true, message: "输入商品名称", triggler: "blur" },
        ],
        goods_price: [
          { required: true, message: "输入商品价格", triggler: "blur" },
        ],
        goods_weight: [
          { required: true, message: "输入商品重量", triggler: "blur" },
        ],
        goods_number: [
          { required: true, message: "输入商品数量", triggler: "blur" },
        ],
        goods_cat: [
          {
            required: true,
            message: "输入商品分类",
            type: "array",
            triggler: "blur",
          },
        ],
      },
      cateProps: {
        label: "cat_name",
        value: "cat_id",
        children: "children",
      },
      cateListData: [],
      manyTable: null,
      onlyTable: null,
      headersObj:{
          Authorization : window.sessionStorage.getItem('token')
      }
    };
  },
  computed: {
    cateId() {
      if (this.addform.goods_cat.length == 3) {
        return this.addform.goods_cat[2];
      }
      return null;
    },
  },
  created() {
    this.getCateList();
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get("categories");
      this.cateListData = res.data;
    },
    handleChange() {},
    // 离开之前
    beforeLeave(newActive, oldActive) {
      let vailds = null;
      this.$refs.form.validate((vaild) => {
        vailds = vaild;
      });
      if (vailds == false) {
        this.$message.error("当前填写未完成");
        return vailds;
      }
    },
    async tabClick() {
      if (this.active == 1) {
        const { data: res } = await this.$http.get(
          `categories/${this.cateId}/attributes`,
          { params: { sel: "many" } }
        );
        res.data.forEach((item) => {
          item.attr_vals = item.attr_vals.length
            ? item.attr_vals.split(" ")
            : [];
        });
        this.manyTable = res.data;
      } else if (this.active == 2) {
        const { data: res } = await this.$http.get(
          `categories/${this.cateId}/attributes`,
          { params: { sel: "only" } }
        );
        this.onlyTable = res.data;
      }
    },
    //图片上传 
    handleSuccess(res){
        const imgPath = { pic:res.data.tmp_path}
        this.addform.pics.push(imgPath)
    },
    //图片移除
    handleRemove(file){
       const filePath = file.response.data.tmp_path
       const i = this.addform.pics.findIndex(x=>x==filePath)
       this.addform.pics.splice(i,1)
       console.log(this.addform.pics);
    },
    //确定添加
    async addClick(){
      const form = JSON.parse(JSON.stringify(this.addform))
      form.goods_cat = form.goods_cat.join(',')

      const{data:res} = await this.$http.post('goods',form)  
      if(res.meta.status == 201){
          this.$message.success('添加商品成功')
          this.$router.push('/home/goods')
      }
    }
  },
};
</script>

<style scoped>
.el-steps {
  width: 100%;
  margin: 15px auto;
}
.el-step__title {
  font-size: 13px !important;
}
.el-tabs {
  height: 100% !important;
}
.el-checkbox {
  margin: 0 !important;
  margin-right: 10px !important;
}
.ql-editor{
    min-height: 200px !important;
}
</style>