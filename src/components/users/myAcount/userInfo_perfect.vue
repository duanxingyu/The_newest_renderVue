<template>
  <div>
    <h2>完善用户资料</h2><br/>
    <el-row :gutter="20">
      <el-col :span="16">
        <el-form :model="forms" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

          <el-form-item label="邮箱:" prop="email">
            <el-input v-model="forms.email" ></el-input>
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

          <el-form-item label="QQ:" prop="qqnumber">
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
    name:'userInfo_perfect',
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
        var url = this.HOST + '/user_profile'
        this.$axios.post(url,{
          operate:'complete',
          user_id:this.$store.state.user_id,
          user_data:{
            email:this.forms.email,
            realname:this.forms.realname,
            qqnumber:this.forms.qqnumber,
            genders:this.forms.genders,
            company:this.forms.company,
            company_url:this.forms.company_url,
          }
        }).then(res => {
          console.log(res.data.data)
          var arr=res.data;
          for(var i =0; i<arr.length; i++){
            console.log(res)
          }
          if(res.data.code===1) {
            this.$message.error(res.data.data[i].msg);
            console.log(res.data.data[i].msg)
          }else{
            this.$message.error(res.data.data[i].msg);
            if(this.store.state.token)
            this.$router.push('/');
          }

          // console.log(res.data.data)
        }).catch(error => {
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
