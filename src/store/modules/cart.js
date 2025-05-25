import { changeCount, getCartList, deleteCart } from '@/api/cart'
import { Toast } from 'vant'
export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  getters: {
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    selectCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    selectCount (state, getters) {
      return getters.selectCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    selectPrice (state, getters) {
      return getters.selectCartList.reduce((sum, item) => sum + item.goods_num * item.goods.goods_price_min, 0).toFixed(2)
    },
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  },
  mutations: {
    setCartList (state, newList) {
      state.cartList = newList
    },
    toggleCheck (state, goodsId) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    toggleAllCheck (state, flag) {
      state.cartList.forEach(item => {
        item.isChecked = flag
      })
    },
    changeCount (state, { goodsId, goodsNum }) {
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.goods_num = goodsNum
    },
    delSelect (state) {

    }
  },
  actions: {
    async getCartAction (context) {
      const res = await getCartList()
      console.log(res)
      const { data } = res
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    },

    async changeCountAction (context, obj) {
      const { goodsNum, goodsId, goodsSkuId } = obj
      // 先-本地修改
      context.commit('changeCount', { goodsId, goodsNum })
      // 后-同步后台
      const res = await changeCount(goodsId, goodsNum, goodsSkuId)
      console.log(res)
    },

    async delSelect (context) {
      const selCartList = context.getters.selectCartList
      const cartIds = selCartList.map(item => item.id)
      const res = await deleteCart(cartIds)
      console.log(res)
      Toast('删除成功!')
      context.dispatch('getCartAction')
    }
  }
}
