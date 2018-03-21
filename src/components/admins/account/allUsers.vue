<template>
  <div>
    <h2>全部用户</h2>

    <template>
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="列表" name="first">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="ID">
              <el-input v-model="formInline.id" placeholder="ID"></el-input>
            </el-form-item>
            <el-form-item label="用户名">
              <el-input v-model="formInline.user" placeholder="用户名"></el-input>
            </el-form-item>

            <el-form-item label="姓名">
              <el-input v-model="formInline.user" placeholder="姓名"></el-input>
            </el-form-item>

            <el-form-item label="公司名">
              <el-input v-model="formInline.user" placeholder="公司名"></el-input>
            </el-form-item>

            <el-form-item label="电话">
              <el-input v-model="formInline.user" placeholder="电话"></el-input>
            </el-form-item>

            <el-form-item label="邮箱">
              <el-input v-model="formInline.user" placeholder="邮箱"></el-input>
            </el-form-item>

            <el-form-item label="设置组">
              <el-input v-model="formInline.user" placeholder="设置组"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>

          </el-form>

          <el-table :data="tableData5" sort-by="{tableData5.id}" ref="multipleTable"
                    style="width: 100%;margin-left: 10px;"
                    @selection-change="handleSelectionChange">

            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                      <span v-for="i in tableData5">
                        <el-form-item label="商品名称">
                            <span>{{i.name }}</span>
                        </el-form-item>
                        <el-form-item label="所属店铺">
                            <span>{{i.shop }}</span>
                        </el-form-item>
                        <el-form-item label="商品 ID">
                            <span>{{ i.id }}</span>
                        </el-form-item>
                        <el-form-item label="店铺 ID">
                            <span>{{ i.shopId }}</span>
                        </el-form-item>
                        <el-form-item label="商品分类">
                            <span>{{ i.category }}</span>
                        </el-form-item>
                        <el-form-item label="店铺地址">
                            <span>{{ i.address }}</span>
                        </el-form-item>
                        <el-form-item label="商品描述">
                            <span>{{ i.desc }}</span>
                        </el-form-item>
                      </span>
                </el-form>
              </template>1

            </el-table-column>
            <el-table-column label="任务号" prop="id" sortable>
            </el-table-column>
            <el-table-column label="场景" prop="name" sortable>
            </el-table-column>
            <el-table-column label="项目" prop="name" sortable>
            </el-table-column>

            <el-table-column label="描述" prop="desc">
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="创建" name="second">
          <el-row :gutter="20">
            <el-col :span="16">
              <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="角色" prop="characters">
                  <el-select v-model="ruleForm.characters" multiple placeholder="请选择">
                    <el-option
                      v-for="item in ruleForm.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Clusters" prop="Clusters">
                  <el-select v-model="ruleForm.Clusters" multiple placeholder="请选择">
                    <el-option
                      v-for="item in ruleForm.options1"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="Group" prop="Group">
                  <el-select v-model="ruleForm.Group" placeholder="请选择组">
                    <el-option label="superuser" value="superuser"></el-option>
                    <el-option label="operator" value="operator"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="设置组" prop="setGroup">
                  <el-select v-model="ruleForm.setGroup" placeholder="请选择组">
                    <el-option label="superuser" value="superuser"></el-option>
                    <el-option label="operator" value="operator"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="用户名:" prop="username">
                  <el-input v-model.number="ruleForm.username"></el-input>
                </el-form-item>

                <el-form-item label="手机号:" prop="phone">
                  <el-input v-model.number="ruleForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="邮箱:" prop="email">
                  <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>

                <el-form-item label="启用:" prop="switchValue">
                  <el-switch v-model="ruleForm.switchValue" active-color="#13ce66" inactive-color="#ccc">
                  </el-switch>
                </el-form-item>

                <el-form-item label="确认时间:" prop="confirmTime">
                  <el-date-picker v-model="ruleForm.confirmTimeValue" type="datetime" placeholder="选择日期"></el-date-picker>
                </el-form-item>

                <el-form-item label="上次登录时间:" prop="lastLoginTime">
                  <el-date-picker v-model="ruleForm.lastLoginTime" type="datetime" placeholder="选择日期"></el-date-picker>
                </el-form-item>

                <el-form-item label="当前登录时间:" prop="nowLoginTime">
                  <el-date-picker v-model="ruleForm.nowLoginTime" type="datetime" placeholder="选择日期"></el-date-picker>
                </el-form-item>

                <el-form-item label="Theme:" prop="Theme">
                  <el-input v-model="ruleForm.Theme"></el-input>
                </el-form-item>

                <el-form-item label="上次登录IP:" prop="lastLoginIp">
                  <el-input v-model="ruleForm.lastLoginIp"></el-input>
                </el-form-item>

                <el-form-item label="当前登录IP:" prop="nowLoginIp">
                  <el-input v-model="ruleForm.nowLoginIp"></el-input>
                </el-form-item>

                <el-form-item label="语言:" prop="language">
                  <el-input v-model="ruleForm.language"></el-input>
                </el-form-item>

                <el-form-item label="币种:" prop="moneyType">
                  <el-input v-model="ruleForm.moneyType"></el-input>
                </el-form-item>

                <el-form-item label="单价:" prop="unitPrice">
                  <el-input v-model="ruleForm.unitPrice"></el-input>
                </el-form-item>

                <el-form-item label="账户类型:" prop="accountType">
                  <el-input v-model="ruleForm.accountType"></el-input>
                </el-form-item>



                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')" :disabled="dis">保存</el-button>

                  <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-tab-pane>

      </el-tabs>
    </template>

  </div>

</template>

<script>
  export default {
    name: "all-users",

    data() {

      return {
        activeName2: 'first',
        //form表单
        formInline: {
          user: '',
        },


        //data数据
        tableData5: [],
        ruleForm: {
          characters:[],
          Clusters:[],
          Group:'',
          setGroup:'',
          username: '',
          phone: '',
          email: '',
          //启用按钮
          switchValue:false,
          //确认时间
          confirmTimeValue:'',
          //上次登录时间
          lastLoginTime:'',
          //当前登录时间
          nowLoginTime:'',
          Theme: '',
          lastLoginIp: '',
          nowLoginIp: '',
          language: '',
          moneyType: '',
          unitPrice:'',
          accountType:'',
          //多选开始

          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],

          options1: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }],
          //多选结束
        },
        dis:false,


      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      onSubmit() {
        console.log('submit!');
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
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
  #app > div{
  margin: 10px 30px;
 }
</style>
