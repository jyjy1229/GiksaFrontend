//you need to import both vue and vuex, as both are used here
import Vue from "vue";
import Vuex from "vuex";
//then you use Vuex
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userid: localStorage.getItem('userid'),
    success: localStorage.getItem('success')
  }, 
  mutations: {
    login: function(state, payload){
      state.userid = payload
      state.success = true
      localStorage.setItem('userid', payload)
      localStorage.setItem('success', true)
    },
    logout: function(state){
      state.success = false
      localStorage.removeItem('userid')
      localStorage.removeItem('success')
    }
  }
});