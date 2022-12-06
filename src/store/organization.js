export default {
  state: {
    org: {
      id: '',
      display_name: '',
      name: '',
      branding: {
        color: {
          primary: '',
          background: ''
        },
        logo_url: ''
      },
      metadata: {
        enableMFA: 'false',
        type: ''
      }
    }
  },
  getters: {
    logoIsAvailable (state) {
      return !!state.org.branding.logo_url
    },
    orgNameIsAvailable (state) {
      return !!state.org.display_name
    }
  },
  mutations: {
    // example (state, payload) {
    //   // state is local state
    //   // payload is passed to the mutation
    // },
    updateOrgState (state, org) {
      
    }
  },
  actions: {
    async fetchOrg ({ state, commit, rootState }) {
      const orgID = this.$auth.user.org_id
      const accesstoken = await this.$auth.getTokenSilently()
      const response = await this.$http(accesstoken).get(`/organizations/${orgID}`)
      commit('updateOrgState', response.data)
    }
  }
}