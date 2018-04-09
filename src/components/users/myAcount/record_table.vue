<template id="record_table">
  <el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
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
</template>

<script>

  export default {
    name: "record_table",
    data() {
      return {
        currentPage: 1,
        pageSize: 10,
        pages: {},
      }
    }
  };
</script>

<style scoped>

</style>
