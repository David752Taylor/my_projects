import request from '@/utils/request'

export const getCategoryData = () => {
  console.log('26-商品全部分类')
  return request.get('/category/list')
}
