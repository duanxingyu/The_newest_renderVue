<template>
  <div>
    <h2>已完成任务</h2>
    <span>测试Checked:{{multipleSelection}}</span><br/>
    <div class="btn">
      <el-badge :value="pages.total" :max="99" :is-dot="true" class="item">
        <el-button type="primary" size="medium" icon="el-icon-tickets" @click="listCount">列表</el-button>
      </el-badge>
      <el-button type="primary" size="medium" @click="export2Excel" style="margin-left: 20px;"><i
        class="el-icon-download">&nbsp;导出</i></el-button>
    </div>

    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="任务号">
        <el-input v-model="formInline.id"  placeholder="任务号"></el-input>
      </el-form-item>

      <el-form-item label="场景">
        <el-input v-model="formInline.scene"  placeholder="场景"></el-input>
      </el-form-item>

      <el-form-item label="项目">
        <el-input v-model="formInline.project_name" placeholder="项目"></el-input>
      </el-form-item>

      <el-form-item label="提交时间">
        <el-date-picker v-model="formInline.submit_date" type="daterange" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期"  format="yyyy-MM-dd"  value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"  @click="onSubmit">查询</el-button>
      </el-form-item>

    </el-form>

    <el-table :data="tableData5" ref="multipleTable" style="width: 100%;margin-left: 10px;"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="35" v-model="multipleSelection"></el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">

            <el-form-item label="开始时间">
              <span>{{ props.row.StartDate}}</span>
            </el-form-item>

            <el-form-item label="完成时间">
              <span>{{ props.row.FinishDate }}</span>
            </el-form-item>

            <el-tooltip class="item" effect="light" placement="bottom-start">
              <div slot="content"
                   style="overflow:hidden;white-space: normal;word-wrap: break-word;-ms-word-break: break-all;word-break: break-all;">
                {{props.row.Frames}}
              </div>
              <el-form-item label="帧范围" style="overflow: hidden;white-space: nowrap">
                <span>{{ props.row.Frames }}</span>
              </el-form-item>
            </el-tooltip>

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

      <el-table-column label="任务号" prop="id" sortable width="180"></el-table-column>
      <el-table-column label="场景" prop="scene" sortable ></el-table-column>
      <el-table-column label="项目" prop="project_name" sortable width="220"></el-table-column>
      <el-table-column label="提交时间" prop="SubmitDate" sortable></el-table-column>
      <el-table-column label="状态" prop="Status" sortable></el-table-column>


    </el-table>

    <el-pagination @size-change="sizeChange" @current-change="currentChange"
                   :current-page.sync="currentPage" :page-sizes="[5,10,20,40,80]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="pages.total">
      <!--<span>第{{currentPage}}/{{pages.pages}}</span>-->
    </el-pagination>
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
        formInline: {
          id: null,
          scene: '',
          project_name: '',
          submit_date: [] ,


        },
        tableData5: [],
        multipleSelection: [],
        currentPage: 1,
        pageSize: 10,
        pages:{}
      }
    },
    created() {
      this.getData();
    },
    methods: {
      onSubmit() {
        console.log('submit!');
        console.log(this.formInline.submit_date);
        this.getData();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      listCount() {
        this.$message('当前列表共' + this.pages.total + '条数据，已查看');
      },
      sizeChange(size) {
        this.pageSize = size
        this.getData();
        console.log(`每页 ${size} 条`);
      },

      currentChange(currentPage) {
        this.currentPage = currentPage
        this.getData();
        console.log(`当前页: ${currentPage}`);
      },
      getData(){
        var url = this.HOST + "/job";
        this.$axios.get(url,{
          params:{
            page:this.currentPage,
            per_page:this.pageSize,
            status:4,
            job_id: this.formInline.id,
            scene: this.formInline.scene,
            project_name: this.formInline.project_name,
            submit_date1: this.formInline.submit_date[0],
            submit_date2: this.formInline.submit_date[1],
          }
        }).then(res => {
          console.log(res.data)
          this.tableData5 = res.data.data
          this.pages=res.data
          if (store.state.token) {
            this.$router.push('/completed');
          } else {
            this.$router.replace('/login');
          }
        }).catch(error => {
          console.log(error)
        })
      },
      //导出表格
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      export2Excel() {
        if (this.multipleSelection.length) {
          import('@/vendor/Export2Excel').then(excel => {
            const tHeader = ['任务号', '场景', '项目', '提交时间', '状态','开始时间','完成时间','帧范围','等待','渲染中','已完成','失败','总时间','总费用']; //对应表格输出的title
            const filterVal = ['id', 'scene', 'project_name', 'SubmitDate', 'Status','StartDate','FinishDate','Frames','QueuedChunks','RenderingChunks','CompletedChunks','FailedChunks','TotalTaskTime','amount']; // 对应表格输出的数据
            const list = this.multipleSelection;
            const data = this.formatJson(filterVal, list)
            excel.export_json_to_excel(tHeader, data, '已完成')
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
