<template>
  <div>
    <h2>已完成任务</h2>
    <span>测试Checked:{{multipleSelection}}</span><br/>
    <el-badge :value="12" class="item">
      <el-button type="primary" size="medium" icon="el-icon-tickets">列表</el-button>
    </el-badge>
    <el-button type="primary" size="medium" @click="slectCheckbox" style="margin-left: 15px;"><i
      class="el-icon-download">&nbsp;导出</i></el-button>
    <el-table :data="tableData5" style="width: 100%" :default-sort="{prop: 'date', order: 'descending'}"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="35">
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column label="商品 ID" sortable prop="id">
      </el-table-column>
      <el-table-column label="商品名称" sortable prop="name">
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
  import axios from 'axios'
  import store from '../../store/store'

  export default {
    name: 'completed',
    data() {
      return {
        tableData5: [],
        multipleSelection: []
      }
    },
    created() {
      var url = this.HOST + "/jobs";
      // const obj = axios.create({
      //   // headers: {'Authentication-Token': 'WyIyIiwiJDUkcm91bmRzPTUzNTAwMCROcmphcmV4SnJFUUNiTTZrJEt2c24zckdhdC90OGM4c0VCVHlpNVdZbFNZbFIwMDRiZkREZHc2TEF4bEIiXQ.DYflpQ.1rhB6psfKzZ5aILlInIl254r7DM'}
      //   headers:{
      //     'Authentication-Token': store.state.token
      //   }
      //
      // });
      // console.log(localStorage.token);
      this.$axios.get(url).then(res => {
        console.log(res.headers)
        // console.log(res.data)
        this.tableData5 = res.data
        if (store.state.token) {
          this.$router.push('/completed');
        } else {
          this.$router.replace('/login');
        }
      }).catch(error => {
        console.log(error)
      })
    },
    methods: {
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
      }
    }
  }
</script>
