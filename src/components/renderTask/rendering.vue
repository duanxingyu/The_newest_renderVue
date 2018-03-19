<template>
  <div>
    <h2>正在渲染任务</h2><br/>
    <span>测试Checked:{{multipleSelection}}</span><br/>
    <div class="btn">
    <el-badge :value="this.value" class="item">
      <el-button type="primary" size="medium" icon="el-icon-tickets" @click.once="listCount">列表</el-button>
    </el-badge>
    <el-button-group style="margin-left: 15px;">
      <el-button type="primary" size="medium" @click="slectCheckbox"><i class="el-icon-download">&nbsp;导出</i>
      </el-button>
      <el-button type="primary" size="medium" @click="slectCheckbox"><i class="el-icon-delete">&nbsp;移除</i></el-button>
      <el-button type="primary" size="medium" @click="slectCheckbox"><i class="el-icon-refresh">&nbsp;恢复</i></el-button>
      <el-button type="primary" size="medium" @click="slectCheckbox"><i class="el-icon-time">&nbsp;全速</i></el-button>
      <el-button type="primary" size="medium" @click="slectCheckbox"><i class="el-icon-caret-left el-icon-caret-right">&nbsp;停止</i>
      </el-button>
    </el-button-group>
    <br/>
    </div>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="任务号">
        <el-input v-model="formInline.user" placeholder="任务号"></el-input>
      </el-form-item>
      <el-form-item label="场景">
        <el-input v-model="formInline.user" placeholder="场景"></el-input>
      </el-form-item>
      <el-form-item label="项目">
        <el-input v-model="formInline.user" placeholder="项目"></el-input>
      </el-form-item>
      <el-form-item label="提交时间">
        <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>

      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="checked">筛选失败帧</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>

    <el-table :data="tableData5" sort-by="{tableData5.id}" ref="multipleTable" style="width: 100%;margin-left: 10px;"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="35" v-model="multipleSelection">
      </el-table-column>
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
        </template>

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



  </div>
</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<script>
  import store from '../../store/store'

  export default {
    name: "rendering",
    data() {
      return {
        //form表单
        formInline: {
          user: '',
          region: ''
        },
        value: '15',
        //单选框
        checked: false,
        // loading:true,
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value6: '',
        value7: '',
        //data数据
        tableData5: [],
        multipleSelection: [],

      }
    },
    created() {
      var url = this.HOST + "/info";
      // console.log(localStorage.token);
      this.$axios.get(url).then(res => {
        // console.log(res.data)
        this.tableData5 = res.data
        if (store.state.token) {
          this.$router.push('/rendering');
        } else {
          this.$router.replace('/login');
        }
      }).catch(error => {
        console.log(error)
      });

    },
    methods: {
      onSubmit() {
        console.log('submit!');
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      slectCheckbox() {
        if (this.multipleSelection.length === 0) {
          this.$message({
            message: '请至少勾选一项，再进行操作',
            type: 'warning'
          });
        } else {
          this.$message({
            message: '已成功选中',
            type: 'success'
          });
        }
      },
      listCount() {
        this.$message('当前列表共' + this.value + '条数据，已查看');
        this.value = '';
      },

    },
  }
</script>
<style scoped>
  #main > div > form {
    margin-top: 20px;
  }
  h2,.btn,.el-pagination,form{
    margin: 10px 10px;
  }
</style>
