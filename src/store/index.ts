import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 容器的状态实现持久化，组件里方便共享
  state: {
    user: JSON.parse(window.localStorage.getItem('user') || 'null')
  },
  mutations: {
    setUser (state, payload) {
      state.user = JSON.parse(payload)
      // 为了防止页面的刷新数据丢失 我们把user  本地持久化
      // 注意本地储存只能存字符串
      window.localStorage.setItem('user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
