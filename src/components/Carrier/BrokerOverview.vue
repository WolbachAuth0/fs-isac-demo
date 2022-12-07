<template>
  <v-card class="pa-6" color="surface">
    <v-card-title>Organization List</v-card-title>
    <v-card-text>
      This shows a list of all broker organizations provisioned for the application.
    </v-card-text>
    
    <v-card class="pa-6">
      <v-data-table :headers="table.headers"
                    :items="brokers"
                    :items-per-page="5"
                    class="elevation-1"
      >
        <template v-slot:item.branding.logo_url="{ item }">
          <v-avatar rounded class="light-blue lighten-4">
            <v-img :src="item.branding.logo_url"
                   :max-height="40"
                   :max-width="40"
                   v-if="item.branding.logo_url"
            ></v-img>
            <v-progress-circular indeterminate
                                 color="primary"
                                 :size="40"
                                 v-else
            ></v-progress-circular>
          </v-avatar>
        </template>
      
        <template v-slot:item.metadata.type="{ item }">
          <v-chip :color="chipColor(item.metadata.type)">
           {{ item.metadata.type }}
          </v-chip>
        </template>

        <template v-slot:item.id="{ item }">
          <v-btn class="mx-2" fab small color="error" @click="deleteBroker(item.id)">
            <v-icon dark color="white">mdi-delete</v-icon>
          </v-btn>
        </template>

      </v-data-table>
    </v-card>

  </v-card>
</template>

<script>
import EventBus from '../../helpers/eventBus.js'


export default {
  name: 'BrokerOverview',
  data () {
    return {
      table: {
        headers: [
          { text: 'Logo', value: 'branding.logo_url', sortable: false, align: 'start' },
          { text: 'Name', value: 'display_name', sortable: true },
          { text: 'Type', value: 'metadata.type', sortable: true },
          { text: 'Edit', value: 'id', sortable: false }
        ]
      },
      brokers: []
    }
  },
  async mounted () {
    const orgs = await this.getOrganizations()
    this.brokers = orgs.data
      .filter(x => x.metadata?.type == 'Broker')
  },
  methods: {
    async getOrganizations () {
      const response = await this.$http(null).get(`/organizations`)
      console.log(response.data.data)
      return response.data
    },
    chipColor (typestring) {
      return typestring == 'Carrier' ? 'primary' : 'secondary'
    },
    async deleteBroker (orgId) {
      const announcement = {
        text: 'WORK IN PROGRESS! Deleting Brokers is not supported yet.',
        type: 'info',
        top: true,
        right: true,
        left: false
      }
      EventBus.$emit('announce', announcement)
    }
  }
}
</script>

<style scoped>

</style>