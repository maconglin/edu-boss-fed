/**
 * 广告相关请求模块
 */
import request from '@/utils/request'

export const getAdver = (data: any) => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdList',
    data
  })
}

export const getAllSpaces = () => {
  return request({
    method: 'GET',
    url: '/front/ad/space/getAllSpaces'
  })
}

export const updateStatus = (params: any) => {
  return request({
    method: 'GET',
    url: '/front/ad/updateStatus',
    params
  })
}
export const saveOrUpdates = (params: any) => {
  return request({
    method: 'POST',
    url: '/front/ad/saveOrUpdate',
    params
  })
}

export const getAdById = (params: any) => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdById',
    params
  })
}
export const spaceSaveOrUpdate = (params: any) => {
  return request({
    method: 'POST',
    url: '/front/ad/space/saveOrUpdate',
    params
  })
}

export const getSpaceById = (params: any) => {
  return request({
    method: 'GET',
    url: '/front/ad/space/getSpaceById',
    params
  })
}
