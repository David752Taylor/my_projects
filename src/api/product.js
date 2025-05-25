import request from '@/utils/request'

// 获取商品列表数据
export const getProList = (obj = {}) => {
  const { categoryId, goodsName, page } = obj
  console.log('2-商品搜索')
  return request.get('/goods/list', {
    params: {
      categoryId,
      goodsName,
      page
    }
  })
}

export const getProdetail = (goodsId) => {
  console.log('3-商品详情页')
  return request.get('/goods/detail', {
    params: {
      goodsId
    }
  })
}

export const getProComments = (goodsId, limit) => {
  console.log('6-获取商品评论响应')
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}

export const getProCartTotal = () => {
  console.log('4-购物车商品总数量响应')
  return request.get('/cart/total')
}
