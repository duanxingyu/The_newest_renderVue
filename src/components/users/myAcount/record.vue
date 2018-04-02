<template>
  <div>
    <h2>消费记录</h2><br/>

    <!--form表单-->
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
      <el-form-item label="起始时间">
        <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="账户">
        <el-input v-model="formInline.account" placeholder="账户"></el-input>
      </el-form-item>

      <el-form-item label="项目">
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">导出</el-button>
      </el-form-item>

    </el-form>

    <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" sort-by="{tableData.name}"
              style="width: 100%;margin-left:10px">
      <el-table-column prop="id" label="id" width="240px" sortable>
      </el-table-column>

      <el-table-column prop="fileName" label="文件名" width="240px" sortable></el-table-column>

      <el-table-column prop="fileSize" label="文件大小" width="240px"></el-table-column>

      <el-table-column prop="date" label="导出时间" width="240px" sortable></el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page.sync="currentPage" :page-sizes="[5,10, 20, 30, 40]"
                   :page-size="this.pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="pages.total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: 'record',
    data() {
      return {
        //form表单
        formInline: {
          account: '',
          project: ''
        },

        options: [
          {
            value: '123456789'
          }
        ],
        value6: '',
        value7: '',
        tableData: [],
        value: '',
        currentPage: 1,
        pageSize: 10,
        pages: {},
        // per_page:50,
        // page:1
        // page:null

      }
    },

    created() {
      this.getData();
    },
    methods: {
      onSubmit() {
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

      //通过此方法将分页数据渲染出来
      getData() {
        // var recordUrl = this.HOST + '/record';
        // this.$axios.get().then(res => {
        //   console.log(res.data);
        //   this.pages = res.data;
        //   this.tableData = res.data.items
        //   console.log(res.data.items)
        // }).catch(error => {
        //   console.log(error);
        // })
      }
    }
  }
</script>

<style scoped>
  h2, form, .el-pagination {
    margin: 10px 10px;
  }
</style>
