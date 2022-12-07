<template>
	<div>
		<!-- Application bar -->

    <v-app-bar
			app
			clipped-left
			absolute 
			:dark="isDark"
			:light="!isDark"
			:src="ribbon"
		>
			<!-- App Bar background image -->
			<template v-slot:img="{ props }">
        <v-img v-bind="props"></v-img>
      </template>

			<!-- Main Logo -->
			<v-toolbar-title>
				<a id="logo" :href="links.fsisacHomeURL" target="__blank">
					<v-img :src="logo" contain></v-img>
				</a>
			</v-toolbar-title>

			<!-- Centered Title -->
			<v-spacer></v-spacer>
			<h2>Okta CIC Demonstration</h2>
			<v-spacer></v-spacer>

			<!-- Login / Logout -->
			<v-toolbar-title>
				<v-avatar rounded color="white" v-if="$auth.isAuthenticated">
					<org-logo :orgId="orgId" :maxHeight="50" :maxWidth="50"></org-logo>
				</v-avatar>
				<v-chip v-if="$auth.isAuthenticated" pill class="ml-4 white">
            {{ orgType }}
				</v-chip>

				<v-btn v-if="$auth.isAuthenticated" dark class="success ma-6" @click="logout()">
					Logout
					<v-icon>{{ icons.mdiLogoutVariant }}</v-icon>
				</v-btn>
				<v-btn v-else dark class="success ma-6" @click="authenticate()">
					Login
					<v-icon>{{ icons.mdiLoginVariant }}</v-icon>
				</v-btn>
			</v-toolbar-title>

			<!-- Link to Documentation -->
			<v-toolbar-title>
				<a id="auth0docs" :href="links.auth0docsURL" target="__blank">
					<v-img :src="images.auth0docs" contain></v-img>
				</a>
			</v-toolbar-title>

			<!-- Theme Selector -->
			<v-menu left bottom>
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon v-bind="attrs" v-on="on">
						<v-icon>mdi-dots-vertical</v-icon>
					</v-btn>
				</template>

        <v-list>

          <v-list-item @click="setTheme('dark')">
            <v-list-item-title>Dark Theme</v-list-item-title>
          </v-list-item>

					<v-list-item @click="setTheme('light')">
            <v-list-item-title>Light Theme</v-list-item-title>
          </v-list-item>
        </v-list>
			</v-menu>

			<!-- Tab Navigation -->
      <!-- <template v-slot:extension>
        <v-tabs centered :dark="isDark" :light="!isDark">
          <v-tab to="/">
						<v-icon>{{ icons.mdiHomeCircle }}</v-icon>
						About
					</v-tab>
					<v-tab to="/profile" v-if="$auth.isAuthenticated">
						<v-icon>{{ icons.mdiAccountCircle }}</v-icon>
						My Dashboard
					</v-tab>
        </v-tabs>
      </template> -->
    </v-app-bar>

		<!-- Navigation Drawer -->
		<drawer v-if="$auth.isAuthenticated"></drawer>
	</div>
</template>

<script>
import {
	mdiCogOutline,
	mdiHomeCircle,
	mdiLoginVariant,
	mdiLogoutVariant,
	mdiAccountCircle,
	mdiAccountPlus,
	mdiDeveloperBoard,

} from '@mdi/js'
import Drawer from '@/components/Drawer.vue'
import OrgLogo from '@/components/OrgLogo.vue'

export default {
	name: 'Navigation',
	components: {
		Drawer,
		OrgLogo
	},
	data: () => ({
		links: {
			oktahomeURL: 'https://www.okta.com/',
			fsisacHomeURL: 'https://www.fsisac.com',
			auth0docsURL: 'https://auth0.com/docs',
		},
		images: {
			auth0docs: require('../assets/auth0docs.svg'),
		},
		icons: {
			mdiCogOutline,
			mdiHomeCircle,
			mdiLoginVariant,
			mdiLogoutVariant,
			mdiAccountCircle,
			mdiAccountPlus,
			mdiDeveloperBoard
		}
	}),
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
    }
	},
	methods: {
    // https://auth0.com/blog/complete-guide-to-vue-user-authentication/#Add-User-Authentication
		async authenticate (organization) {
			if (!this.$auth.isAuthenticated) {
				this.login(organization)
			}
		},
		async login (organization) {
			// https://auth0.github.io/auth0-spa-js/interfaces/redirectloginoptions.html
			if (!this.$auth.isAuthenticated) {
				const options = {
					scope: 'openid profile email',
					organization 
				}
				this.$auth.loginWithRedirect(options)
			}
		},
		async logout () {
			if (this.$auth.isAuthenticated) {
				// https://auth0.github.io/auth0-spa-js/interfaces/logoutoptions.html
				this.$auth.logout({ returnTo: process.env.VUE_APP_DOMAIN })
        this.$router.push({ path: '/' })
			}
		},
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

