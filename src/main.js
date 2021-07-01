import Vue from 'vue'

import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'

Vue.use(VueAxios, axios, Vuelidate)

import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
