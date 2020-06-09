import Vue from 'vue'
import App from './App'
import uView from 'uview-ui'
Vue.config.productionTip = false
Vue.use(uView)
App.mpType = 'app'

const app = new Vue({
	...App
})
// http拦截器，将此部分放在new Vue()和app.$mount()之间，才能App.vue中正常使用
import httpInterceptor from '@/common/http.interceptor.js'
Vue.use(httpInterceptor, app)

app.$mount()
