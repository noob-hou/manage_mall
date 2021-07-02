<template>
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="50%"
    @close="clerList"
  >
    <el-tree
      :data="powerList"
      :props="defaultProps"
      show-checkbox
      node-key="id"
      :default-expand-all="true"
      :default-checked-keys="defKey"
      ref="tree"
    ></el-tree>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="allocation">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    powerList: {
      type: Array,
      default() {
        return [];
      },
    },
    roleId: Number,
  },
  data() {
    return {
      dialogVisible: false,
      defaultProps: {
        label: "authName",
        children: "children",
      },
      defKey: [],
    };
  },
  methods: {
    //   递归数组
    setDefkey(node, arr) {
      if (!node.children) {
        return arr.push(node.id);
      } else {
        node.children.forEach((item) => this.setDefkey(item, arr));
      }
    },
    //分配权限确定点击
    async allocation() {
      const arr = [
        ...this.$refs.tree.getCheckedKeys(),
        this.$refs.tree.getHalfCheckedKeys(),
      ];
      const str = arr.join(",");
      const { data: res } = await this.$http.post(
        `roles/${this.roleId}/rights`,
        {
          rids: str,
        }
      );
      this.dialogVisible = false;
      this.$emit('allocation')
    },
    clerList() {
      this.defKey = [];
    },
  },
};
</script>

<style>
</style>