<template>
	<v-app id="app">
		<navigation></navigation>
		
		<announcer :visible="alert.visible"
							 :text="alert.text"
							 :type="alert.type"
							 :top="alert.top"
							 :right="alert.right"
							 :left="alert.left"
							 @show="showAnnouncer"
							 @hide="hideAnnouncer"
		></announcer>
	
		<v-fade-transition mode="out-in" duration type="animation">

			<v-main light>
				<v-container fluid>
					<v-layout align-center justify-center>
						<v-flex>
        			<router-view :key="$route.fullPath"></router-view>

							<congratulations :show="dialog.visible"
															 :organization="dialog.organization"
															 :email="dialog.email"
							></congratulations>
						</v-flex>
					</v-layout>
				</v-container>
			</v-main>
		</v-fade-transition>
		
		<v-footer app>
			<span></span>
		</v-footer>
	</v-app>
</template>

<script>
import Announcer from './components/Announcer.vue'
import Navigation from './components/Navigation.vue'
import EventBus from './helpers/eventBus.js'
import Congratulations from './components/Congratulations.vue'

export default {
	name: 'app',
	components: {
		Announcer,
		Navigation,
		Congratulations,
	},
	metaInfo: {
		titleTemplate: 'Organization Manager | %s'
	},
	data() {
		return {
			dialog: {
				visible: false,
				organization: '',
				email: ''
			},
			alert: {
        visible: false,
        text: '',
        type: 'success',
				top: true,
				right: true,
				left: false
      }
		}
	},
	mounted() {
		if (process.env.VUE_APP_MODE === 'development') {
			console.log('node_env: ', process.env.NODE_ENV)
			console.log('clientid: ', process.env.VUE_APP_AUTH0_CLIENT_ID)
			console.log('auth0 domain: ', process.env.VUE_APP_AUTH0_DOMAIN)
			console.log('vue app api host: ', process.env.VUE_APP_API_HOST)
			console.log('vue app domain: ', process.env.VUE_APP_DOMAIN)
			console.log('vue app audience: ', process.env.VUE_APP_AUTH0_AUDIENCE)
		}
		EventBus.$on('announce', this.makeAnnouncement)
		EventBus.$on('dialog', this.makeDialog)
		EventBus.$on('hideDialog', this.hideDialog)
	},
	methods: {
		makeDialog ({ organization='org-name', email='email' }) {
			this.dialog.organization = organization
			this.dialog.email = email
			this.dialog.visible = true
		},
		hideDialog () {
			this.dialog.visible = false
		},
		makeAnnouncement ({ text='announcement text', type='success', top=true, right=true, left=false }) {
			this.alert.text = text
			this.alert.type = type
			this.alert.top = top
			this.alert.right = right
			this.alert.left = left
			this.alert.visible = true
		},
		showAnnouncer () {
			this.alert.visible = true
		},
		hideAnnouncer () {
			this.alert.visible = false
		}
	}
}
</script>
