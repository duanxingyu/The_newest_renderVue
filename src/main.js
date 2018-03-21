// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import Element from 'element-ui'
import {Loading} from 'element-ui'
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
  if (store.state.token) {
    config.headers.common['Authentication-Token'] = store.state.token
  }
  //请求前到请求到数据这段时间用加载动画来代替
  // let loading = Loading.service({
  //   fullscreen: true,
  //   text: '正在拼命加载中...',
  //   // target:'#app'
  // });

  return config;
}, error => {
  // 对请求错误做些什么
  console.log("发送失败");
  console.log(error)
  let loading = Loading.service({});
  loading.close();

  return Promise.reject(error);
});

// 添加响应拦截器
Axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  let loading = Loading.service({});
  loading.close();
  console.log(response.data)
  return response;
}, error => {
  // 对响应错误做点什么
  console.log(error.response);
  if (error.response.status === 401) {
    alert("Error status  " + error.response.status + "，访问被拒绝");
  } else if (error.response.status === 404) {
    alert("Error status  " + error.response.status + "，对象没有找到！");
  } else if (error.response.status === 403) {
    alert("Error status  " + error.response.status + "，请求被拒绝");
  } else if (error.response.status === 500) {
    alert("Error status  " + error.response.status + "，服务器内部出错");
  } else if (error.response.status === 504) {
    alert("Error status  " + error.response.status + "，等待网关时，请求断开！");
  }

  if (error.response) {
    switch (error.response.status) {
      case 401:
        this.$store.commit('del_token');
        router.replace({
          path: '/login',
          query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
        });
    }
  }
  let loading = Loading.service({});
  loading.close();
  return Promise.reject(error);
});


// http response 拦截器
// Axios.interceptors.response.use(
//   response => {
//     let loading = Loading.service({});
//       loading.close();
//       console.log(response.data)
//     return response;
//   },
//   error => {
//     if (error.response) {
//       switch (error.response.status) {
//         case 401:
//           this.$store.commit('del_token');
//           router.replace({
//             path: '/login',
//             query: {redirect: router.currentRoute.fullPath}//登录成功后跳入浏览的当前页面
//           })
//         case 504:
//           this.$message.error('网络超时'+error.response.status);
//         case 500:
//           this.$message.error('服务器超时');
//       }
//     }
//
//     console.log(error.response);
//     this.$notify.error("请求数据失败")
//     let loading = Loading.service({});
//     loading.close();
//     return Promise.reject(error.response.data)
//   });

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
