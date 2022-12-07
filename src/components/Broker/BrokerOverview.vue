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
        <template v-slot:item.id="{ item }">
          <v-avatar rounded class="light-blue lighten-4">
            <org-logo :orgId="item.id" :maxHeight="40" :maxWidth="40"></org-logo>
          </v-avatar>
        </template>
      
        <template v-slot:item.metadata.type="{ item }">
          <v-chip :color="chipColor(item.metadata.type)">
           {{ item.metadata.type }}
          </v-chip>
        </template>

      </v-data-table>
    </v-card>

  </v-card>
</template>

<script>
import OrgLogo from '@/components/OrgLogo.vue'

export default {
  name: 'BrokerOverview',
  components: {
    OrgLogo
  },
  data () {
    return {
      table: {
        headers: [
          { text: 'Logo', value: 'id', sortable: false, align: 'start' },
          { text: 'Name', value: 'display_name', sortable: true },
          { text: 'Type', value: 'metadata.type', sortable: true }
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
      return response.data
    },
    chipColor (typestring) {
      return typestring == 'Carrier' ? 'primary' : 'secondary'
    }
  }
}
</script>

<style scoped>

</style>