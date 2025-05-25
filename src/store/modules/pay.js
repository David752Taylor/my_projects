import { checkOrder } from '@/api/order'

export default {
  namespaced: true,
  state () {
    return {
      order: {},
      personal: {}
    }
  },
  getters: {

  },
  mutations: {
    getOrder (state, order) {
      state.order = order
    },
    getPersonal (state, personal) {
      state.personal = personal
    }
  },
  actions: {
    async getOrderAction (context, { mode, ...obj }) {
      const res = await checkOrder(mode, obj)
      console.log(16)
      console.log(res)
      const { data: { order, personal } } = res
      context.commit('getOrder', order)
      context.commit('getPersonal', personal)
    }
  }

}
