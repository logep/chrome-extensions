import { request } from './request'


// 获取轮播图、分类、广告相关数据
export function getNavData(data, method) {
  return request({
    url: '/nav',
    data,
    method
  })
}

// 获取产品数据
export function getProducts() {
  return request({
    url: '/product/getHomeProducts'
  })
}