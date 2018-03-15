<template>
    <div>
        <h2>代金券</h2><br />
        <el-button type="primary" size="medium"><router-link to="/reCharge">充值代金券</router-link></el-button>
        <el-table :data="tableData" stripe sort-by="{tableData.address}">
            <el-table-column prop="address" label="代金券号码" width="350px" sortable>
            </el-table-column>
            <el-table-column prop="name" label="面值" width="350px">
            </el-table-column>
            <el-table-column prop="date" label="充值时间" width="350px" sortable >
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: 'crash',
        data() {
            return {
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        }
    }
</script>

<style scoped>
  #main > div > button > span > a{
    color: #fff;
  }
</style>
