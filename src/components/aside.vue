<template>
  <div id="aside">
    <el-row class="tac" :gutter="10">
      <el-col>
        <el-menu default-active="2" :default-openeds="openeds" class="el-menu-vertical-demo" @open="handleOpen"
                 @close="handleClose" >
          <!--渲染任务-->
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-tickets"></i>
              <span>渲染任务</span>
            </template>
            <el-menu-item-group>
              <router-link exact to="/rendering">
                <el-menu-item index="1-1">
                  正在渲染任务
                </el-menu-item>
              </router-link>
              <router-link to="/completed">
                <el-menu-item index="1-2">
                  已完成任务
                </el-menu-item>
              </router-link>
            </el-menu-item-group>

          </el-submenu>
          <!--个人中心-->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-bell"></i>
              <span>个人中心</span>
            </template>
            <el-menu-item-group>
              <router-link to="/userInfo">
                <el-menu-item index="2-1">
                  用户资料
                </el-menu-item>
              </router-link>
              <router-link to="/modifyPass">
                <el-menu-item index="2-2">
                  修改密码
                </el-menu-item>
              </router-link>
              <router-link to="/childAcount">
                <el-menu-item index="2-3">
                  子账户管理
                </el-menu-item>
              </router-link>
              <router-link to="/record">
                <el-menu-item index="2-4">
                  消费记录
                </el-menu-item>
              </router-link>
              <router-link to="/crash">
                <el-menu-item index="2-5">
                  代金券
                </el-menu-item>
              </router-link>
              <router-link to="/reCharge">
                <el-menu-item index="2-6">
                  充值
                </el-menu-item>
              </router-link>
              <!--<router-link to="/setting">-->
                <!--<el-menu-item index="2-7">-->
                  <!--通知设置-->
                <!--</el-menu-item>-->
              <!--</router-link>-->
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-phone"></i>
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
        openeds: ['1', '2'],  //默认展开index为1和2的导航，配合:default="openeds"
        // isCollapse: true,
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

<style scoped>
</style>
