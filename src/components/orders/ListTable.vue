<template>
  <el-table style="width:100%" border :data="tableData">
    <el-table-column  label="#" type="index" width="50"></el-table-column>
    <el-table-column  label="订单编号" prop="order_number"></el-table-column>
    <el-table-column  label="订单价格" prop="order_price" width="100"></el-table-column>
    <el-table-column  label="是否付款" prop="pay_status" width="100">
        <template slot-scope="scope">
            <div>
             <el-tag v-if="scope.row.pay_status == '1'">已付款</el-tag> 
             <el-tag type="danger" v-else>未付款</el-tag> 
            </div>
        </template>
    </el-table-column>
    <el-table-column  label="是否发货" prop="is_send" width="100"></el-table-column>
    <el-table-column  label="下单时间" prop="create_time">
        <template slot-scope="scope">
            <div>{{dateTransition(scope.row.create_time)}}</div>
        </template>
    </el-table-column>
    <el-table-column label="操作（地址）">
        <template slot-scope="scope">
            <div>
              <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>  
              <el-button type="success" icon="el-icon-location" size="mini"></el-button>  
            </div>
        </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
 props:{
     tableData:{
         type:Array,
         default(){
             return []
         }
     }
 },
 methods: {
     //时间转换
     dateTransition(date){
        const moment = require('moment')
        return moment(date * 1000).format("YYYY-MM-DD HH:mm:ss");
     }
 },
}
</script>

<style scoped>
.cell{
    font-size: 12px !important;
}
.el-table{
    margin: 15px auto;
}
</style>