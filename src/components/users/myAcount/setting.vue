<template>
  <div>
    <h2>通知设置</h2><br/>
    <el-form ref="form" :model="form" label-width="110px">
      <el-form-item label="事物类型:">
        <el-form-item label="任务开始">
          <el-switch v-model="form.start" active-color="#13ce66"></el-switch>
        </el-form-item>
        <el-form-item label="任务完成">
          <el-switch v-model="form.completed"></el-switch>
        </el-form-item>
        <el-form-item label="任务失败">
          <el-switch v-model="form.failed" active-color="red"></el-switch>
        </el-form-item>
      </el-form-item>

      <el-form-item label="通知方式:">

        <el-form-item :rules="{required:true,trigger:'blur',message:'该字段不能为空'}">
          <el-radio v-model="radio" label="1" border size="medium"   @change="emailRadio">电子邮箱</el-radio>
          <el-input placeholder="请输入电子邮箱" :disabled="disabled1" v-model="input1" style="width:400px" clearable></el-input>
        </el-form-item>


        <el-form-item :rules="{required:true,trigger:'blur',message:'该字段不能为空'}">
          <el-radio v-model="radio" label="2" border size="medium" @change="messageRadio">短信通知</el-radio>
          <el-input placeholder="请输入手机号" :disabled="disabled2" v-model="input2" style="width:400px" clearable></el-input>
        </el-form-item>
      </el-form-item>
      <el-form-item >
        <el-button type="success" @click="submitForm('form')">提交设置</el-button>
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
        },
        radio: '',
        input1:'',
        input2:'',
        disabled1:false,
        disabled2:false
      };
    },
    methods:{
      emailRadio(){
        if(this.disabled2===false){
          this.disabled2=true
          this.disabled1=false
          this.input2=''
        }
      },
      messageRadio(){
        if (this.disabled1===false){
          this.disabled1=true
          this.disabled2=false
          this.input1=''
        }
      }
    }
  }
</script>

<style scoped>
h2{
  margin: 10px 10px;
}
</style>
