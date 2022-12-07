<template>
  <v-card class="pa-6" color="surface">
    <v-card-title>Invite Broker</v-card-title>
    <v-card-text>
      This page allows a Carrier to invite a new Broker organization. 
    </v-card-text>
    
    <v-card class="pa-6">
      <create-broker></create-broker>
    </v-card>

  </v-card>
</template>

<script>
import CreateBroker from './CreateBroker.vue'

export default {
  name: 'BrokerCreator',
  components: {
    CreateBroker
  },
  data () {
    return {
    }
  },
  methods: {}
}
</script>

