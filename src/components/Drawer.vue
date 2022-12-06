<template>
		<v-navigation-drawer app 
                         floating
                         clipped
                         dark
                         permanent
                         class="dark"
    >

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            <v-chip class="ma-2" color="primary">
              {{ orgType }}
            </v-chip>
            {{ orgDisplayName }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>      
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>title</v-list-item-title>
          </v-list-item-content>
        
        
        <!-- <v-tab to="/join" v-if="orgType	== 'Carrier'">
						<v-icon>{{ icons.mdiAccountPlus }}</v-icon>
						Join Us!
					</v-tab>
					<v-tab to="/administrator" v-if="hasRole('Administrator')">
						<v-icon>{{ icons.mdiDeveloperBoard }}</v-icon>
						Administrator
					</v-tab> -->
        
        
        </v-list-item>
      </v-list>
    </v-navigation-drawer>  
</template>

<script>
export default {
  name: 'Drawer',
  data () {
    return {
    }
  },
  computed: {
    orgId () {
      const clientID = process.env.VUE_APP_AUTH0_CLIENT_ID
			const data = this.$auth.isAuthenticated ? this.$auth.user.org_id : ''
      return data
    },
    orgDisplayName () {
      const clientID = process.env.VUE_APP_AUTH0_CLIENT_ID
			const data = this.$auth.isAuthenticated ? this.$auth.user[`${clientID}/data`] : { }
      const display_name = data?.org?.display_name || ''
      return display_name
    },
    orgType () {
      const clientID = process.env.VUE_APP_AUTH0_CLIENT_ID
			const data = this.$auth.isAuthenticated ? this.$auth.user[`${clientID}/data`] : { }
      const orgType = data?.org?.type || ''
      return orgType
    }
  },
  methods: {
    hasRole (rolename) {
			if (!this.$auth.isAuthenticated) {
				return false
			}

			const clientID = process.env.VUE_APP_AUTH0_CLIENT_ID
			const data = this.$auth.isAuthenticated ? this.$auth.user[`${clientID}/data`] : { }
			const roles = data?.roles || []
			return roles.includes(rolename)
		}
  }
}
</script>
