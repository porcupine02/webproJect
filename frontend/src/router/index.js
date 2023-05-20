import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    // meta: {guess : true},
    component: () => import('../views/HomePage.vue') // set home as path '/'
  },
  {
    path: '/detail/:id',
    name: 'Detail',
    meta: { login: true },
    component: () => import("../views/DetailPage.vue")
  },
  {
    path: '/admin',
    name: 'Admin',
    meta: { login: true },
    component: () => import("../views/AdminPage.vue")
  },
  {
    path: '/invoice',
    name: 'Invoice',
    meta: { login: true },
    component: () => import('../views/invoicePage.vue')
  },
  {
    path: '/booking',
    name: 'Booking',
    meta: { login: true },

    component: () => import('../views/BookingPage.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    meta: { login: true },
    component: () => import('../views/ProfilePage.vue')
  },
  {
    path: '/forgot',
    name: 'Forgot',

    component: () => import('../views/ForgotPassPage.vue')
  },
  {
    path: '/createRoom',
    name: 'CreateRoom',
    meta: { login: true },
    component: () => import('../views/CreatePage.vue')
  },
  {
    path: '/editroom/:id',
    name: 'EditRoom',
    meta: { login: true },
    component: () => import('../views/EditRoomPage.vue')
  }

]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  const isLoggedIn = !!localStorage.getItem('user')
  
  if (to.meta.login && !isLoggedIn) {
   
    alert('please login first')
    next({ path: '/' })
  }

  next()
})

export default router