import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
import * as types from '../store/type'

import Login from '@/components/login'
import Register from '@/components/register'
import ForgetPass from '@/components/forgetPass'
import Layout from '@/pages/layout'
import Rendering from '@/components/users/renderTask/rendering'
import Completed from '@/components/users/renderTask/completed'
import UserInfo from '@/components/users/myAcount/userInfo'
import ModifyPass from '@/components/users/myAcount/modifyPass'
import ChildAcount from '@/components/users/myAcount/childAcount'
import Record from '@/components/users/myAcount/record'
import Crash from '@/components/users/myAcount/crash'
import ReCharge from '@/components/users/myAcount/reCharge'
import Yinlian from '@/components/users/myAcount/reCharge_yinlian'
import Weixin from '@/components/users/myAcount/reCharge_weixin'
import Setting from '@/components/users/myAcount/setting'


Vue.use(Router)


const routes = [{

  path: '/',
  component: Layout,
  meta: {
    requireAuth: true,//添加该字段，表示进入该路由需要登陆的
  },
  children: [{
    path: 'rendering',
    name: '正在渲染任务',
    component: Rendering
  },
    {
      path: 'completed',
      name: '已完成任务',
      component: Completed
    }, {
      path: 'userInfo',
      name: '用户资料',
      component: UserInfo
    }, {
      path: 'modifyPass',
      name: '修改密码',
      component: ModifyPass
    }, {
      path: 'childAcount',
      name: '子账户管理',
      component: ChildAcount
    }, {
      path: 'record',
      name: '消费记录',
      component: Record
    }, {
      path: 'crash',
      name: '代金券',
      component: Crash
    }, {
      path: 'reCharge',
      name: '充值',
      component: ReCharge
    }, {
      path: 'reCharge_yinlian',
      name: '银联',
      component: Yinlian
    }, {
      path: 'reCharge_weixin',
      name: '微信',
      component: Weixin
    }, {
      path: 'setting',
      name: '通知设置',
      component: Setting
    }
  ]

}, {
  path: '/login',
  component: Login
}, {
  path: '/register',
  component: Register
}, {
  path: '/forgetPass',
  component: ForgetPass
},{
  path: '/userInfo_perfect',
  name:'完善信息',
  component: (resolve) => require(['../components/users/myAcount/userInfo_perfect.vue'], resolve)
}, {
  path: '/allJobs',
  component: (resolve) => require(['../components/admins/account/allUsers.vue'], resolve)
}, {
  path: '/customer',
  component: (resolve) => require(['../components/admins/account/customer.vue'], resolve)
}, {
  path: '/renderManger',
  component: (resolve) => require(['../components/admins/account/renderManger.vue'], resolve)
}, {
  path: '/salesMan',
  component: (resolve) => require(['../components/admins/account/salesMan.vue'], resolve)
}, {
  path: '/visitor',
  component: (resolve) => require(['../components/admins/account/visitor.vue'], resolve)
}, {
  path: '/roles',
  component: (resolve) => require(['../components/admins/account/roles.vue'], resolve)
}, {
  path: '/deadlineUsers',
  component: (resolve) => require(['../components/admins/account/deadlineUsers.vue'], resolve)
}, {
  path: '/setGroup',
  component: (resolve) => require(['../components/admins/account/setGroup.vue'], resolve)
},{
  path:'*',
  redirect:'/'              //若未找到以上路由地址，就重定向至'/'路径
}]


// 页面刷新时，重新赋值token
if (sessionStorage.getItem('token')) {
  store.commit('set_token', sessionStorage.getItem('token'))
};
if (sessionStorage.getItem('user_id')) {
  store.commit('set_userId', sessionStorage.getItem('user_id'))
};
if (sessionStorage.getItem('username')) {
  store.commit('set_username', sessionStorage.getItem('username'));
};
if (sessionStorage.getItem('yinlian_url')) {
  store.commit('set_yinlian_url', sessionStorage.getItem('yinlian_url'));
};
if (sessionStorage.getItem('weixin')) {
  store.commit('set_weixin', sessionStorage.getItem('weixin'));
};

const router = new Router({
  mode: "history",
  routes
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(r => r.meta.requireAuth)) {
    if (store.state.token) {
      next();
    }
    else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  }
  else {
    next();
  }
})

export default router;
