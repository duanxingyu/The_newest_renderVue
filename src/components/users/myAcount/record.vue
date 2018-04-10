<template>
  <div>
    <h2>消费记录</h2><br/>

    <!--form表单-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-input type="hidden" v-model="formInline.user_id" placeholder="user_id"></el-input>

      <el-form-item label="起始时间">
        <el-date-picker v-model="formInline.submit_date" type="daterange" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期" format="yyyy-MM-dd"  value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="账户">
        <el-select v-model="formInline.account_name" placeholder="请选择">
          <el-option v-for="item in accountOptions" :key="item[0]" :label="item[1]" :value="item[0]">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="项目">
        <el-select v-model="formInline.project_name" placeholder="请选择">
          <el-option v-for="item in projectOptions" :key="item[0]" :label="item[1]" :value="item[0]">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">导出</el-button>
      </el-form-item>

    </el-form>

    <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" sort-by="{tableData.name}"
              style="width: 100%;margin-left:10px">
      <el-table-column prop="_id" label="id" sortable >
      </el-table-column>

      <el-table-column prop="filename" label="文件名" sortable width="450"></el-table-column>

      <el-table-column prop="length" label="文件大小" width="200"></el-table-column>

      <el-table-column prop="date" label="导出时间"  sortable></el-table-column>

      <el-table-column  label="操作" >
        <template slot-scope="scope">

            <el-button size="mini"  type="success" icon="el-icon-download" @click="download(scope.row)" title="下载"></el-button>

            <el-button size="mini"  type="danger" icon="el-icon-delete" @click="deleted(scope.row)" title="删除"></el-button>
        </template>

      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page.sync="currentPage" :page-sizes="[5,10, 20, 30, 40]"
                   :page-size="this.pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="this.tableData.length">
    </el-pagination>
  </div>
</template>

<script>
  import axios from 'axios'
  import store from '../../../store/store'
  export default {
    name: 'record',
    data() {
      return {
        //form表单
        formInline: {
          user_id:null,
          account_name: '',
          project_name: '',
          submit_date:'',
        },

        accountOptions: [],
        projectOptions:[],
        value7: '',
        // show:false,
        tableData: [],
        value: '',
        currentPage: 1,
        pageSize: 10,
        pages: {},
        downloads:{
          date:'',
          filename:'',
          length:'',
          _id:'',
        },
        deletions:{
          date:'',
          filename:'',
          length:'',
          _id:'',
        }
        // per_page:50,
        // page:1
        // page:null

      }
    },

    created() {
      this.getData();
    },

    methods: {
      //下载按钮
      download(row){
        console.log(row);
        this.downloads=row
        this.getDownload();
        // let url=this.HOST+'/expense_export';
        // window.open(url + '/' + this.downloads._id);
      },
      //删除按钮
      deleted(row){
      this.deletions=row;
        console.log(row);
      this.postDeletd();
      },
      //导出按钮
      onSubmit() {
        if(this.formInline.submit_date==='') {
          this.$message.warning('请选择起始时间');
        }else{
          this.postData();
        }
        console.log('submit!');
      },
      handleSizeChange(size) {
        this.pageSize = size
        // this.fetchPapers();
        console.log(`每页 ${size} 条`);
      },

      handleCurrentChange(currentPage) {
        this.currentPage = currentPage
        // this.getData();
        console.log(`当前页: ${currentPage}`);
      },

      //获取表单数据以及表格数据
      getData() {
        let url = this.HOST + '/expense_export';
        this.$axios.get(url).then(res => {
          this.accountOptions = res.data.data.account_list;
          this.projectOptions=res.data.data.project_list;
          this.tableData=res.data.data.file_info;
          console.log(res.data);
        }).catch(error => {
          console.log(error);
        })
      },
      //导出表单数据
      postData(){
        let url = this.HOST + '/expense_export';
        let arr=this.accountOptions;
        let userIds;
        // console.log(this.accountOptions);
        for(var i=0; i<arr.length; i++){
          // userIds=(arr[i][0]);
          console.log(arr[i][0]);
        }

        this.$axios.post(url, {
          operate: 'export',
          export_data:{
            user_id:arr[i][0],
            project_name:this.formInline.project_name,
            start_date:this.formInline.submit_date[0],
            end_date:this.formInline.submit_date[1]
          }
        }).then(res=>{
          // console.log(arr[i][0]);
          if(res.data.code===1) {
            this.$message.error(`${res.data.msg}`);
          }else {
            this.$message.success(`${res.data.msg}`);
          }
          console.log(res);
        }).catch(error=>{
          console.log(error);
        });
      },
      //下载数据操作
      getDownload(){
        let url = this.HOST + '/expense_download';
        let objectUrl = url+'/'+this.downloads._id;
        window.open(objectUrl);
      },
      //删除数据操作
      postDeletd(){
        var url = this.HOST + '/expense_export';
        let params_post={
          operate: 'remove',
          file_id: this.deletions._id,
        }
        this.$axios.post(url,params_post).then(res => {

          if(res.data.code===1){
            this.$message.error(`${res.data.msg}`);
          }else{
            this.$message.success(`${res.data.msg}`);
          }
          console.log(res.data);
        }).catch(error=>{
          console.log(error);
        })
      },
    }
  }
</script>

<style scoped>
  h2, form, .el-pagination {
    margin: 10px 10px;
  }
  #main{
    padding-bottom: 50px;
  }
</style>
