import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'babel-polyfill'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload' // 图片懒加载

import './common/styles/index.styl'

fastclick.attach(document.body) // 取消按钮点击延迟
Vue.use(VueLazyLoad, {
  loading: require('./common/image/default.png')
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
