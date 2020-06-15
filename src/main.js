import Vue from 'vue'
import App from './App.vue'
import {router}  from './routes/index.js'
import store from "./store/store.js"
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import VueLocalStorage from 'vue-localstorage'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(VueLocalStorage)
                                                         
Vue.prototype.$http = axios;
new Vue({
  render: h => h(App),
  router,
  store: store
}).$mount('#app')