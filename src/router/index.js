import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
import * as types from '../store/type'

import Login from '@/components/login'
import Register from '@/components/register'
import ForgetPass from '@/components/forgetPass'
import Layout from '@/pages/layout'
import Rendering from '@/components/renderTask/rendering'
import Completed from '@/components/renderTask/completed'
import UserInfo from '@/components/myAcount/userInfo'
import ModifyPass from '@/components/myAcount/modifyPass'
import ChildAcount from '@/components/myAcount/childAcount'
import Record from '@/components/myAcount/record'
import Crash from '@/components/myAcount/crash'
import ReCharge from '@/components/myAcount/reCharge'
import Setting from '@/components/myAcount/setting'


Vue.use(Router)


const routes = [{

  path: '/',
  component: Layout,
  meta: {
    requireAuth: true,//添加该字段，表示进入该路由需要登陆的
  },
  children: [{
    path: 'rendering',
    name:'正在渲染任务',
    component: Rendering
  },
    {
      path: 'completed',
      name:'已完成任务',
      component: Completed
    }, {
      path: 'userInfo',
      name:'用户资料',
      component: UserInfo
    }, {
      path: 'modifyPass',
      name:'修改密码',
      component: ModifyPass
    }, {
      path: 'childAcount',
      name:'子账户管理',
      component: ChildAcount
    }, {
      path: 'record',
      name:'消费记录',
      component: Record
    }, {
      path: 'crash',
      name:'代金券',
      component: Crash
    }, {
      path: 'reCharge',
      name:'充值',
      component: ReCharge
    }, {
      path: 'setting',
      name:'通知设置',
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
}]


// 页面刷新时，重新赋值token
if (sessionStorage.getItem('token')) {
  store.commit('set_token', sessionStorage.getItem('token'))
}

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
