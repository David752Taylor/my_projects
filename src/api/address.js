import request from '@/utils/request'

export const getAddressList = () => {
  console.log('17. 收货地址列表')
  return request.get('/address/list')
}
