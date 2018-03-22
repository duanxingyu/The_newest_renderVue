<template>
  <div>
    <h2>设置组</h2>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">

      <el-tab-pane label="列表(23)" name="first">

        <el-table :data="tableData" sort-by="{tableData.key}" align="header-align"
                  @selection-change="handleSelectionChange" style="width: 100%;margin-left: 10px;">

          <el-table-column label="Key" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.key }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Description" width="180" prop="Description" sortable>
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.desc }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="350px">
            <template slot-scope="scope">
              <el-button size="mini" round icon="el-icon-edit" type="success"
                         @click="handleEdit(scope.$index, scope.row),dialogFormVisible=true" title="编辑"></el-button>
              <el-button size="mini" round icon="el-icon-delete" type="danger"
                         @click="handleDelete(scope.$index, scope.row)" title="删除"></el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="创建" name="second">
        <el-row :gutter="20">
          <el-col :span="16">
            <el-form :model="form" ref="form" label-width="100px" class="demo-ruleForm">
              <el-form-item label="Key:" prop="key" :rules="{required:true,trigger:'blur',message:'该字段不能为空'}">
                <el-input v-model="form.key"></el-input>
              </el-form-item>

              <el-form-item label="Description:" prop="desc" :rules="{required:true,trigger:'blur',message:'该字段不能为空'}">
                <el-input v-model="form.desc"></el-input>
              </el-form-item>

              <el-form-item label="Settings  :" prop="settings" >
                <el-form :model="settingForm" v-for="(domain,index) in settingForm.domains" :label="'Settings'+index"
                         :key="domain.key" :prop="'domains.'+index+'.value'"
                         label-width="100px"  class="settingForm">
                  <h3>新增Settings</h3>
                  <el-form-item label="Key  :" prop="key"  :rules="{required:true,trigger:'blur',message:'该字段不能为空'}">
                    <el-input v-model="settingForm.key"></el-input>
                  </el-form-item>

                  <el-form-item label="Value  :" prop="value" :rules="{required:true,trigger:'blur',message:'该字段不能为空'}">
                    <el-input v-model="settingForm.value"></el-input>
                  </el-form-item>

                  <el-form-item label="Name  :" prop="name" :rules="{required:true,trigger:'blur',message:'该字段不能为空'}">
                    <el-input v-model="settingForm.name"></el-input>
                  </el-form-item>

                  <el-form-item label="Description:" prop="description" :rules="{required:true,trigger:'blur',message:'该字段不能为空'}">
                    <el-input v-model="settingForm.description"></el-input>
                  </el-form-item>

                  <el-form-item label="Value Type:" prop="valueType" :rules="{required:true,trigger:'blur',message:'该字段不能为空'}">
                    <el-input v-model="settingForm.valueType"></el-input>
                  </el-form-item>

                  <el-button type="danger" @click.prevent="removeDomain(domain)">删除Settings</el-button>

                </el-form>

                <el-form-item>
                  <el-button type="success" @click="addDomain">增加Settings</el-button>
                </el-form-item>

              </el-form-item>


              <el-form-item>
                <el-button type="primary" @click="submitForm('form')" :disabled="dis">保存</el-button>
                <el-button @click="resetForm('form')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-tab-pane>

      <!--对话框-->
      <el-dialog width="40%" title="编辑" :visible.sync="dialogFormVisible">
        <el-form :model="form" ref="form">
          <el-form-item label="Users" prop="user" :label-width="formLabelWidth">
            <el-input auto-complete="off" v-model="forms.user"></el-input>
          </el-form-item>

          <el-form-item label="DI User Name" prop="DIUserName" :label-width="formLabelWidth">
            <el-input auto-complete="off" v-model="forms.DIUserName"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogSubmit">保存</el-button>
        </div>
      </el-dialog>
      <!--对话框结束-->
    </el-tabs>

  </div>
</template>

<script>
  export default {
    name: "setGroup",
    data() {
      return {
        dis: false,
        dialogFormVisible: false,
        form: {
          key: '',
          desc: '',
          settings: ''
        },
        formLabelWidth: '15%',
        activeName2: 'first',

        multipleSelection: [],
        tableData: [{
          key: 'Jack',
          desc: '12121212121'
        }, {
          key: 'Heny',
          desc: '42892-02'
        }],
        forms: {},

        settingForm: {
          domains: [{
            value:''
          }],
          key: '',
          value: '',
          name: '',
          description: '',
          valueType: ''
        },

      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var addArr = {
              key: this.form.key,
              desc: this.form.desc
            };
            this.tableData.push(addArr)
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
            //提交之后清空表单
             this.form.key='',
             this.form.desc=''
            // this.form.user='',
            //   this.form.DIUserName=''
            // this.dis = !this.dis
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log(val);
      },
      handleEdit(index, row) {
        this.forms = row
        console.log(row);

      },
      handleDelete(index, row) {
        this.tableData.splice(index, 1);

        console.log(index, row);
      },
      dialogSubmit() {
        //新增
        // var addArr={
        //   'user':this.form.user,
        //   'DIUserName':this.form.DIUserName
        // };
        // this.tableData.push(addArr)
        this.forms.user = this.forms.user
        this.forms.DIUserName = this.forms.DIUserName
        this.dialogFormVisible = false
        // console.log(item);
      },
      addDomain() {
        this.settingShow=true
        this.settingForm.domains.push({
          value: '',
          key: Date.now()
        });

      },
      removeDomain(item) {
        var index = this.settingForm.domains.indexOf(item)
        if (index !== -1) {
          this.settingForm.domains.splice(index, 1)
        }
      },
    }
  }
</script>

<style scoped>
  #app > div {
    margin: 10px 30px;
  }

  h2 {
    margin-bottom: 10px;
  }

  .deleteClass {
    margin-left: 10px;
  }

  .settingForm {
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    padding: 20px 20px;
    margin-bottom: 20px;
  }

  h3 {
    padding-bottom: 10px;
  }
  .el-form-item{
    margin:20px 0px;
  }
</style>
