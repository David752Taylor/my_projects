import request from '@/utils/request'

export const getCart = () => {

}

// goodsId: 商品id
// goodsSkuId: 商品规格id
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}
