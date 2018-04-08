<template>
  <div>
    <h2>充值</h2><br/>

    <el-button type="success" @click="dialogFormVisible = true">现金充值</el-button>
    <el-button type="primary"  @click="dialogFormVisible1 = true">代金券充值</el-button>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="color: #909399;"><strong>当前账户信息详情</strong></span>
        <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
      </div>
      <div v-for="i in tableData"  class="text item">
        <div class="list-item" v-show="false">user_id:<span class="list-value">{{ i.user_id }}元</span></div><br/>
        <div class="list-item">当前余额:<span class="list-value">{{ i.balance }}元</span></div><br/>
        <div class="list-item">代金券金额：<span class="list-value">{{i.coupon}}元</span></div><br/>
        <div class="list-item">用户等级：<span class="list-value">{{i.role}}</span></div><br/>
        <div class="list-item">单价：<span class="list-value">{{ i.draw_unit }}元</span></div>
      </div>
    </el-card>

    <el-tabs type="border-card" class="tabsCard">
      <!--<el-tab-pane label="账户余额详情">-->
        <!--<el-table :data="tableData" style="width: 100%">-->
          <!--<el-table-column prop="date" label="日期" width="180"></el-table-column>-->
          <!--<el-table-column prop="name" label="姓名" width="180"></el-table-column>-->
          <!--<el-table-column prop="address" label="地址"></el-table-column>-->
        <!--</el-table>-->
      <!--</el-tab-pane>-->
      <el-tab-pane label="普通充值记录">
        <el-table :data="tableData1.slice((currentPage-1)*pageSize,currentPage*pageSize)" style="width: 100%">
          <el-table-column prop="amount" label="金额"></el-table-column>
          <el-table-column prop="currency" label="币种" width="180"></el-table-column>
          <el-table-column prop="status" label="状态"></el-table-column>
          <el-table-column prop="created_at" label="日期" width="220"></el-table-column>
        </el-table>
        <el-pagination @size-change="sizeChange" @current-change="currentChange"
                       :current-page.sync="currentPage" :page-sizes="[5,10,20,40,80]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="pages.total">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="代金券充值记录">
        <el-table :data="tableData2.slice((currentPage1-1)*pageSize1,currentPage1*pageSize1)" style="width: 100%">
          <el-table-column prop="coupon_code" label="代金券"  width="180"></el-table-column>
          <el-table-column prop="par" label="金额" width="180"></el-table-column>
          <el-table-column prop="recharge_time" label="日期" width="180"></el-table-column>
        </el-table>
        <el-pagination @size-change="sizeChange" @current-change="currentChange"
                       :current-page.sync="currentPage1" :page-sizes="[5,10,20,40,80]"
                       :page-size="pageSize1"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="pages1.total">
        </el-pagination>
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
  import axios from 'axios'
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
        tableData: [],
        tableData1:[],
        tableData2:[],

        // 对话框开始
        //激活现金充值对话框
        dialogFormVisible: false,
        //激活代金券充值对话框
        dialogFormVisible1: false,

        rules1: {
          money: [{
            required: true,
            message: '请输入金额'
          }, {
            type: 'number',
            message: '金额只能为数值'
          }, {
            min: 5,
            max: 50000,
            // type:'number',
            message: '金额在5~50000元之间'
          }]
        },
        formLabelWidth: '15%',
        // 对话框结束

        rules2: {
          crashNumber: [{
            required: true,
            message: '请输入代金券号码',

          }, {
            message: '代金券号码由数字和英文组成',
            pattern: /^[a-zA-Z0-9]+$/
          }]
        },
        //支付方式默认支付宝
        radio2: 1,
        currentPage: 1,
        pageSize: 10,
        currentPage1: 1,
        pageSize1: 10,
        pages: {},
        pages1:{},
      }

    },
    created() {
      this.getData();
    },
    methods: {
      getData(){
        // var self=this;
        var url=this.HOST;
        // console.log(self);
        function getDetails() {
          return axios.get(url+'/account_info');
        }
        function getcoupon_charge() {
          return axios.get(url+'/coupon_charge',{
            params:{
              page: 1,
              per_page: 500,
            }
          });
        }
        function getUser_recharge() {
          return axios.get(url + '/user_recharge',{
            params:{
              page: 1,
              per_page: 500,
            }
          });
        }
        //执行axios前首先保存this
        let _this=this;
        axios.all([getDetails(),getUser_recharge(),getcoupon_charge()]).then(axios.spread(function (detail,user_charge,charge) {
          //获取账户详情
          console.log(detail.data.data);
          // console.log(_this);
          _this.tableData=detail.data.data;

          //普通用于充值
          console.log(user_charge.data);
          _this.tableData1=user_charge.data.data;
          _this.pages=user_charge.data;

          //代金券充值
          console.log(charge.data);
          _this.tableData2=charge.data.data
          _this.pages1=charge.data;

        })).catch(error=>{
          console.log(error);
        })
      },
      //每页显示条数
      sizeChange(size) {
        this.pageSize = size
        console.log(`每页 ${size} 条`);
      },
      // 当前页
      currentChange(currentPage) {
        this.currentPage = currentPage
        console.log(`当前页: ${currentPage}`);
      },
      //获取表格数据
      //代金券充值post
      postCharge(){
        var url=this.HOST+'/coupon_charge';
        this.$axios.post(url,{
          recharge_data: {coupon_code:this.form2.crashNumber}
        }).then(res=>{
          if(res.data.code===1){
            this.$message.error(`${res.data.msg}`);
          }else{
            this.$message.success(`${res.data.msg}`);
          }
          console.log(res.data);
        }).catch(error=>{
          console.log(error);
        })
      },
      //现金充值
      dialogSubmit1(form1) {
        this.$refs[form1].validate((valid) => {
          if (valid) {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
            this.dialogFormVisible = false
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
      //代金券充值
      dialogSubmit2(form2) {
        this.$refs[form2].validate((valid) => {
          if (valid) {
            this.postCharge();

            this.dialogFormVisible1 = false
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
  };
</script>

<style scoped>
  button, h2 {
    margin: 10px 10px;
  }

  .box-card {
    width: 750px;
    margin: 20px 10px;
  }

  .item {
    padding: 10px 0px;
    /*background-color: red;*/
  }

  .tabsCard {
    width: 750px;
    margin: 20px 10px;
  }
  img{
    vertical-align: middle;
  }

  div.list-item{
    width: 100%;
    color: #909399;
    height: 50px;
    padding-left: 10px;
    margin-top:-20px;
    line-height: 50px;
    overflow: hidden;
    border-bottom: 1px solid #ebeef5;
  }
  div>span.list-value{
    float: right;
    color: #409EFF;
    padding-right:20px ;
  }

</style>
