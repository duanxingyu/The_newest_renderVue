<template>
  <div>
    <h2>子账户管理</h2><br/>
    <div class="btn">

        <el-badge :value="this.tableData.length" class="item">
          <el-button type="primary" size="medium" icon="el-icon-tickets" @click="listCount">列表</el-button>
        </el-badge>

        <el-button type="success" size="medium" icon="el-icon-plus" @click="dialogFormVisible1 = true"
                   style="margin-left: 15px">添加子账号
        </el-button>

    </div>
    <!--添加子账户对话框-->
    <el-dialog width="40%" title="添加子账号" :visible.sync="dialogFormVisible1">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户名" prop="user_name" :label-width="formLabelWidth">
          <el-input v-model="form.user_name" placeholder="请输入用户名" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
          <el-input v-model.number="form.phone" placeholder="请输入手机号" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="genders" :label-width="formLabelWidth">
          <el-select v-model="form.genders" placeholder="请选择性别">
            <el-option label="男" value="m"></el-option>
            <el-option label="女" value="w"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="form.password" placeholder="请输入密码" type="password" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="dialogSubmit('form')">立即添加</el-button>
      </div>
    </el-dialog>
    <!--对话框结束-->

    <!--表格-->
    <el-table :data="tableData"  style="width: 100%;margin-left: 10px;">
        <el-table-column label="user_id" v-if="show">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.user_id }}</span>
          </template>
        </el-table-column>

      <el-table-column label="用户名" >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.user_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="手机号"  prop="phone">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账户类型" prop="phone">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{$childAccount.getAccountType(scope.row.account_type)  }}</span>
        </template>
      </el-table-column>

      <el-table-column label="启用" prop="active">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{$childAccount.getActive(scope.row.active)  }}</span>
        </template>
      </el-table-column>

      <el-table-column label="余额" prop="phone" >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.balance }}</span>
        </template>
      </el-table-column>

      <!--<el-table-column label="充值记录"  sortable>-->
        <!--<template slot-scope="scope">-->
          <!--<span style="margin-left: 10px">{{ scope.row.balance }}</span>-->
        <!--</template>-->
      <!--</el-table-column>-->

      <el-table-column label="操作" width="550px">

        <template slot-scope="scope">
          <div  v-if="scope.row.account_type==='1' ">
            <!--转入prover-->
            <el-popover ref="popoverIn"
                        placement="bottom"
                        width="200"
                        trigger="click">
              <el-input-number v-model="num1" @change="handleChange" size="small" :min="1" :max="50000" label="转入金额"></el-input-number>
              <el-button type="primary" size="mini" @click="handleIn(scope.$index, scope.row)">转入</el-button>
            </el-popover>

            <!--转出prover-->
            <el-popover ref="popoverOut"
                        placement="bottom"
                        width="200"
                        trigger="click">
              <el-input-number v-model="num2" @change="handleChange" size="small" :min="1" :max="50000" label="转出金额"></el-input-number>
              <el-button type="primary" size="mini" @click="handleOut(scope.$index, scope.row)">转出</el-button>
            </el-popover>

            <el-button size="mini" round @click="handleEdit(scope.$index, scope.row),dialogFormVisible2 = true">编辑</el-button>
            <el-button size="mini" round type="info" v-popover:popoverIn >转入</el-button>
            <!--@click="handleIn(scope.$index, scope.row)"-->

            <el-button size="mini" round v-popover:popoverOut >转出</el-button>
            <el-button size="mini" round type="danger" @click="ModPass(scope.$index, scope.row),dialogFormVisible3=true">修改密码</el-button>
          </div>
          <div v-else>
            <el-button size="mini" round @click="handleEdit(scope.$index, scope.row),dialogFormVisible2 = true">编辑</el-button>
          </div>
        </template>



        <!--<template slot-scope="scope">-->
          <!--<el-button size="mini" round @click="handleEdit(scope.$index, scope.row),dialogFormVisible2 = true">编辑</el-button>-->
        <!--</template>-->


      </el-table-column>

      <!--<el-table-column label="操作" width="350px" >-->
      <!---->
      <!--</el-table-column>-->
    </el-table>

    <!--编辑对话框-->
    <el-dialog width="40%" title="编辑" :visible.sync="dialogFormVisible2">
      <el-form :model="editForms" :rules="rules"  ref="editForms" >

        <el-input type="hidden" v-model="editForms.user_id" ></el-input>

        <el-form-item label="用户名" prop="user_name" :label-width="formLabelWidth">
          <el-input v-model="editForms.user_name" placeholder="请输入用户名" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
          <el-input v-model.number="editForms.phone" placeholder="请输入手机号" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
          <el-input v-model="editForms.email" placeholder="请输入邮箱" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="genders" :label-width="formLabelWidth">
          <el-select v-model="editForms.genders" placeholder="请选择性别">
            <el-option label="男" value="m"></el-option>
            <el-option label="女" value="w"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="QQ:" prop="qqnumber" :label-width="formLabelWidth">
          <el-input v-model.number="editForms.qqnumber"></el-input>
        </el-form-item>

        <el-form-item label="所在地:" prop="address" :label-width="formLabelWidth">
          <el-input v-model="editForms.address"></el-input>
        </el-form-item>

        <el-form-item label="公司名:" prop="company" :label-width="formLabelWidth">
          <el-input v-model="editForms.company"></el-input>
        </el-form-item>

        <el-form-item label="公司主页:" prop="conpany_url" :label-width="formLabelWidth">
          <el-input v-model="editForms.company_url"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="editDialog('editForms')">保存</el-button>
      </div>
    </el-dialog>
    <!--编辑对话框结束-->

    <!--修改密码对话框-->
    <el-dialog width="40%" title="修改密码" :visible.sync="dialogFormVisible3">
      <el-form :model="passForms" :rules="rules"  ref="passForms" >

        <el-input type="hidden" v-model="passForms.user_id"></el-input>


        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="passForms.password" placeholder="请输入密码" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible3 = false">取 消</el-button>
        <el-button type="primary" @click="passDialog('passForms')">修改</el-button>
      </div>
    </el-dialog>
    <!--修改密码对话框结束-->
  </div>
</template>

<script>
  import {Loading} from 'element-ui'
  export default {
    name: 'childAcount',
    data() {
      // 验证手机号,自定义验证规则
      let CheckTel = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入手机号码'));
        } else if (value.toString().length != 11) {
          callback(new Error('手机号码必须是11位'));
        } else {
          callback();
        }
      };
      return {
        // 计数器
        num1: 1,
        num2:1,
        //隐藏表格第一列
        show:false,
        // 对话框开始
        dialogFormVisible1: false, //激活子账户对话框
        dialogFormVisible2: false, //激活编辑对话框
        dialogFormVisible3:false,   //激活修改密码对话框
        checked:false,
        form: {
          user_id:null,
          user_name: '',
          phone: null,
          genders: '',
          password: '',
        },
        // 将添加子账户的api数据添加至forms对象
        value:'12',
        formLabelWidth: '15%',

        tableData: [],

        rules: {
          user_name: [{
            required: true,
            message: '请输入用户名',
          }, {
              min: 3,
              max: 16,
              message: '长度在 3 到 16 个字符',
              trigger: 'blur'
            },
            {
              pattern:/^[0-9a-zA-Z_\u4e00-\u9fa5][a-zA-Z_\u4e00-\u9fa5]+[0-9a-zA-Z_\u4e00-\u9fa5]+$/,
              message:'用户名不能全为数字'
          }],
          phone: [{
            required: true,
            validator: CheckTel,
            trigger: 'blur'
          },{
            type:'number',
            message:'手机号必须是数值'
          }
          ],
          genders: [{
            required: true,
            message: '请选择性别',
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
          email: [{
            required: true,
            message: '请输入邮箱地址',
          },
            {
              message: '邮箱地址格式不正确，示例:123@qq.com',
              type: 'email',
              trigger: 'blur'
            }
          ],
        },
        //将表格中的数据遍历到子账户对话框中
        editForms:{
          user_id:null,
          user_name: '',
          email:'',
          phone: null,
          genders: '',
          qqnumber: null,
          address:'',
          company:'',
          company_url:''
        },
        passForms:{
          user_id:null,
          password:''
        },
        reCharges:{},
        payments:{},
      };

    },
    created(){

      this.getData();

      this.getEditData();

    },

    methods: {
      //计数器
      handleChange(value) {
        console.log(value);
      },
      //编辑按钮
      handleEdit(index, row) {
        //根据表格中的user_id来修改密码
        this.editForms=row
        console.log(row);

      },
      //转入按钮
      handleIn(index, row) {
        this.reCharges=row;
        this.reCharge();
        console.log(row);
      },
      //转出按钮
      handleOut(index, row) {
        this.payments=row;
        this.payment();
        console.log(row);
      },
      //修改密码按钮
      ModPass(index, row) {
        this.passForms=row
        console.log(index, row);
      },
      //添加子账号 提交post
      dialogSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.postData();
            this.dialogFormVisible1=false;
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });

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
      //列表按钮
      listCount() {
        this.$message('当前列表共 ' + this.value + ' 条数据，已查看');
        this.value = '';
      },
      //获取api表格数据
      getData(){
        var url = this.HOST + '/sub_manage';
        this.$axios.get(url).then(res=>{
          console.log(res.data.data);
          this.tableData=res.data.data;
        }).catch(error=>{
          console.log( error)
        })
      },

      //新增子账户api
      postData(){
        var url = this.HOST + '/sub_manage';
        this.$axios.post(url,{
          operate:'addsub',
          user_data:{
            user_name:this.form.user_name,
            phone:this.form.phone,
            genders:this.form.genders,
            password:this.form.password
          }
        }).then(res=>{
          let NewPage = '_empty' + '?time=' + new Date().getTime()/1000
          // 之后将页面push进去
          this.$router.push(NewPage)
          // 再次返回上一页即可
          this.$router.go(-1)
          console.log(res);
        }).catch(error=>{
          console.log(error)
        })
      },
      //编辑对话框get请求
      getEditData(){

        var url=this.HOST+'/user_profile';
        this.$axios.get(url,{
          params:{
            user_id:this.editForms.user_id,
          }
        }).then(res=>{
          // this.editForms=res.data.data
          console.log(res.data)
        }).catch(error=>{
          console.log(error);
        })
      },
      //编辑对话框post请求
      postEidtData(){
        var url=this.HOST+'/user_profile';
        this.$axios.post(url,{
          operate:'usersave',
          user_data:{
            user_id:this.editForms.user_id,
            user_name:this.editForms.user_name,
            phone:this.editForms.phone,
            email:this.editForms.email,
            genders:this.editForms.genders,
            qqnumber:this.editForms.qqnumber,
            address:this.editForms.address,
            company:this.editForms.company,
            company_url:this.editForms.company_url
          }

        }).then(res=>{
          // this.editForms=res.data.data
          console.log(res.data.data)
          // if(res.data)
        }).catch(error=>{
          console.log(error);
        })
      },

      //转入
      reCharge(){
        var url=this.HOST+'/sub_manage'
        this.$axios.post(url,{
          operate:'recharge',
          user_data:{
            user_id:this.reCharges.user_id,
            amount:this.num1
          }
        }).then(res=>{
          let NewPage = '_empty' + '?time=' + new Date().getTime()/1000
          // 之后将页面push进去
          this.$router.push(NewPage)
          // 再次返回上一页即可
          this.$router.go(-1);
          setTimeout(()=>{
            if(res.data.code===1) {
              this.$message.error(`${res.data.msg}`)
            }else{
              this.$message(`${res.data.msg}`)
            }
          },4500)
          console.log(res)
        }).catch(error=>{
          console.log(error);
        })
      },

      //转出
      payment(){
        var url=this.HOST+'/sub_manage'
        this.$axios.post(url, {
          operate: 'payment',
          user_data: {
            user_id: this.payments.user_id,
            amount: this.num2,
          }
        }).then(res => {
          let NewPage = '_empty' + '?time=' + new Date().getTime()/1000
          // 之后将页面push进去
          this.$router.push(NewPage)
          // 再次返回上一页即可
          this.$router.go(-1);
          setTimeout(()=>{
            if (res.data.code === 1) {
              this.$message.error(`${res.data.msg}`)
            } else {
              this.$message(`${res.data.msg}`)
            }
          },4000)

          console.log(res)
        }).catch(error => {
          console.log(error);
        });
      },

      //修改密码post请求
      passPost(){
        var url=this.HOST+'/user_profile';
        this.$axios.post(url,{
          operate:'password',
          user_data:{
            user_id:this.passForms.user_id,
            new_password:this.passForms.password
          }
        }).then(res=>{
          console.log(res);
          console.log(this.user_id)
        }).catch(err=>{
          console.log(err);
        })
      },

      //点击编辑对话框执行的操作
      editDialog(formName){
        this.$refs[formName].validate((valid)=>{
          if(valid){
            this.postEidtData();
            setTimeout(()=>{
              this.dialogFormVisible3=false;
              this.$message.success("修改密码成功");
            },3500)
          }else {
            this.$notify({
              title: '提示',
              message: '请按提示将信息填写完整',
              type: 'error'
            });
          }
        })
      },
      //修改密码对话框提交操作
      passDialog(formName){
        this.$refs[formName].validate((valid)=>{
          if(valid){
            this.passPost();
            setTimeout(()=>{
              this.dialogFormVisible3=false;
              this.$message.success("修改密码成功");
            },3500)
          }else {
            this.$notify({
              title: '提示',
              message: '请按提示将信息填写完整',
              type: 'error'
            });
          }
        })


      }
    },

  }
</script>

<style scoped>
  .btn, h2 {
    margin: 10px 10px;
  }
</style>
