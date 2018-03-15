<template>
    <div id="aside">
        <el-row class="tac" :gutter="10">
            <el-col >
                <el-menu default-active="2" :default-openeds="openeds"   class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
                    <!--渲染任务-->
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>渲染任务</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="1-1">
                                <router-link exact to="/rendering">正在渲染任务</router-link>
                            </el-menu-item>
                            <el-menu-item index="1-2">
                                <router-link to="/completed">已完成任务</router-link>
                            </el-menu-item>
                        </el-menu-item-group>

                    </el-submenu>
                    <!--个人中心-->
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="el-icon-tickets"></i>
                            <span>个人中心</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1">
                                <router-link to="/userInfo">用户资料</router-link>
                            </el-menu-item>
                            <el-menu-item index="2-2">
                                <router-link to="/modifyPass">修改密码</router-link>
                            </el-menu-item>
                            <el-menu-item index="2-3">
                                <router-link to="/childAcount">子账户管理</router-link>
                            </el-menu-item>
                            <el-menu-item index="2-4">
                                <router-link to="/record">消费记录</router-link>
                            </el-menu-item>
                            <el-menu-item index="2-5">
                                <router-link to="/crash">代金券</router-link>
                            </el-menu-item>
                            <el-menu-item index="2-6">
                                <router-link to="/reCharge">充值</router-link>
                            </el-menu-item>
                            <el-menu-item index="2-7">
                                <router-link to="/setting">通知设置</router-link>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="3">
                        <template slot="title">
                            <i class="el-icon-tickets"></i>
                            <span>我的客服</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1">在线客服</el-menu-item>
                            <el-menu-item index="3-2">常见问题</el-menu-item>

                        </el-menu-item-group>
                    </el-submenu>

                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>

    export default {
        name: 'Aside',

        data() {
            return {
                openeds:['1','2'],  //默认展开index为1和2的导航，配合:default="openeds"
            }
        },
        methods: {
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style>

</style>
