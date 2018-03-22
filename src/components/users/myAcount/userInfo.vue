<template>
    <div>
        <h2>用户资料</h2><br />
        <el-row :gutter="20">
            <el-col :span="16">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名:" prop="username">
                        <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号:" prop="phone">
                        <el-input v-model.number="ruleForm.phone"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱:" prop="email">
                        <el-input v-model="ruleForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名:" prop="name">
                        <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sex">
                        <el-select v-model="ruleForm.sex" placeholder="请选择性别">
                            <el-option label="男" value="man"></el-option>
                            <el-option label="女" value="woman"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所在地:" prop="address">
                        <el-input v-model="ruleForm.address"></el-input>
                    </el-form-item>
                    <el-form-item label="QQ:" prop="qq">
                        <el-input v-model.number="ruleForm.qq"></el-input>
                    </el-form-item>
                    <el-form-item label="公司名:" prop="company">
                        <el-input v-model="ruleForm.company"></el-input>
                    </el-form-item>
                    <el-form-item label="公司主页:" prop="web">
                        <el-input v-model="ruleForm.web"></el-input>
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
            } else if (!Number.isInteger(value)) {
              callback(new Error('手机号码必须是数字'));
            } else if (value.toString().length != 11) {
              callback(new Error('手机号码必须是11位'));
            } else {
              callback();
            }
          };
            return {
                ruleForm: {
                    username: '',
                    phone: '',
                    email: '',
                    name: '',
                    sex: '',
                    address: '',
                    qq: '',
                    company: '',
                    web: '',
                },
                rules: {
                    username: [{
                            required: true,
                            message: '请输入用户名',
                            trigger: 'blur'
                        },
                        {
                            min: 3,
                            max: 5,
                            message: '长度在 3 到 5 个字符',
                            trigger: 'blur'
                        }
                    ],
                    phone: [{
                            required: true,
                            validator:CheckTel,
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
                    name: [{
                        required: true,
                        message: '请输入姓名',
                        trigger: 'blur'
                    }],
                    sex: [{
                        required: true,
                        message: '请选择性别',
                        trigger: 'change'
                    }],
                    address: [{
                        required: true,
                        message: '请输入所在地',
                        trigger: 'blur'
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
                dis:false
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if(valid) {
                        this.$notify({
                            title: '成功',
                            message: '修改成功',
                            type: 'success'
                        });
                        // this.dis=!this.dis
                    } else {
                        console.log('error submit!!');
                        this.$notify({
                            title:'提示',
                            message: '请按提示将信息填写完整',
                            type: 'error'
                        });
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
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
