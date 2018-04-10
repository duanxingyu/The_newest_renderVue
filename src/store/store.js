import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

export default new Vuex.Store({
  state:{
    token:'',
    username:'',
    role:'',
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
    }
  }
})
