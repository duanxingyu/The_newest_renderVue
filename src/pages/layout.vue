<template>
    <el-container>
        <el-header>
            <router-link to="/"><img src="../assets/logo_renderg.png" /></router-link>
            <Header></Header>
        </el-header>
        <el-container>
            <el-aside >
                <Aside></Aside>
            </el-aside>
            <el-main>
                <Main></Main>
            </el-main>
        </el-container>
    </el-container>

</template>

<script>
    import Header from '../components/header'
    import Main from '../components/main'
    import Aside from '../components/aside'

    export default {
        name: 'layout',
        components: {
            Header,
            Aside,
            Main
        },
        data() {
            return {

            }
        },

    }
</script>

<style>
    body {
        overflow: hidden;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }

    a {
        text-decoration: none;
        color: #333;
    }
    .router-link-active{
        color: #409EFF;
    }


     ::-webkit-scrollbar {
        width: 14px;
        height: 14px;
    }

     ::-webkit-scrollbar-track,
     ::-webkit-scrollbar-thumb {
        border-radius: 999px;
        border: 5px solid transparent;
    }

     ::-webkit-scrollbar-track {
        box-shadow: 1px 1px 5px rgba(0, 0, 0, .2) inset;
    }

     ::-webkit-scrollbar-thumb {
        min-height: 20px;
        background-clip: content-box;
        box-shadow: 0 0 0 5px rgba(0, 0, 0, .2) inset;
    }

     ::-webkit-scrollbar-corner {
        background: transparent;
    }

    .el-header {
        background-color: #fff;
        color: #333;
        line-height: 60px;
        box-shadow: 1px 1px 1px 1px #ccc;
    }

    .el-aside {
        /*background-color: #E9EEF3;*/
        height: 90%;
        /*width: 20%;*/
        padding-left: 10px;
        padding-bottom: 200px;
        position: absolute;
        overflow-y: scroll;
        /*overflow-x: hidden;*/
        margin-top: 10px;
        overflow-x:hidden ;
    }

    .el-main {
        /*background-color: #3333;*/
       -moz-box-flex: 1;
        color: #333;
        margin: 5px 50px 0px 280px;
        padding:20px 20px 100px 20px;
        height: 90%;
        width: 85%;
        position: absolute;
        overflow-y: scroll;

    }

    #main {
        margin: -16px 0px;
        width: 100%;
    }
    /*#app > section > section > main{
        width: 888px;
        padding-left: 300px;
    }*/
   #app > section > header > a > img{
       margin: 4px 0px 4px -28px;
   }
</style>
