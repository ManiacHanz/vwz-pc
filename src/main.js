// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import {banBackSpace} from 'config/mUtils.js'

Vue.config.productionTip = false

//禁止后退键 作用于Firefox、Opera 
document.onkeypress=banBackSpace; 
//禁止后退键 作用于IE、Chrome 
document.onkeydown=banBackSpace; 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
