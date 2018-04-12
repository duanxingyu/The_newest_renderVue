import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    token:'',
    username:'',
    role:'',
    yinlian:{},
    yinlian_url:'',
    weixin:{}
  },
  mutations:{
    set_token(state, token) {
      state.token = token;
      sessionStorage.token = token
    },
    del_token(state) {
      state.token = '';
      sessionStorage.removeItem('token')
    },
    set_username(state,username){
      state.username=username;
      sessionStorage.username=username;
    },
    set_role(state,role) {
      state.role = role;
      sessionStorage.role=role
    },
    set_yinlian(state,yinlian) {
      state.yinlian=yinlian;
      sessionStorage.yinlian=yinlian
    },
    set_yinlian_url(state,yinlian_url) {
      state.yinlian_url=yinlian_url;
      sessionStorage.yinlian_url=yinlian_url;
    },
    set_weixin(state,weixin) {
     state.weixin=weixin;
     sessionStorage.weixin=weixin;
    }
  }
})
