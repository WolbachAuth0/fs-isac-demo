<template>
  <v-card>

    <v-card-title>
      <v-chip class="ma-2" color="primary" v-if="orgTypeIsAvailable">
        {{ org.metadata.type }}
      </v-chip>

      <v-avatar tile v-if="logoIsAvailable" class="pr-4">
        <v-img :src="org.branding.logo_url" max-height="40" max-width="40" ></v-img>
      </v-avatar>
      <v-avatar tile v-else>
        <v-progress-circular :size="40" color="primary" indeterminate></v-progress-circular>
      </v-avatar>

      <h2 v-if="orgNameIsAvailable">{{ org.display_name }}</h2>
    </v-card-title>

    <v-card-text>
      Use this page for a general user to interact with the FS-ISAC application.
    </v-card-text>

    <v-tabs v-model="tab">
      <v-tabs-slider color="blue"></v-tabs-slider>
      <v-tab key="overview">Application</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item key="overview">
        
        <v-card class="pa-6" color="surface">
          <v-card-title>User Portal</v-card-title>
          <v-card-text>
            This page is where any user with the "Member" role would interact with the application.
          </v-card-text>
          
          <v-card class="pa-6">
            <v-card-title>
              Application
            </v-card-title>

            <v-card-text>
              General work in the application happens here.
            </v-card-text>
          </v-card>

        </v-card>


      </v-tab-item>
    </v-tabs-items>

  </v-card>
</template>

<script>
export default {

  name: 'Dashboard',
  metaInfo: {
    title: 'Dashboard',
  },
  data () {
    return {
      tab: null,
      user: {},
      org: {},
      orgAvailable: false,
    }
  },
  async created () {
    const response = await this.fetchOrg()
    this.org = response.data
    if (process.env.VUE_APP_MODE === 'development') {
      console.log('mounted: Dashboard')
      console.log(response.data)
    }
  },
  computed: {
    logoIsAvailable () {
      return !!this.org?.branding?.logo_url
    },
    orgNameIsAvailable () {
      return !!this.org?.display_name
    },
    orgTypeIsAvailable () {
      return !!this.org?.metadata?.type
    }
  },
  methods: {
    async fetchOrg () {
      const orgID = this.$auth.user.org_id
      const accesstoken = await this.$auth.getTokenSilently()
      const response = await this.$http(accesstoken).get(`/organizations/${orgID}`)
      return response.data
    }
  }
}
</script>