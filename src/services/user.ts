/**
 * 用户相关请求的函数
*/
import request from '@/utils/request'
import qs from 'qs'
// interface是面向对象编程语言中接口操作的关键字
interface User {
  phone: string
  password: string
}

export const login = (data: User) => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
    // 如果 data 是普通对象,则content-type 是application/json
    // 如果 data 是qs.stringify(data),则content-type 是application/x-www-form-urlencoded
    // 如果 data 是 FormData 对象 则content-type 是multipart/from-data
    data: qs.stringify(data)
  })
}

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}
