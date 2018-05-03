import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main'
// import Login from '@/views/Login'
// import Register from '@/views/Register'
import Photos from '@/views/Photos'
import UserPage from '@/views/UserPage'
import UserCenter from '@/views/UserCenter'
import photoList from '@/views/photoList'
import Books from '@/views/Books'
import Magazines from '@/views/Magazines'

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
    },
    {
      path: '/userpage',
      name: 'userpage',
      component: UserPage
    },
    {
      path: '/usercenter',
      name: 'usercenter',
      component: UserCenter
    },
    {
      path: '/photoList',
      name: 'photoList',
      component: photoList
    },
    {
      path: '/magin',
      name: 'magin',
      component: Magazines
    },
    {
      path: '/books',
      name: 'books',
      component: Books
    }
  ]
})
