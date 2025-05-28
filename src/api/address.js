import request from '@/utils/request'

export const getAddressList = () => {
  console.log('17. 收货地址列表')
  return request.get('/address/list')
}

export const delAddress = (addressId) => {
  console.log('22-删除收货地址')
  return request.post('/address/remove', {
    addressId
  })
}

export const addAddress = (form) => {
  console.log('20-添加收货地址')
  return request.get.post('/address/add', {
    form
  })
}
