import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Mainpage'
import Post from '@/components/Postpage'
import Signup from '@/components/Signuppage'
import Exchangelist from '@/components/Exchangelistpage'
import User from '@/components/Userpage'

Vue.use(Router)

export const router = new Router({
 mode: 'history',
 routes: [
   {
     path: '/',
     name: 'main',
     component: Main
   },
   {
     path: '/user',
     name: 'user',
     component: User
   },
   {
     path: '/post',
     name: 'post',
     component: Post
   },
   {
     path: '/signup',
     name: 'signup',
     component: Signup
   },
   {
     path: '/exchangelist',
     name: 'exchangelist',
     component: Exchangelist
   }
 ]
})