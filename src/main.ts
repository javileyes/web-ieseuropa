import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import vuetify from './config/vuetify'
import AxiosConfig from "@/config/AxiosConfig"
import VueMeta from 'vue-meta'
import './main.css'

Vue.config.productionTip = false
Vue.use(VueMeta)

const vue = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

AxiosConfig.init(vue)
