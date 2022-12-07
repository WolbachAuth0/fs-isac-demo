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
      Use the broker dashboard to interact with the application.
    </v-card-text>

    <v-tabs v-model="tab">
      <v-tabs-slider color="blue"></v-tabs-slider>
      <v-tab key="overview" @click="tabChange">Overview</v-tab>
      <v-tab key="inviter" @click="tabChange">Add Brokers</v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item key="overview">
        <broker-overview :count="counts[0]"></broker-overview>
      </v-tab-item>

      <v-tab-item key="inviter">
        <broker-creator :count="counts[1]"></broker-creator>
      </v-tab-item>
    </v-tabs-items>

  </v-card>
</template>

<script>
import BrokerOverview from '@/components/Carrier/BrokerOverview.vue'
import BrokerCreator from '@/components/Carrier/BrokerCreator.vue'

export default {
  name: 'CarrierDashboard',
  metaInfo: {
    title: 'Carrier Dashboard',
  },
  components: {
    BrokerOverview,
    BrokerCreator
  },
  data () {
    return {
      tab: null,
      counts: [ 0, 0 ],
      org: {},
      orgAvailable: false,
    }
  },
  async created () {
    const response = await this.fetchOrg()
    this.org = response.data
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
    },
    tabChange (tabnumber) {
      this.counts[tabnumber]++
    }
  }
}
</script>