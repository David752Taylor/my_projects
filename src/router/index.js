import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '@/store'

// 引入 vant 组件库
import '@/utils/vant-ui'

// 一级路由
import Login from '@/views/login'
import Layout from '@/views/layout'
import Search from '@/views/search'
import SearchList from '@/views/search/list.vue'
import Pay from '@/views/pay'
import MyOrder from '@/views/myorder'
import ProDetail from '@/views/prodetail'
import AddressList from '@/views/address'
import NotFind from '@/views/notfind'

// 二级路由
import Home from '@/views/layout/home.vue'
import Cart from '@/views/layout/cart.vue'
import User from '@/views/layout/user.vue'
import Category from '@/views/layout/category.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/login', component: Login },
    {
      path: '/',
      component: Layout,
      children: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: Home }, // 首页
        { path: '/cart', component: Cart }, // 购物车
        { path: '/user', component: User }, // 我的
        { path: '/category', component: Category } // 分类
      ]
    },
    { path: '/search', component: Search }, // 搜索
    { path: '/searchlist', component: SearchList }, // 搜索列表
    { path: '/prodetail/:id?', component: ProDetail }, // 商品详情
    { path: '/pay', component: Pay }, // 支付
    { path: '/order', component: MyOrder }, // 我的订单
    { path: '/address', component: AddressList }, // 收货地址
    { path: '*', component: NotFind } // 无页面
  ]
})

const authUrls = ['/pay', '/myorder']

router.beforeEach((to, from, next) => {
  if (!authUrls.includes(to.path)) {
    next()
  } else {
    const token = store.getters.token
    if (token) {
      next()
    } else {
      next('/login')
    }
  }
})

export default router
