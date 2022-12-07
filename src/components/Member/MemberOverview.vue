<template>
  <v-card class="pa-6" color="surface">
    <v-card-title>User Portal</v-card-title>
    <v-card-text>
      This page is where a user with the "Member" role would interact with the application.
    </v-card-text>
    
    <v-card class="pa-6">
      
    </v-card>

  </v-card>
</template>

<script>
import OrgLogo from '@/components/OrgLogo.vue'

export default {
  name: 'MemberOverview',
  components: {
    OrgLogo
  },
  data () {
    return {}
  },
  methods: {}
}
</script>

<style scoped>

</style>