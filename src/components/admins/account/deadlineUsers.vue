<template>
  <div>
    <h2>DeadlineUsers</h2>
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="列表(23)" name="first">
        <el-table :data="tableData" sort-by="{tableData.DIUserName}" align="header-align" style="width: 100%;margin-left: 10px;">
          <el-table-column type="selection" width="35" v-model="multipleSelection">

          </el-table-column>

          <el-table-column label="User" width="180">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.user }}</span>
            </template>
          </el-table-column>
          <el-table-column label="Dl User Name" width="180" prop="DIUserName" sortable>
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.DIUserName }}</span>
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
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="Users:" prop="user">
                <el-select v-model="form.user" multiple placeholder="请选择">
                  <el-option
                    v-for="item in ruleForm.options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>


              <el-form-item label="Dl User Name  :" prop="DIUserName">
                <el-input v-model="form.DIUserName"></el-input>
              </el-form-item>


              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')" :disabled="dis">保存</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
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
    name: "deadlineUsers",
    data() {
      return {
        dis:false,
        dialogFormVisible: false,
        form: {
          user: '',
          DIUserName: ''
        },
        formLabelWidth: '15%',
        activeName2: 'first',
        ruleForm: {
          users: [],
          name: '',
          description: '',
          options: [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }]
        },
        multipleSelection: [],
        tableData: [{
          user: 'Jack',
          DIUserName: '12121212121'
        }, {
          user: 'Heny',
          DIUserName: '42892-02'
        }],
        forms: {}

      }
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var addArr={
              user:this.form.user,
              DIUserName:this.form.DIUserName
            };
            this.tableData.push(addArr)
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
            // this.form.user='',
            //   this.form.DIUserName=''
            this.dis=!this.dis
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


      }
    }
  }
</script>

<style scoped>
  #app > div {
    margin: 10px 30px;
  }
</style>
