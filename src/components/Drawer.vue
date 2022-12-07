<template>
		<v-navigation-drawer app 
                         floating
                         clipped
                         dark
                         permanent
                         class="dark"
    >

      <v-list nav>							
				<!-- The user avatar, or empty avatar with login  -->
				<v-list-item v-if="$auth.isAuthenticated" class="px-2" link to="/profile">
					<v-list-item-avatar>
						<img :src="$auth.user.picture" :alt="$auth.user.name">
					</v-list-item-avatar>					
					<v-list-item-content v-if="$auth.isAuthenticated">
						<v-list-item-title class="text-h6">
							{{ $auth.user.name }}
						</v-list-item-title>
						<v-list-item-subtitle>
							{{ $auth.user.email}}
						</v-list-item-subtitle>
					</v-list-item-content>
				</v-list-item>
			</v-list>

      <v-divider></v-divider>

      <v-list dense nav>

        <v-list-item v-if="isType('Carrier')" to="/brokers">
          <v-list-item-icon>
            <v-icon>{{ icons.mdiShieldHome }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              Brokers
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="hasRole('Administrator')" to="/administrator">
          <v-list-item-icon>
            <v-icon>{{ icons.mdiMonitorDashboard }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              Administrator Dashboard
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        
        <v-list-item to="/tokens">
          <v-list-item-icon>
            <v-icon>{{ icons.mdiCogOutline }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              Developer
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

      </v-list>
    </v-navigation-drawer>  
</template>

<script>
import {
  mdiShieldCar,
  mdiShieldHome,
  mdiMonitorDashboard,
  mdiDeveloperBoard,
  mdiCogOutline
} from '@mdi/js'

export default {
  name: 'Drawer',
  data () {
    return {
      icons: {
        mdiShieldHome,
        mdiMonitorDashboard,
        mdiDeveloperBoard,
        mdiCogOutline
      }
    }
  },
  computed: {
    orgId () {
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
    },
    roles () {
      const clientID = process.env.VUE_APP_AUTH0_CLIENT_ID
			const data = this.$auth.isAuthenticated ? this.$auth.user[`${clientID}/data`] : { }
			const roles = data?.roles || []
      return roles
    }
  },
  methods: {
    hasRole (rolename) {
			if (!this.$auth.isAuthenticated) {
				return false
			}
			return this.roles.includes(rolename)
		},
    isType (typestring) {
      return String(typestring).trim().toLowerCase() == String(this.orgType).trim().toLowerCase()
    }
  }
}
</script>
