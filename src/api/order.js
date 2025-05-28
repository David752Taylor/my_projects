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

// mode: cart =>  obj {cartIds, remark}
// mode: buyNow  => obj {goodsId, goodsNum goodsSkuId, remark}
export const submitOrder = (mode, obj) => {
  console.log('25-提交订单')
  return request.post('/checkout/submit', {
    mode,
    delivery: 10,
    couponId: 0,
    isUsePoints: 0,
    ...obj
  })
}

export const getMyOrderList = (dataType, page) => {
  console.log('30-我的订单')
  return request.get('/order/list', {
    params: {
      dataType,
      page // vant-list
    }
  })
}
