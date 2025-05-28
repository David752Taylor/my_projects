import { getInfo, setInfo } from '@/utils/storage'

export default {
  namespaced: true,
  state () {
    return {
      // 初始化个人权证信息
      userInfo: getInfo()
    }
  },
  mutations: {
    // 本地存储个人权证信息
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }
  },
  actions: {
    logout (context) {
      context.commit('setUserInfo', {})
      context.commit('cart/setCartList', [], { root: true })
      context.commit('address/setAddressList', [], { root: true })
      context.commit('pay/setOrder', {}, { root: true })
      context.commit('pay/setPersonal', {}, { root: true })
    }
  },
  getters: {}

}
