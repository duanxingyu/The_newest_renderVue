<template>
  <div id="header">

    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <!--<el-menu-item index="1">处理中心</el-menu-item>-->
      <el-submenu index="2">
        <template slot="title" >guo.qi@renderg.com</template>
        <el-menu-item index="2-1">
          <router-link to="/login" exact @click="logout">退出登录</router-link>
        </el-menu-item>

        <!--<el-submenu index="2-4">-->
        <!--<template slot="title">选项4</template>-->
        <!--<el-menu-item index="2-4-1">选项1</el-menu-item>-->
        <!--<el-menu-item index="2-4-2">选项2</el-menu-item>-->
        <!--<el-menu-item index="2-4-3">选项3</el-menu-item>-->
        <!--</el-submenu>-->
      </el-submenu>
      <el-menu-item index="3">
        <a href="#">下载</a>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import store from '../store/store'

  export default {
    name: 'Header',
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    created(){
      // var url=this.HOST+'/session';
      // this.$axios.get(url,{
      //
      // })
    },

    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      logout() {
        if (store.state.token){
          this.$store.commit('del_token');
        }

      }
    }
  }
</script>

<style>
  #header {
    float: right;
  }


</style>
