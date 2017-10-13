// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import VueTouch from 'vue-touch'
import router from './router'
import Ajax from './utils/ajax'
import store from './store'
import './assets/css/index.scss'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import vuescroll from 'vue-scroll'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.use(vuescroll)
VueTouch.config.swipe = {
  direction: 'horizontal'
}

Vue.use(VueTouch, {
  name: 'v-touch'
})
Vue.use(MintUI)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(Ajax, {
  baseURL: 'http://119.23.78.121:3003/'
})

Vue.filter('toDate', (date) => { // 2017年5月10日15：35
    if (date) {
        const d = new Date(date)
        const minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
        const hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
        return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' +
            d.getDate() + '日 ' + hours + ' : ' + minutes
    }
})

Vue.filter('to_date', (date) => { // 2017-5-10 at 15：35
    if (date) {
        const d = new Date(date)
        const minutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
        const hours = d.getHours() < 10 ? '0' + d.getHours() : d.getHours()
        return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' +
            d.getDate() + ' ' + hours + ': ' + minutes
    }
})

Vue.filter('toTag', (arr) => {
    if (arr) {
        return arr.join('，')
    }
})

Vue.http.interceptors.request.use(config => {
  if (window.localStorage.getItem('token')) {
    config.headers.Authorization = 'Bearer ' + window.localStorage.getItem('token')
  }
  return config
}, error => {
  if (response.status === 401) {
      store.commit('unset_user')
      router.go({ name: 'login' })
  }
  return Promise.reject(error)
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})

// Disable context menu
document.addEventListener('contextmenu', event => {
  event.preventDefault()
  event.stopPropagation()
})
