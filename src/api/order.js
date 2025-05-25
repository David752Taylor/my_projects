import request from '@/utils/request'

// 订单结算确认
// mode: cart =>  obj {cartIds}
// mode: buyNow  => obj {goodsId, goodsNum goodsSkuId}
export const checkOrder = (mode, obj) => {
  console.log('16-订单结算响应')
  return request.get('/checkout/order', {
    params: {
      mode,
      delivery: 10, // 10：快递配送，20：门店自提
      couponId: 0, // 优惠券ID，0：不使用优惠券
      isUsePoints: 0, // 积分，0：不使用积分
      ...obj
    }
  })
}
