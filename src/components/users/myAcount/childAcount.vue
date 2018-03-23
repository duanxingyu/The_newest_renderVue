<template>
  <div>
    <h2>子账户管理</h2><br/>
    <div class="btn">

        <el-badge :value="value" class="item">
          <el-button type="primary" size="medium" icon="el-icon-tickets" @click="listCount">列表</el-button>
        </el-badge>

        <el-button type="success" size="medium" icon="el-icon-plus" @click="dialogFormVisible1 = true"
                   style="margin-left: 15px">添加子账号
        </el-button>

    </div>
    <!--添加子账户对话框-->
    <el-dialog width="40%" title="添加子账号" :visible.sync="dialogFormVisible1">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入用户名" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
          <el-input v-model.number="form.phone" placeholder="请输入手机号" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
          <el-select v-model="form.sex" placeholder="请选择性别">
            <el-option label="男" value="man"></el-option>
            <el-option label="女" value="woman"></el-option>
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
    <el-table :data="tableData" sort-by="{tableData.phone}" style="width: 100%;margin-left: 10px;">
      <el-table-column label="用户名" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式" width="180" prop="phone" sortable>
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="账户类型" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.account }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系方式" width="180" sortable>
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="350px">
        <template slot-scope="scope">
          <el-button size="mini" round @click="handleEdit(scope.$index, scope.row),dialogFormVisible2 = true">编辑</el-button>
          <el-button size="mini" round type="info" @click="handleIn(scope.$index, scope.row)">转入</el-button>
          <el-button size="mini" round @click="handleOut(scope.$index, scope.row)">转出</el-button>
          <el-button size="mini" round type="danger" @click="handleDelete(scope.$index, scope.row)">修改密码</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--编辑对话框-->
    <el-dialog width="40%" title="编辑" :visible.sync="dialogFormVisible2">
      <el-form :model="form"  ref="form" >

        <el-form-item label="用户名" prop="name" :label-width="formLabelWidth">
          <el-input v-model="editForms.name" placeholder="请输入用户名" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="phone" :label-width="formLabelWidth">
          <el-input v-model.number="editForms.phone" placeholder="请输入手机号" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="性别" prop="sex" :label-width="formLabelWidth">
          <el-select v-model="editForms.sex" placeholder="请选择性别">
            <el-option label="男" value="man"></el-option>
            <el-option label="女" value="woman"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="密码" prop="password" :label-width="formLabelWidth">
          <el-input v-model="editForms.password" placeholder="请输入密码" type="password" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="editDialog">立即添加</el-button>
      </div>
    </el-dialog>
    <!--编辑对话框结束-->
  </div>
</template>

<script>
  export default {
    name: 'childAcount',
    data() {
      // 验证手机号,自定义验证规则
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
        // 对话框开始
        dialogFormVisible1: false, //激活子账户对话框
        dialogFormVisible2: false, //激活编辑对话框
        checked:false,
        form: {
          name: '',
          phone: null,
          sex: '',
          password: '',
        },
        value:'12',
        formLabelWidth: '15%',

        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          account: '主账户',
          phone: '13331077761',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          phone: '18631077761',
          account: '子账户',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          phone: '13891077761',
          account: '子账户',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          phone: '13561077761',
          account: '主账户',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        rules: {
          name: [{
            required: true,
            message: '请输入用户名',
          }, {
              min: 3,
              max: 5,
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
          }
          ],
          sex: [{
            required: true,
            message: '请选择性别',
          }],
          password: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }],
        },
        //将表格中的数据遍历到子账户对话框中
        editForms:{},
      };

    },
    methods: {
      handleEdit(index, row) {
        this.editForms=row
        console.log(row);

      },
      handleIn(index, row) {
        console.log(index, row);
      },
      handleOut(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      dialogSubmit(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$notify({
              title: '成功',
              message: '修改成功',
              type: 'success'
            });
            this.dialogFormVisible=false
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
      listCount() {
        this.$message('当前列表共 ' + this.value + ' 条数据，已查看');
        this.value = '';
      },
      //点击编辑对话框执行的操作
      editDialog(){

      }
    },

  }
</script>

<style scoped>
  .btn, h2 {
    margin: 10px 10px;
  }
</style>
