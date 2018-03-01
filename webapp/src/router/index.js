import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main'
import Login from '@/views/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      name: 'main_view',
      component: Main
    },
    {
      path: '/login',
      name: 'login_view',
      component: Login
    }
  ]
})
