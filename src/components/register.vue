<template>
  <div id="login">
    <el-row :gutter="20">
      <el-col :md="16">

        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm"
                 style="margin-left: 100px;">
          <h2>用户注册</h2>

          <el-form-item label="用户名:" prop="username">
            <el-input v-model="loginForm.username">{{loginForm.username}}</el-input>
          </el-form-item>

          <el-form-item label="手机号:"  prop="phone">
            <el-input v-model.number="loginForm.phone">{{loginForm.phone}}</el-input>
            <el-button v-show="show" @click="sendMsg()" class="validateCode">点击获取验证码</el-button>
            <el-button v-show="!show" style="margin-left: 0px" class="validateCode">{{count}}秒后，重新获取</el-button>
          </el-form-item>

          <el-form-item label="手机验证码:" prop="validateCode">
            <el-input :disabled="disabled" v-model="loginForm.validateCode">{{loginForm.validateCode}}</el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="loginForm.pass" auto-complete="off">{{loginForm.pass}}</el-input>
          </el-form-item>

          <el-form-item label="确认密码" prop="confirmPass">
            <el-input type="password" v-model="loginForm.confirmPass" auto-complete="off">{{loginForm.pass}}</el-input>
          </el-form-item>

          <!--<p v-model="token"></p>-->
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" :loading="loading">
              注册
            </el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>

          </el-form-item>


        </el-form>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import store from '../store/store'
  import {Loading} from 'element-ui'

  export default {
    name: "register",
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.loginForm.confirmPass !== '') {
            this.$refs.loginForm.validateField('confirmPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.loginForm.pass) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      };
      // 验证手机号
      var CheckTel = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入手机号码'));
        } else if (!Number.isInteger(value)) {
          callback(new Error('手机号码必须是数字'));
        } else if (value.toString().length != 11) {
          callback(new Error('手机号码必须是11位'));
        } else {
          callback();
        }
      };

      return {
        loading: false,
        disabled: true,
        show: true,
        count: '',
        timer: null,
        loginForm: {
          username: '',
          phone: '',
          validateCode: '',
          pass: '',
          confirmPass: '',
          token: '',
        },
        rules: {
          username: [{
            required: true,
            message: '用户名不能为空',
            trigger: 'blur'
          }],
          pass: [{
            required: true,
            message: '密码不能为空',
            trigger: 'blur',
            validator: validatePass
          }],
          phone: [{
            required: true,
            validator: CheckTel,
            trigger: 'blur'
          }],
          validateCode: [{
            required: true,
            message: '验证码不能为空',
            trigger: 'blur'
          }],
          confirmPass: [{
            required: true,
            // message: '确认密码不能为空',
            trigger: 'blur',
            validator: validatePass2
          }],
        },
        token: '',
      }

    },
    // mounted() {
    //   this.$store.commit(types.TITLE, 'Login');
    // },

    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {

          } else {

            console.log('error submit!!');

            return false;
          }
        });

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      sendMsg() {
             this.show = false
             const TIME_COUNT = 180;
             this.disabled = false;
             if (!this.timer) {
               this.count = TIME_COUNT;
               this.show = false;
               this.timer = setInterval(() => {
                 if (this.count > 0 && this.count <= TIME_COUNT) {
                   this.count--;
                 } else {
                   this.show = true;
                   clearInterval(this.timer);
                   this.timer = null;
                   this.disabled = true;
                 }
               }, 1000)
             }
           }
      }
      // sendMsg() {
      //   this.$refs.loginForm.validateField('phone', function (msg) {
      //     if (!msg) {
      //       this.show = false
      //       const TIME_COUNT = 180;
      //       this.disabled = false;
      //       if (!this.timer) {
      //         this.count = TIME_COUNT;
      //         this.show = false;
      //         this.timer = setInterval(() => {
      //           if (this.count > 0 && this.count <= TIME_COUNT) {
      //             this.count--;
      //           } else {
      //             this.show = true;
      //             clearInterval(this.timer);
      //             this.timer = null;
      //             this.disabled = true;
      //           }
      //         }, 1000)
      //       }
      //     } else {
      //       // alert(msg);
      //     }
      //   });
      // }
  }
</script>

<style scoped>
  #login {
    text-align: center;
    margin-top: 50px;
    margin-left: 420px;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    /*display: inline-block;*/
    font-size: inherit;
    height: 600px;
    width: 45%;

    padding: 50px 15px;
  }

  #login h2 {
    margin-bottom: 50px;
  }

  a {
    text-decoration: none;
    color: #478aff;
    padding-left: 5px;
  }

  .validateCode {
    float: left;
  }

</style>
