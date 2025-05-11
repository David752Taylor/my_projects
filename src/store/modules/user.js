export default {
  namespaced: true,
  state () {
    return {
      userInfo: {
        token: '',
        userID: ''
      }
    }
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = obj
    }
  },
  actions: {},
  getters: {}

}
