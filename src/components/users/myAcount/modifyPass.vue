<template>
    <div>
      <h2>修改密码</h2><br />
        <el-row :gutter="20">
            <el-col :span="16">
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="旧密码" prop="oldPass">
                        <el-input type="password" v-model="ruleForm2.oldPass" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="密码" prop="pass">
                        <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm2')" :disabled="dis">提交</el-button>
                        <el-button @click="resetForm('ruleForm2')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        data() {

            var validatePass = (rule, value, callback) => {
                if(value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if(this.ruleForm2.checkPass !== '') {
                        this.$refs.ruleForm2.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if(value === '') {
                    callback(new Error('请再次输入密码'));
                } else if(value !== this.ruleForm2.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                ruleForm2: {
                    oldPass: '',
                    pass: '',
                    checkPass: '',
                    age: ''
                },
                rules2: {
                    oldPass: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                    pass: [{
                        validator: validatePass,
                        trigger: 'blur'
                    }],
                    checkPass: [{
                        validator: validatePass2,
                        trigger: 'blur'
                    }]
                },
                dis:false       //为提交按钮绑定disabled事件，命名为dis，初始化按钮状态为false，可用状态
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid) {
                      this.postData();

                        // this.dis=!this.dis   //当用户点击提交按钮后，按钮状态变为true，不可用状态
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
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
          postData(){
              var url=this.HOST+'/user_profile'
            this.$axios.post(url, {
              operate: "password",
              user_data: {
                user_id: null,
                old_password: this.ruleForm2.oldPass,
                new_password: this.ruleForm2.pass,
              }
            }).then(res => {
              if(res.data.code===1){
                this.$message.error(`${res.data.msg}`);
              }else{
                this.$message.success(`${res.data.msg}`);
                this.$router.push('/login');
              }
              console.log(res);
            }).catch(error=>{
              console.log(error);
            })
          }
        }
    }
</script>

<style scoped>
  h2{
    margin-left: 40%;
    margin-top: 50px;
    margin-bottom: 20px;
  }
  form{
    margin-left: 160px;
  }
</style>
