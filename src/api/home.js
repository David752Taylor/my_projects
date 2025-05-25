import request from '@/utils/request'

export const getHomeData = () => {
  console.log('1-获取首页数据响应')
  return request.get('/page/detail', {
    params: {
      pageId: 0
    }
  })
}
