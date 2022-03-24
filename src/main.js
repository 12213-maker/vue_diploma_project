import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios'
Vue.prototype.$axios = axios




import request from './request/index'
Vue.prototype.$request = request

//引入element-ui 和 它的样式表 以及全局样式
import './element-ui/element'
import 'element-ui/lib/theme-chalk/index.css';
import '../src/assets/css/global.css'


//echarts
import * as echarts from "echarts"
Vue.prototype.$echarts = echarts 

//引入城市选择器的插件
import distpicker from 'distpicker'
import VDistpicker from 'v-distpicker'
Vue.component('v-distpicker', VDistpicker);

//还要引入iconfont



//还要引入封装的axios



//全局事件总线(不一定使用)
Vue.prototype.$bus = new Vue()



Vue.config.productionTip = false

new Vue({
  request,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
