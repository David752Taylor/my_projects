import request from '@/utils/request'

export const getUserInfoDetail = () => {
  console.log('27-我的-获取用户信息')
  return request.get('/user/info')
}
