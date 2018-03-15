// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Axios from 'axios'
import Vuex from 'vuex'
import store from './store/store'

// Axios.defaults.auth = {
//   username: '',
//   password: ''
// }
// 添加请求拦截器
Axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  //判断是否存在token，如果存在将每个页面header都添加token
  if(store.state.token){
    config.headers.common['Authentication-Token']=store.state.token
  }
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
// Axios.interceptors.response.use(response => {
//   // 对响应数据做点什么
//   return response;
// }, error => {
//   // 对响应错误做点什么
//   console.log(error.response);
//   if (error.response.status===504){
//     console.log(error.response.statusText);
//     alert(error.response.statusText);
//   }
//   return Promise.reject(error);
// });


// http response 拦截器
Axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {

    if (error.response) {
      switch (error.response.status) {
        case 401:
          this.$store.commit('del_token');
          router.replace({
            path: '/login',
            query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
          })
      }
    }

    return Promise.reject(error.response.data)
  });

// const obj = Axios.create({
//   headers: {
//     'Authentication-Token': store.state.token
//   },
// });

Axios.defaults.headers.common['Authentication-Token'] = store.state.token;

// Vue.prototype.$OBJ = obj

Vue.prototype.$axios = Axios
// 跨域请求问题
Vue.prototype.HOST = "/api"

Vue.use(Vuex)
Vue.use(Element)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  components: {App},
  template: '<App/>'
});


// 路由跳转
// router.beforeEach((to, from, next) => {
//   if (to.meta.requireAuth) {
//     // 检查localStorage
//     if (store.state.token) {
//       // store.commit('set_token', store.state.token)
//       // 添加axios头部Authorized
//       Axios.defaults.auth = {
//         username: store.state.token,
//         password: store.state.token,
//       }
//       next()
//     } else {
//       next({
//         path: '/login',
//         query: {redirect: to.fullPath}
//       })
//     }
//   } else {
//     next()
//   }
// })
