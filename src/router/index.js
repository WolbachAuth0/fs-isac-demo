import Vue from 'vue'
import Router from 'vue-router'
import { authenticationGuard, roleGuardian } from "@/helpers/authenticationGuard";
import Meta from 'vue-meta'

// Views
import Home from '@/views/Home.vue'
import JoinUp from '@/views/JoinUp.vue'
import Tokens from '@/views/Tokens.vue'
import Profile from '@/views/Profile.vue'
import Dashboard from '@/views/Dashboard.vue'

Vue.use(Meta, {
	keyName: 'metaInfo',
	attribute: 'data-vue-meta',
	tagIDKeyName: 'vmid',
	refreshOnceOnNavigation: true
})
Vue.use(Router)

// ?invitation=bf0ZSEo1KDATKrzoCMage9tWT0SwAyJ8&organization=org_Fxi2QqCuSYrk8rVd&organization_name=okta
// https://auth0.com/docs/authenticate/login/auth0-universal-login/configure-default-login-routes#invite-organization-members

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
    {
      path: '/administrator',
      name: 'Administrator Dashboard',
      component: Dashboard,
      beforeEnter: roleGuardian('Administrator')
    },
  ]
})

export default router
