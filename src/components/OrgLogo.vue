<template>
    <v-img :src="logo_url"
           :max-height="maxHeight"
           :max-width="maxWidth"
           v-if="logo_url"
    ></v-img>
</template>

<script>
export default {
  name: 'OrgLogo',
  data () {
    return {
      logo_url: ''
    }
  },
  props: {
    orgId: String,
    maxHeight: {
      type: Number,
      default: 25
    },
    maxWidth: {
      type: Number,
      default: 25
    }
  },
  async mounted () {
    const org = await this.fetchOrg()
    this.logo_url = org.data?.branding?.logo_url || ''
  },
  methods: {
    async fetchOrg () {
      const accesstoken = await this.$auth.getTokenSilently()
      const response = await this.$http(accesstoken).get(`/organizations/${this.orgId}`)
      return response.data
    },
  }
}
</script>
