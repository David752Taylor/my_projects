import { getAddressList } from '@/api/address'

export default {
  namespaced: true,
  state () {
    return {
      AddressList: []
    }
  },
  getters: {

  },
  mutations: {
    setAddressList (state, newList) {
      state.AddressList = newList
    }
  },
  actions: {
    async getAddressAction (context) {
      const res = await getAddressList()
      console.log(17)
      console.log(res)
      const { data: { list } } = res
      context.commit('setAddressList', list)
    }
  }
}
