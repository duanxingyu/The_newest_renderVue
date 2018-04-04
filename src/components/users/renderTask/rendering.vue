<template>
  <div>
    <h2>正在渲染任务</h2><br/>
    <span>测试Checked:{{multipleSelection}}</span><br/>
    <div class="btn">

      <el-badge :value="pages.total" :max="99" :is-dot="true" class="item">
        <el-button type="primary" size="medium" icon="el-icon-tickets" @click="listCount">列表</el-button>
      </el-badge>

      <el-button-group style="margin-left: 20px;">
        <el-button type="primary" size="medium" @click="export2Excel"><i class="el-icon-download">&nbsp;导出</i>
        </el-button>
        <el-button type="primary" size="medium" @click="removeCheckbox"><i class="el-icon-delete">&nbsp;移除</i>
        </el-button>
        <el-button type="primary" size="medium" @click="resumeCheckbox"><i class="el-icon-refresh">&nbsp;恢复</i>
        </el-button>
        <el-button type="primary" size="medium" @click="speedupCheckbox"><i class="el-icon-time">&nbsp;全速</i></el-button>
        <el-button type="primary" size="medium" @click="suspendCheckbox"><i
          class="el-icon-caret-left el-icon-caret-right">&nbsp;暂停</i>
        </el-button>
      </el-button-group>

      <br/>
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
                        end-placeholder="结束日期"  format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>

      <el-form-item>
        <el-button type="primary"  @click="onSubmit">查询</el-button>
      </el-form-item>

    </el-form>

    <el-table :data="tableData5" ref="multipleTable" style="width: 100%;margin-left: 10px;"
              @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="35" v-model="multipleSelection"></el-table-column>
      <el-table-column type="expand" show-overflow-tooltip>
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


      <el-table-column label="任务号" prop="id" sortable></el-table-column>
      <el-table-column label="场景" prop="scene" sortable show-overflow-tooltip></el-table-column>
      <el-table-column label="项目" prop="project_name" sortable></el-table-column>
      <el-table-column label="提交时间" prop="SubmitDate" sortable></el-table-column>
      <el-table-column label="状态" prop="Status" sortable></el-table-column>


    </el-table>

    <el-pagination @size-change="sizeChange" @current-change="currentChange"
                   :current-page.sync="currentPage" :page-sizes="[5,10,20,40,80]"
                   :page-size="pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="pages.total">
    </el-pagination>
    <!--:page-size="this.pageSize"-->
    <!--layout="total, sizes, prev, pager, next, jumper"-->
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
  import store from '../../../store/store'

  export default {
    name: "rendering",
    data() {
      return {
        //form表单
        formInline: {
          id: null,
          scene: '',
          project_name: '',
          submit_date: '' ,

        },
        //单选框
        checked: false,
        // loading:true,

        SubmitDate: '',
        value7: '',
        //data数据
        tableData5: [],
        multipleSelection: [],
        currentPage: 1,
        pageSize: 10,
        pages: {},
        // per_page:null,
        // page:null
      }
    },
    //通过vue中created钩子函数，将api数据渲染出来
    created() {
      this.getData();
      // this.postData();
    },
    methods: {
      onSubmit() {
        // console.log(this.formInline.submit_date);
        this.getData();

      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
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
      getData() {
        console.log('submit!');
        var arr=this.formInline.submit_date;
        let multis = [];
        for (var i=0;i<arr.length;i++){
          multis.push(arr[i]);
          // console.log(multis[0],multis[1])
        }
        var url = this.HOST + "/job";
        this.$axios.get(url, {
          params: {
            page: this.currentPage,
            per_page: this.pageSize,
            status: 1,
            job_id: this.formInline.id,
            scene: this.formInline.scene,
            project_name: this.formInline.project_name,
            submit_date: multis,
          }

        }).then(res => {
          console.log(res.data);
          this.tableData5 = res.data.data;
          this.pages = res.data;
          if (store.state.token) {
            this.$router.push('/rendering');
          } else {
            this.$router.replace('/login');
          }
        }).catch(error => {
          console.log(error)
        });
      },
      //移除任务
      removeData(){
        var arr=this.multipleSelection;
        let multis = [];
        for (var i=0;i<arr.length;i++){
          multis.push(arr[i].id);
          console.log(multis)
        }
        var url = this.HOST + "/job";
        this.$axios.post(url,{
          operate:'remove',
          job_ids:multis
        }).then(rs=>{
          if(multis.length!==null){
            this.$message.success("操作成功")
          }else{
            this.$message.error("操作失败")
          }
          console.log(rs);
        })
        this.$refs.multipleTable.clearSelection();
      },
      //恢复任务
      resumeData(){
        var arr=this.multipleSelection;
        let multis = [];
        for (var i=0;i<arr.length;i++){
          multis.push(arr[i].id);
          console.log(multis)
        }
        var url = this.HOST + "/job";
        this.$axios.post(url,{
          operate:'resume',
          job_ids:multis
        }).then(rs=>{
          if(multis.length!==null){
            this.$message.success("操作成功")
          }else{
            this.$message.error("操作失败")
          }
          console.log(rs);
        })
        this.$refs.multipleTable.clearSelection();
      },
      //全速
      speedupData(){
        var arr=this.multipleSelection;
        let multis = [];
        for (var i=0;i<arr.length;i++){
          multis.push(arr[i].id);
          console.log(multis)
        }
        var url = this.HOST + "/job";
        this.$axios.post(url,{
          operate:'speedup',
          job_ids:multis
        }).then(rs=>{
          if(multis.length!==null){
            this.$message.success("操作成功")
          }else{
            this.$message.error("操作失败")
          }
          console.log(rs);
        })
        this.$refs.multipleTable.clearSelection();
      },
      //暂停任务
      suspendData(){
        var arr=this.multipleSelection;
        let multis = [];
        for (var i=0;i<arr.length;i++){
          multis.push(arr[i].id);
          console.log(multis)
        }
        var url = this.HOST + "/job";
        this.$axios.post(url,{
          operate:'suspend',
          job_ids:multis
        }).then(rs=>{
          if(multis.length!==null){
            this.$message.success("操作成功")
          }else{
            this.$message.error("操作失败")
          }
          console.log(rs);
        })
        this.$refs.multipleTable.clearSelection();
      },

      //导出表格
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      export2Excel() {
        if (this.multipleSelection.length) {
          require.ensure([], () => {
            const {export_json_to_excel} = require('../../../vendor/Export2Excel');
            const tHeader = ['任务号', '场景', '项目', '提交时间', '状态', '开始时间', '完成时间', '帧范围', '等待', '渲染中', '已完成', '失败', '总时间', '总费用']; //对应表格输出的title
            const filterVal = ['id', 'scene', 'project_name', 'SubmitDate', 'Status', 'StartDate', 'FinishDate', 'Frames', 'QueuedChunks', 'RenderingChunks', 'CompletedChunks', 'FailedChunks', 'TotalTaskTime', 'amount']; // 对应表格输出的数据
            const list = this.multipleSelection;
            const data = this.formatJson(filterVal, list);
            export_json_to_excel(tHeader, data, '正在渲染任务'); //对应下载文件的名字
          })

        } else {
          this.$message({
            message: '请至少勾选一项，再进行操作',
            type: 'warning'
          });

        }
      },
      //移除选择框操作
      removeCheckbox() {
        if (this.multipleSelection.length === 0) {
          this.$message({
            message: '请至少勾选一项，再进行操作',
            type: 'warning'
          });
        } else {
          this.removeData();
        }
      },
      //恢复选择框
      resumeCheckbox() {
        if (this.multipleSelection.length === 0) {
          this.$message({
            message: '请至少勾选一项，再进行操作',
            type: 'warning'
          });
        } else {
          this.resumeData();
        }
      },
      //全速选择框
      speedupCheckbox() {
        if (this.multipleSelection.length === 0) {
          this.$message({
            message: '请至少勾选一项，再进行操作',
            type: 'warning'
          });
        } else {
          this.speedupData();
        }
      },
      // 暂停选择框
      suspendCheckbox() {
        if (this.multipleSelection.length === 0) {
          this.$message({
            message: '请至少勾选一项，再进行操作',
            type: 'warning'
          });
        } else {
          this.suspendData();
          this.$message({
            message: '已成功选中',
            type: 'success'
          });
        }
      },
      listCount() {
        this.$message('当前列表共' + this.pages.total + '条数据，已查看');
        // this.pages.total = '';
      },

    },
  }
</script>
<style scoped>
  #main > div > form {
    margin-top: 20px;
  }

  h2, .btn, .el-pagination, form {
    margin: 10px 10px;
  }

</style>
