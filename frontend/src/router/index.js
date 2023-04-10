import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue') // set home as path '/'
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    component: () => import("../views/DetailPage.vue")
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import("../views/SearchPage.vue")
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import("../views/AdminPage.vue")
  },
  {
    path: '/booking',
    name: 'Booking',
    component: () => import("../views/BookingPage.vue")
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router