import { addAddress, delAddress, getAddressList } from '@/api/address'

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
    },
    delAddress (state, id) {
      state.AddressList = state.AddressList.filter((item) => item.address_id !== id)
    }
  },
  actions: {
    async getAddressAction (context) {
      const res = await getAddressList()
      console.log(17)
      console.log(res)
      const { data: { list } } = res
      context.commit('setAddressList', list)
    },
    async delAddressAction (context, { id }) {
      const res = await delAddress(id)
      console.log(res)
      await context.dispatch('getAddressAction')
    },
    async addAddressAction (context, form) {
      const res = await addAddress(form)
      console.log(res)
      await context.dispatch('getAddressAction')
    }
  }
}
