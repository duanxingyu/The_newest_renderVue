import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store'
import * as types from '../store/type'

import Login from '@/components/login'
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
    component: Rendering
  },
    {
      path: 'completed',
      component: Completed
    }, {
      path: 'userInfo',
      component: UserInfo
    }, {
      path: 'modifyPass',
      component: ModifyPass
    }, {
      path: 'childAcount',
      component: ChildAcount
    }, {
      path: 'record',
      component: Record
    }, {
      path: 'crash',
      component: Crash
    }, {
      path: 'reCharge',
      component: ReCharge
    }, {
      path: 'setting',
      component: Setting
    }
  ]

}, {
  path: '/login',
  component: Login
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
