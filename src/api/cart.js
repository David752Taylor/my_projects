import request from '@/utils/request'

// goodsId: 商品id
// goodsSkuId: 商品规格id
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  console.log('9-添加商品到购物车')
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 获取购物车列表
export const getCartList = () => {
  console.log('3-商品详情页')
  return request.get('/cart/list')
}

// 更新购物车商品数量
export const changeCount = (goodsId, goodsNum, goodsSkuId) => {
  console.log('14-购物车商品更新')
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 删除购物车商品
export const deleteCart = (cartIds) => {
  console.log('15-删除购物车商品')
  return request.post('/cart/clear', {
    cartIds
  })
}
