<template>
    <div>
        <h2>代金券</h2><br />
      <router-link to="/reCharge"><el-button type="primary" size="medium">充值代金券</el-button></router-link>
        <el-table :data="tableData" stripe  style="margin-left: 10px">
            <el-table-column prop="coupon_code" label="代金券号码"  sortable>
            </el-table-column>
            <el-table-column prop="par" label="面值" >
            </el-table-column>
            <el-table-column prop="recharge_time" label="充值时间"  sortable >
            </el-table-column>
        </el-table>

      <el-pagination @size-change="sizeChange" @current-change="currentChange"
                     :current-page.sync="currentPage" :page-sizes="[5,10,20,40,80]"
                     :page-size="pageSize"
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="pages.total">
      </el-pagination>
    </div>
</template>

<script>
    export default {
        name: 'crash',
        data() {
            return {
                tableData: [],
                currentPage: 1,
                pageSize: 10,
                pages: {},
            }
        },
      created(){
          this.getData();
      },
      methods:{
          //获取表格数据
          getData(){
            var url = this.HOST + '/coupon';
            this.$axios.get(url,{
              params:{
                page:this.currentPage,
                per_page:this.pageSize
              }
            }).then(res=>{
              this.tableData=res.data.data;
              this.pages=res.data;
              console.log(res.data);
            }).catch(error=>{
              console.log(error);
            })
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
      }
    }
</script>

<style scoped>
  #main > div > button > span > a{
    color: #fff;
  }
  button,h2{
    margin: 10px 10px;
  }
</style>
