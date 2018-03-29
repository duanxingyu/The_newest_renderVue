<template>
  <div>
    <h2>已完成任务</h2>
    <span>测试Checked:{{multipleSelection}}</span><br/>
    <div class="btn">
      <el-badge :value="value" class="item">
        <el-button type="primary" size="medium" icon="el-icon-tickets" @click.once="listCount">列表</el-button>
      </el-badge>
      <el-button type="primary" size="medium" @click="export2Excel" style="margin-left: 15px;"><i
        class="el-icon-download">&nbsp;导出</i></el-button>
    </div>
    <el-table :data="tableData5" style="width: 100%;margin-left: 10px" ref="multipleTable"
              :default-sort="{prop: 'date', order: 'descending'}"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="35"></el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="开始时间">
              <span>{{ props.row.StartDate}}</span>
            </el-form-item>

            <el-form-item label="完成时间">
              <span>{{ props.row.FinishDate }}</span>
            </el-form-item>

            <el-form-item label="帧范围">
              <span>{{ props.row.Frames }}</span>
            </el-form-item>

            <el-form-item label="等待">
              <span>{{props.row.QueuedChunks }}</span>
            </el-form-item>

            <el-form-item label="渲染中">
              <span>{{props.row.RenderingChunks }}</span>
            </el-form-item>

            <el-form-item label="已完成">
              <span>{{props.row.CompletedChunks }}</span>
            </el-form-item>

            <el-form-item label="失败">
              <span>{{props.row.FailedChunks }}</span>
            </el-form-item>

            <el-form-item label="总时间">
              <span>{{props.row.TotalTaskTime }}</span>
            </el-form-item>

            <el-form-item label="总费用">
              <span>{{props.row.amount }}元</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column label="任务号" prop="id" sortable></el-table-column>
      <el-table-column label="场景" prop="scene" sortable></el-table-column>
      <el-table-column label="项目" prop="project_name" sortable></el-table-column>
      <el-table-column label="提交时间" prop="SubmitDate" sortable></el-table-column>
      <el-table-column label="状态" prop="Status" sortable></el-table-column>
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
  import store from '../../../store/store'

  export default {
    name: 'completed',
    data() {
      return {
        tableData5: [],
        multipleSelection: [],
        value:'34',
      }
    },
    created() {
      var url = this.HOST + "/job";
      // const obj = axios.create({
      //   // headers: {'Authentication-Token': 'WyIyIiwiJDUkcm91bmRzPTUzNTAwMCROcmphcmV4SnJFUUNiTTZrJEt2c24zckdhdC90OGM4c0VCVHlpNVdZbFNZbFIwMDRiZkREZHc2TEF4bEIiXQ.DYflpQ.1rhB6psfKzZ5aILlInIl254r7DM'}
      //   headers:{
      //     'Authentication-Token': store.state.token
      //   }
      //
      // });
      // console.log(localStorage.token);
      this.$axios.get(url,'zhuangtai').then(res => {
        // console.log(res.headers)
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
      listCount() {
        this.$message('当前列表共' + this.value + '条数据，已查看');
        this.value = '';
      },
      //导出表格
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      export2Excel() {
        if (this.multipleSelection.length) {
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
            const filterVal = ['id', 'name', 'number', 'shopId', 'desc']
            const list = this.multipleSelection
            const data = this.formatJson(filterVal, list)
            excel.export_json_to_excel(tHeader, data, 'table')
            this.$refs.multipleTable.clearSelection()
          })

        } else {
          this.$message({
            message: '请至少勾选一项，再进行操作',
            type: 'warning'
          });

        }
      },
    }
  }
</script>
<style scoped>
  h2, .btn, .el-pagination, form {
    margin: 10px 10px;
  }
</style>
