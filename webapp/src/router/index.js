import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main'
// import Login from '@/views/Login'
// import Register from '@/views/Register'
import Photos from '@/views/Photos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name: 'main_view',
      component: Main
    },
    {
      path: '/photos',
      name: 'photos',
      component: Photos
    }
    // {
    //   path: '/login',
    //   name: 'login_view',
    //   component: Login
    // },
    // {
    //   path: '/register',
    //   name: 'register_view',
    //   component: Register
    // }
  ]
})
