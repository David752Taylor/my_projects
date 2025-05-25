import banner1 from '@/assets/banner1.jpg'
import banner2 from '@/assets/banner2.jpg'
import banner3 from '@/assets/banner3.jpg'
import nav from '@/assets/nav1.png'

export default {
  namespaced: true,
  state () {
    return {
      imgUrls: [banner1, banner2, banner3],
      navUrl: nav
    }
  },
  getters: {

  },
  mutations: {

  },
  actions: {

  }
}
