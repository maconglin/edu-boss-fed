import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'
const request = axios.create({

})
function redireLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}
function refreshToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}
// Add a request interceptor axios 请求拦截
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 我们就在这里通过修改config 配置信息来实现业务功能的统一处理
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  // 注意这里一定要返回的 config , 否则请求进来就出不去了
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
let isRfreshing = false // 控制刷新次数
let requests: (() => void)[] = []
// Add a response interceptor 请求响应
request.interceptors.response.use(function (response) {
  return response
}, async function (error) { // 状态码大于2xx 走这里
  // console.log('请求失败了=>', error)
  if (error.response) { // 请求发出了 但是状态码大于了2xx
    const { status } = error.response
    if (status === 401) {
      // token 无效 （没有提供token/token是无效的/token过期了）
      if (!store.state.user) {
        redireLogin()
        return Promise.reject(error)
      }
      // 刷新 token
      if (!isRfreshing) {
        isRfreshing = true // 开启刷新状态
        // 如果有refresh_token 则尝试用 refresh_token 获取新的 token
        return refreshToken().then(res => {
          if (!res.data.success) {
            throw new Error('刷新 TOKEN 失败')
          }
          // 刷新成功了 把数据存进vuex 容器
          store.commit('setUser', res.data.content)
          requests.forEach(cb => cb())
          requests = []
          return request(error.config)
        }).catch(err => {
          console.log(err)
          store.commit('setUser', 'null')
          redireLogin()
          return Promise.reject(error)
        }).finally(() => {
          isRfreshing = false
        })
      }
      // 刷新转状态下 把请求状态挂起 放到 requests数组中
      return new Promise(resolve => {
        requests.push(() => {
          resolve(request(error.config))
        })
      })
      // 成功了 -> 把本次失败的请求重新发出去
      // 失败了 -> 跳转登录页重新登录获取新的 token
      // 如果没有 则直接跳转登录页
    } else if (status === 403) {
      Message.error('没有权限,请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 401) {
      Message.error('服务端错误,请联系管理员')
    }
  } else if (error.request) {
    Message.error('请求超时,请刷新重试')
  } else {
    Message.error(`请求失败, ${error.message}`)
  }
  return Promise.reject(error)
})

export default request
