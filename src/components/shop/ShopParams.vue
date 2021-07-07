<template>
  <div id="params">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>商品参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert title="！注意，只允许为三级分类设置参数" type="warning">
      </el-alert>
      <el-row>
        <el-col>
          <span>选择商品分类：</span>
          <el-cascader
            expand-trigger="hover"
            v-model="cateKeys"
            :options="list"
            :props="props"
            @change="handleChange"
          >
          </el-cascader>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" size="mini" :disabled="isBtn" @click="add"
            >添加参数</el-button
          >
          <el-table :data="manyTable" border stripe>
            <el-table-column type="expand" width="30">
              <template slot-scope="scope">
                <div>
                  <el-tag
                    v-for="(item, i) in scope.row.attr_vals"
                    :key="i"
                    closable
                    >{{ item }}</el-tag
                  >
                  <el-input
                    class="input-new-tag"
                    v-if="scope.row.inputVisible"
                    v-model="scope.row.inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm(scope.row)"
                    @blur="handleInputConfirm(scope.row)"
                  >
                  </el-input>
                  <el-button
                    v-else
                    class="button-new-tag"
                    size="small"
                    @click="showInput(scope.row)"
                    >+ New Tag</el-button
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column
              label="参数名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div>
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="edit(scope.row.attr_id)"
                    >编辑</el-button
                  >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    @click="deleteClick(scope.row.attr_id)"
                    >删除</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" size="mini" :disabled="isBtn" @click="add"
            >添加属性</el-button
          >
          <el-table :data="onlyTable" border stripe>
            <el-table-column type="expand" width="30">
               <template slot-scope="scope">
                <div>
                  <el-tag
                    v-for="(item, i) in scope.row.attr_vals"
                    :key="i"
                    closable
                    >{{ item }}</el-tag
                  >
                  <el-input
                    class="input-new-tag"
                    v-if="scope.row.inputVisible"
                    v-model="scope.row.inputValue"
                    ref="saveTagInput"
                    size="small"
                    @keyup.enter.native="handleInputConfirm(scope.row)"
                    @blur="handleInputConfirm(scope.row)"
                  >
                  </el-input>
                  <el-button
                    v-else
                    class="button-new-tag"
                    size="small"
                    @click="showInput(scope.row)"
                    >+ New Tag</el-button
                  >
                </div>
              </template>
            </el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column
              label="参数名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div>
                  <el-button
                    type="primary"
                    icon="el-icon-edit"
                    size="mini"
                    @click="edit(scope.row.attr_id)"
                    >编辑</el-button
                  >
                  <el-button
                    type="danger"
                    icon="el-icon-delete"
                    size="mini"
                    @click="deleteClick(scope.row.attr_id)"
                    >删除</el-button
                  >
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加弹出框 -->
    <el-dialog
      :title="'添加' + titleText"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item :label="titleText">
          <el-input v-model="form.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmAdd">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改弹出框 -->
    <el-dialog
      :title="'修改' + titleText"
      :visible.sync="dialogVisible2"
      width="30%"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item :label="titleText">
          <el-input v-model="editform.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="confirmEdit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      props: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      cateKeys: [],
      activeName: "many",
      manyTable: [],
      onlyTable: [],
      dialogVisible: false,
      dialogVisible2: false,
      form: {
        attr_name: "",
      },
      editform: {},
    };
  },
  computed: {
    //判断是否起用添加按钮禁用状态
    isBtn() {
      if (this.cateKeys.length !== 3) {
        return true;
      } else {
        return false;
      }
    },
    //参数的ID
    cateId() {
      if (this.cateKeys.length == 3) {
        return this.cateKeys[this.cateKeys.length - 1];
      }
      return null;
    },
    // 计算添加弹出框title文本
    titleText() {
      if (this.activeName == "many") {
        return "静态属性";
      } else {
        return "动态属性";
      }
    },
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      const { data: res } = await this.$http.get("categories");
      this.list = res.data;
    },
    //获取三级参数数据
    async getParamsData() {
      if (this.cateKeys.length !== 3) {
        this.cateKeys = [];
        this.manyTable = [];
        this.onlyTable = []
        return;
      } else {
        const { data: res } = await this.$http.get(
          `categories/${this.cateId}/attributes`,
          { params: { sel: this.activeName } }
        );
        res.data.forEach(item => {
          item.attr_vals = item.attr_vals ? item.attr_vals.split(" ") : [];
          item.inputValue = ''
          item.inputVisible = false
        });
        if (this.activeName == "many") {
          this.manyTable = res.data;
        } else {
          this.onlyTable = res.data;
        }
      }
    },
    //级联选择器改变
    handleChange() {
      this.getParamsData();
    },
    handleClick() {
      this.getParamsData();
    },
    // 弹出添加弹出框
    add() {
      this.dialogVisible = true;
    },
    //弹出修改对话框
    async edit(id) {
      const { data: res } = await this.$http.get(
        `categories/${this.cateId}/attributes/${id}`,
        {
          params: {
            attr_sel: this.activeName,
          },
        }
      );
      this.editform = res.data;
      this.dialogVisible2 = true;
    },
    // 添加按钮
    async confirmAdd() {
      await this.$http.post(`categories/${this.cateId}/attributes`, {
        attr_name: this.form.attr_name,
        attr_sel: this.activeName,
      });
      this.$message.success("添加属性成功");
      this.getParamsData();
      this.dialogVisible = false;
    },
    // 修改按钮
    async confirmEdit() {
      await this.$http.put(
        `categories/${this.cateId}/attributes/${this.editform.attr_id}`,
        {
          attr_name: this.editform.attr_name,
          attr_sel: this.activeName,
        }
      );
      this.$message.success("修改成功");
      this.dialogVisible2 = false;
      this.getParamsData();
    },
    // 删除
    deleteClick(id) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(async () => {
          await this.$http.delete(`categories/${this.cateId}/attributes/${id}`);
          this.getParamsData();
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    //tag标签输入后
    async handleInputConfirm(row){
      if(row.inputValue.trim().length == 0 ){
        row.inputValue = ''
      }else{
        row.attr_vals.push(row.inputValue)
        row.inputValue = ''
          await this.$http.put(`categories/${this.cateId}/attributes/${row.attr_id}`,{
          attr_name:row.attr_name,
          attr_sel:row.attr_sel,
          attr_vals:row.attr_vals.join(' ')
        })

      }
      row.inputVisible=false
    },
    showInput(row){
      row.inputVisible=true
    }
  },
};
</script>

<style lang="less" scoped>
.el-tag {
  margin: 5px;
}
.el-table {
  margin-top: 10px;
}
.button-new-tag,
.input-new-tag{
  width: 130px;
}
</style>