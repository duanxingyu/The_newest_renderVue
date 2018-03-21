<template>
  <div>
    <h2>充值</h2><br/>

    <el-button type="success" round @click="dialogFormVisible = true">现金充值</el-button>
    <el-button type="info" round @click="dialogFormVisible1 = true">代金券充值</el-button>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>当前账户信息详情</span>
        <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
      </div>
      <div v-for="o in 4" :key="o" class="text item">
        {{'列表内容 ' + o }}
      </div>
    </el-card>

    <el-tabs type="border-card" class="tabsCard">
      <el-tab-pane label="账户余额详情">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="普通充值记录">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="代金券充值记录">
        <el-table
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="地址">
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!--现金充值对话框-->
    <el-dialog width="40%" title="现金充值" :visible.sync="dialogFormVisible">
      <el-form :model="form1" :rules="rules1" ref="form1">
        <el-form-item label="充值金额" prop="money" :label-width="formLabelWidth">
          <el-input v-model.number="form1.money" placeholder="请输入金额" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付方式" :label-width="formLabelWidth">
          <el-radio-group v-model="radio2">
            <el-radio :label="1"><img src="../../../assets/alipay.svg" width="40" height="40"></el-radio>
            <el-radio :label="2"><img src="../../../assets/weixin.svg" width="40" height="40"></el-radio>
            <el-radio :label="3"><img src="../../../assets/yinlian.svg" width="50" height="50"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogSubmit1('form1')">立即充值</el-button>
      </div>
    </el-dialog>
    <!--对话框结束-->

    <!--代金券充值对话框-->
    <el-dialog width="40%" title="代金券充值" :visible.sync="dialogFormVisible1">
      <el-form :model="form2" :rules="rules2" ref="form2">
        <el-form-item label="代金券" prop="crashNumber" :label-width="formLabelWidth">
          <el-input v-model="form2.crashNumber" placeholder="请输入代金券号码" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogSubmit2('form2')">立即充值</el-button>
      </div>
    </el-dialog>
    <!--对话框结束-->
  </div>
</template>

<script>
  export default {
    name: 'reCharge',
    data() {
      return {
        form1: {
          money: '',
        },
        form2: {
          crashNumber: '',
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],

        // 对话框开始
        dialogFormVisible: false,
        dialogFormVisible1:false,

        rules1:{
          money:[{
            required:true,
            message:'请输入金额'
          },{
            min:5,
            max:50000,
            type:'number',
            message:'金额在5~50000元之间'
          }]
        },
        formLabelWidth: '15%',
        // 对话框结束

        rules2:{
          crashNumber:[{
            required:true,
            message:'请输入代金券号码'
          }]
        },
        //支付方式默认支付宝
        radio2: 1
      }
    },
    methods:{
      dialogSubmit1(form1) {
        this.$refs[form1].validate((valid) => {
          if (valid) {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
            this.dialogFormVisible=false
          } else {
            console.log('error submit!!');
            this.$notify({
              title: '提示',
              message: '请按提示将信息填写完整',
              type: 'error'
            });
            return false;
          }
        });
      },
      dialogSubmit2(form2) {
        this.$refs[form2].validate((valid) => {
          if (valid) {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
            this.dialogFormVisible1=false
          } else {
            console.log('error submit!!');
            this.$notify({
              title: '提示',
              message: '请按提示将信息填写完整',
              type: 'error'
            });
            return false;
          }
        });
      }
    }
  }
</script>

<style scoped>
  button, h2 {
    margin: 10px 10px;
  }

  .box-card {
    width: 650px;
    margin: 20px 10px;
  }

  .item {
    padding: 18px 0;
  }

  .tabsCard {
    width: 650px;
    margin: 20px 10px;
  }
  img{
    vertical-align: middle;
  }
</style>
