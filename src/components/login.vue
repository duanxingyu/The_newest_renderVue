<template>
  <div id="login">
    <el-row :gutter="20">
      <el-col :md="16">

        <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm"
                 style="margin-left: 100px;">
          <h2>用户登录</h2>
          <el-form-item label="用户名:" prop="username">
            <el-input v-model="loginForm.username">{{loginForm.username}}</el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="loginForm.pass" auto-complete="off">{{loginForm.pass}}</el-input>
          </el-form-item>
          <!--<p v-model="token"></p>-->
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" :loading="loading" v-model="loginBtn">
              {{loginBtn}}
            </el-button>
            <el-button @click="resetForm('loginForm')">重置</el-button>

          </el-form-item>
          <el-form-item>
            <router-link to="/register">还没注册？ </router-link>
            <span>||</span>
            <router-link to="/forgetPass">  忘记密码？ </router-link>
          </el-form-item>

        </el-form>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import store from '../store/store'
  import {Loading} from 'element-ui'
  import axios from 'axios'
  export default {
    name: "login",
    data() {
      return {
        loginBtn: '登录',
        loading: false,
        loginForm: {
          username: '',
          pass: '',
          token: ''
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
            trigger: 'blur'
          }]
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
            this.loading = true
            // this.loginBtn = "登录中..."

            var url = this.HOST + "/session";
            //根据api接口获取token
            this.$axios.post(url, {
              username: this.loginForm.username,
              password: this.loginForm.pass
            }).then(res => {
              console.log(res.data);
              if(res.data.code===1) {
                this.$message.error(`${res.data.msg}`);
                this.loading = false
                this.loginBtn = "登录"
              }else if(res.data.code===-1){
                this.$store.commit('set_userId',res.data.data.user_id);
                let data = res.data.data;
                //根据store中set_token方法将token保存至localStorage中，data["Authentication-Token"]，获取token的value值
                this.$store.commit('set_token', data["Authentication-Token"]);
                console.log(data["Authentication-Token"]);
                this.$message.error(`${res.data.msg}`);
                this.loading = false
                this.loginBtn = "登录"
                this.$router.push('/userInfo_perfect');

              }else{

                let username=res.data.data['user_name'];
                // console.log(username);
                this.$store.commit('set_username',username);
                let data = res.data.data;
                //根据store中set_token方法将token保存至localStorage中，data["Authentication-Token"]，获取token的value值
                this.$store.commit('set_token', data["Authentication-Token"]);
                console.log(data["Authentication-Token"]);

                if (store.state.token) {
                  this.$router.push('/')
                  console.log(store.state.token)
                } else {
                  this.$router.replace('/login');
                }

                this.$message.success(`${res.data.msg}`);
              }
              console.log(res.data);

            }).catch(error => {
              console.log(error);
              this.loading = false
              this.loginBtn = "登录"
              //如果登录失败，加载动画停止
              let loading = Loading.service({});
              loading.close();
            })
          } else {
            console.log('error submit!!');

            return false;
          }
        });

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },

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
    height: 450px;
    width: 45%;

    padding: 50px 15px;
  }

  #login h2 {
    margin-bottom: 50px;
  }
a{
  text-decoration: none;
  color: #478aff;
  padding-left: 5px;
}

</style>
