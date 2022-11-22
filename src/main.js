import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from '@/App.vue'

// plugins
import Axios from '@/plugins/axios'
import vuetify from '@/plugins/vuetify'
import { Auth0Plugin } from '@/plugins/auth0'

// mixins
import ThemeMixin from '@/mixins/ThemeToggle'
import router from './router'
import store from '@/store'

Vue.use(Vuelidate)
Vue.use(Axios)
Vue.use(Auth0Plugin, {
  domain: process.env.VUE_APP_CUSTOM_DOMAIN,
  clientId: process.env.VUE_APP_AUTH0_CLIENT_ID,
  audience: process.env.VUE_APP_AUTH0_AUDIENCE,
  onRedirectCallback: (appState) => {
    router.push(appState && appState.targetUrl ? appState.targetUrl : window.location.pathname)
  }
})
Vue.config.errorHandler = function (err, vm, info) {
  console.error(err)
  console.log(info)
}
Vue.config.productionTip = false
Vue.mixin(ThemeMixin)

new Vue({
  router,
  store,
  vuetify,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')
