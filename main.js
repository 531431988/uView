import Vue from 'vue'
import App from './App'
import store from '@/store';
import uView from 'uview-ui'
Vue.config.productionTip = false
Vue.use(uView)
App.mpType = 'app'

const app = new Vue({
  store,
	...App
})
// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)

// 引入uView提供的对vuex的简写法文件
let vuexStore = require('@/store/$u.mixin.js')
Vue.mixin(vuexStore)

app.$mount()
