<template>
  <el-dialog title="修改用户信息" :visible.sync="dialogVisible" width="30%">
    <el-form
      ref="ruleForm"
      label-width="70px"
      class="demo-ruleForm"
      :model="data"
      :rules="dataRules"
    >
      <el-form-item label="用户名">
        <el-input v-model="data.username" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="mobile">
        <el-input v-model="data.mobile"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="data.email"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import bus from "@/event.js";
export default {
  data() {
    let checkEmail = (rule, value, callback) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        return callback();
      }
      callback(new Error("邮箱格式错误"));
    };
    let checkTel = (rule, value, callback) => {
      const regMobil = /^1(3[0-9]|5[0-3,5-9]|7[1-3,5-8]|8[0-9])\d{8}$/;
      if (regMobil.test(value)) {
        return callback();
      }
      callback(new Error("手机号格式不正确"));
    };
    return {
      dialogVisible: false,
      data: {},
      dataRules: {
        mobile: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          { validator: checkTel, trigger: "blur" },
        ],
        email: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" },
        ]
      },
    };
  },
  mounted() {
    bus.$on("upClick", async (id) => {
      this.dialogVisible = true;
      const { data: res } = await this.$http.get("users/" + id);
      this.data = res.data;
    });
  },
  methods: {
      submit(){
        this.dialogVisible = false
         this.$refs.ruleForm.validate(async valid=>{
        if(!valid) return ;
         const {data:res} = await this.$http.put('users/'+this.data.id,{
            mobile: this.data.mobile,email:this.data.email
         })
        this.$emit('submit',res)
      })
      }
  },
};
</script>

<style>
</style>