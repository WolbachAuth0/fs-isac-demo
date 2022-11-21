import Vue from 'vue'
import Router from 'vue-router'
import { authenticationGuard, roleGuardian } from "@/helpers/authenticationGuard";
import Meta from 'vue-meta'

// Views
import Home from '@/views/Home.vue'
import Tokens from '@/views/Tokens.vue'
import Profile from '@/views/Profile.vue'
import JoinUp from '@/views/JoinUp.vue'

Vue.use(Meta, {
	keyName: 'metaInfo',
	attribute: 'data-vue-meta',
	tagIDKeyName: 'vmid',
	refreshOnceOnNavigation: true
})
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Home
    },
    {
      path: '/join',
      name: 'Register Institution',
      component: JoinUp,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: authenticationGuard
    },
    {
      path: '/tokens',
      name: 'Tokens',
      component: Tokens,
      beforeEnter: authenticationGuard
    },
    
    // {
    //   path: '/dashboard',
    //   name: 'Admin Dashboard',
    //   component: Dashboard,
    //   beforeEnter: roleGuardian('Administrator')
    // },
  ]
})

export default router
