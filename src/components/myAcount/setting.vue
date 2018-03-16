<template>
  <div>
    <h2>通知设置</h2><br/>
    <el-form ref="form" :model="form" label-width="110px">
      <el-form-item label="事物类型:">
        <el-form-item label="任务开始">
          <el-switch v-model="form.start" ></el-switch>
        </el-form-item>
        <el-form-item label="任务完成">
          <el-switch v-model="form.completed" active-color="#13ce66"></el-switch>
        </el-form-item>
        <el-form-item label="任务失败">
          <el-switch v-model="form.failed" active-color="red"></el-switch>
        </el-form-item>
      </el-form-item>


    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'setting',
    data() {
      return {
        form: {
          start: false,
          completed: false,
          failed: false
        }
      };

    }
  }
</script>

<style scoped>

</style>
