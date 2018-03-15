<template>
    <div>
        <h2>子账户管理</h2><br/>
      <el-badge :value="12" class="item">
        <el-button type="primary" size="medium" icon="el-icon-tickets" >列表</el-button>
      </el-badge>

      <el-button type="success" size="medium" icon="el-icon-plus" @click="dialogFormVisible = true" style="margin-left: 15px">添加子账号</el-button>

      <!--对话框-->
      <el-dialog width="40%" title="添加子账号" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="用户名" :label-width="formLabelWidth">
            <el-input v-model="form.name" placeholder="请输入用户名" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="form.phone" placeholder="请输入手机号" auto-complete="off"></el-input>
          </el-form-item>

          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select v-model="form.sex" placeholder="请选择性别">
              <el-option label="男" value="man"></el-option>
              <el-option label="女" value="woman"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="密码"  :label-width="formLabelWidth">
            <el-input v-model="form.password" placeholder="请输入密码" type="password" auto-complete="off"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">立即添加</el-button>
        </div>
      </el-dialog>


      <el-table :data="tableData" sort-by="{tableData.phone}" style="width: 100%">

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
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="info" @click="handleIn(scope.$index, scope.row)">转入</el-button>
                    <el-button size="mini" @click="handleOut(scope.$index, scope.row)">转出</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">修改密码</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: 'childAcount',
        data() {
            return {
              // 对话框开始
              dialogFormVisible: false,
              form: {
                name: '',
                phone:'',
                sex: '',
                password:'',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
              },
              formLabelWidth: '15%',
              // 对话框结束
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    account:'主账户',
                    phone:'13331077761',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    phone:'18631077761',
                    account:'子账户',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    phone:'13891077761',
                    account:'子账户',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    phone:'13561077761',
                    account:'主账户',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        },
        methods: {
            handleEdit(index, row) {
                console.log(index, row);

            },
          handleIn(index,row) {
            console.log(index, row);
          },
          handleOut(index,row) {
            console.log(index, row);
          },
            handleDelete(index, row) {
                console.log(index, row);
            }
        }
    }
</script>

<style>

</style>
