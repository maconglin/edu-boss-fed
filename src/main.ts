import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import dayjs from 'dayjs'

// import 'element-ui/lib/theme-chalk/index.css'

// 加载全局样式
import './styles/index.scss'
// vue全局过滤日期写法
Vue.filter('date', (value: string | number | Date | dayjs.Dayjs | undefined, format = 'YYYY-MM-DD') => {
  return dayjs(value).format(format)
})

Vue.use(ElementUI, {
  size: 'small'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
