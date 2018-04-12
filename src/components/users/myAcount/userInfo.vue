<template>
  <div>
    <h2>用户资料</h2><br/>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form :model="forms" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <!--<el-form-item label="用户名:" prop="user_id">-->
            <el-input type="hidden"  v-model="forms.user_id" :disabled="true"></el-input>
          <!--</el-form-item>-->

          <el-form-item label="用户名:" prop="user_name">
            <el-input v-model="forms.user_name" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="手机号:" prop="phone">
            <el-input v-model="forms.phone" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="邮箱:" prop="email">
            <el-input v-model="forms.email" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="姓名:" prop="realname">
            <el-input v-model="forms.realname"></el-input>
          </el-form-item>

          <el-form-item label="性别" prop="genders">
            <el-select v-model="forms.genders" placeholder="请选择性别">
              <el-option label="男" value="m"></el-option>
              <el-option label="女" value="w"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="所在地:" prop="address">
            <el-input v-model="forms.address"></el-input>
          </el-form-item>

          <el-form-item label="QQ:" prop="qqnumb">
            <el-input v-model.number="forms.qqnumber"></el-input>
          </el-form-item>

          <el-form-item label="公司名:" prop="company">
            <el-input v-model="forms.company"></el-input>
          </el-form-item>

          <el-form-item label="公司主页:" prop="conpany_url">
            <el-input v-model="forms.company_url"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')" :disabled="dis">立即修改</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  export default {
    data() {
      // 验证手机号
      var CheckTel = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入手机号码'));
        } else if (value.toString().length != 11) {
          callback(new Error('手机号码必须是11位'));
        } else {
          callback();
        }
      };
      return {
        forms: {
          user_id:null,
          user_name: '',
          phone: null,
          email: '',
          realname: '',
          genders: '',
          address: '',
          qqnumber: '',
          company: '',
          company_url: '',
        },
        // forms: {},
        rules: {
          // user_name: [{
          //   required: true,
          //   message: '请输入用户名',
          //   trigger: 'blur'
          // },
          //   {
          //     min: 3,
          //     max: 5,
          //     message: '长度在 3 到 16 个字符',
          //     trigger: 'blur'
          //   },
          //   {
          //     pattern: /^[0-9a-zA-Z_\u4e00-\u9fa5][a-zA-Z_\u4e00-\u9fa5]+[0-9a-zA-Z_\u4e00-\u9fa5]+$/,
          //     message: '用户名不能全为数字'
          //   }
          // ],
          phone: [{
            required: true,
            validator: CheckTel,
            trigger: 'blur',
          }
          ],
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
          realname: [{
            required: true,
            message: '请输入姓名',
            trigger: 'blur'
          }],
          gender: [{
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }],
          // address: [{
          //   required: true,
          //   message: '请输入所在地',
          //   trigger: 'blur'
          // }],
          qq: [{
            required: false,
            message: '请输入QQ',
            trigger: 'blur'
          }, {
            type: 'number',
            message: 'QQ必须为数字值'
          }],
          company: [{
            required: false,
            message: '请输入公司名',
            trigger: 'blur'
          }],
          web: [{
            required: false,
            message: '请输入公司主页',
            trigger: 'blur'
          }],
        },
        dis: false
      };
    },
    created() {
      var url = this.HOST + '/user_profile'
      this.$axios.get(url).then(res => {
        console.log(res.data.data)
        this.forms = res.data.data
      }).catch(error => {
        console.log(error)
      })
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.postData();
            // this.dis=!this.dis
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
      postData(){
        var url = this.HOST + '/user_profile';
        this.$axios.post(url,{
          operate:"usersave",
          user_data:{
            user_id:this.forms.user_id,
            user_name:this.forms.user_name,
            phone:this.forms.phone,
            email:this.forms.email,
            real_name:this.forms.real_name,
            genders:this.forms.genders,
            address:this.forms.address,
            qqnumber:this.forms.qqnumber,
            company:this.forms.company,
            company_url:this.forms.company_url
          }
        }).then(res=>{
          if(res.data.code===0) {
            this.$message.success(`${res.data.msg}`);
          }else{
            this.$message.error(`${res.data.msg}`);
          }
          console.log(res)
        }).catch(error=>{
          console.log(error)
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style scoped>
  h2 {
    margin-left: 40%;
    margin-top: 50px;
    margin-bottom: 20px;
  }

  form {
    margin-left: 160px;
  }
</style>
