import Vue from 'vue'
import VueRouter from 'vue-router'

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
        { path: '/home', component: Home },
        { path: '/cart', component: Cart },
        { path: '/user', component: User },
        { path: '/category', component: Category }
      ]
    },
    { path: '/search', component: Search },
    { path: '/searchList', component: SearchList },
    { path: '/pay', component: Pay },
    { path: '/myorder', component: MyOrder },
    { path: 'prodetail', component: ProDetail },
    { path: '*', component: NotFind }
  ]
})

export default router
