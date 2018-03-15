<template>
    <div>
        <h2>消费记录</h2><br />
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="起始时间">
                <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
                </el-select>
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

        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="fileName" label="文件名" width="300px">
            </el-table-column>
            <el-table-column prop="fileSize" label="文件大小" width="300px">
            </el-table-column>
            <el-table-column prop="date" label="导出时间" width="300px">
            </el-table-column>
        </el-table>
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
                tableData: [{
                    date: '2016-05-02',
                    fileName: '王小虎',
                    fileSize: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    fileName: '王小虎',
                    fileSize: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    fileName: '王小虎',
                    fileSize: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-03',
                    fileName: '王小虎',
                    fileSize: '上海市普陀区金沙江路 1518 弄'
                }],
                options: [{
                    value: '选项1',
                    label: '黄金糕'
                }, {
                    value: '选项2',
                    label: '双皮奶'
                }, {
                    value: '选项3',
                    label: '蚵仔煎'
                }, {
                    value: '选项4',
                    label: '龙须面'
                }, {
                    value: '选项5',
                    label: '北京烤鸭'
                }],
                value: ''
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>

<style scoped>

</style>
