<template>
  <div>
    <h2>销售人员</h2>

    <template>
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="列表(45)" name="first">
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

      </el-tabs>
    </template>

  </div>

</template>

<script>
  export default {
    name: "salesMan",

    data() {

      return {
        activeName2: 'first',
        //form表单
        formInline: {
          user: '',
          region: ''
        },


        //data数据
        tableData5: [],

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
