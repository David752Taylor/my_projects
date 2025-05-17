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
  actions: {},
  getters: {}

}
