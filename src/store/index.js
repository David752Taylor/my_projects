import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user.js'
import cart from './modules/cart.js'
import address from './modules/address.js'
import pay from './modules/pay.js'
// import home from './modules/home.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
    token (state) {
      return state.user.userInfo.token
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    cart,
    address,
    pay
    // home
  }
})
