<template>
  <v-card>

    <!-- Banner Card -->
    <banner :titles="banner.titles" :texts="banner.texts"></banner>

    <v-card class="pa-6">
      <v-row>
        <v-col cols=5>
          <v-card>
            <v-card-title>
              <h1>Keep your Profile up to date!</h1>
            </v-card-title>
            <v-card-text>

              <v-card-title class="primary--text">Join the FS-ISAC Member Network</v-card-title>
              <v-card-text>
                Simplify logging into the platforms of other major providers in our network.
              </v-card-text>

              <v-card-title class="primary--text">Why Maintain my Profile?</v-card-title>
              <v-card-text>
                Share the information here with the providers to help them better service your needs.
              </v-card-text>

            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols=7>
          <v-card color="surface">
            <v-progress-linear :indeterminate="progress.indeterminate" value="100" height="20" class="primary--text"></v-progress-linear>
            
            <v-list-item class="px-2">
              <v-list-item-avatar>
                <img :src="profile.picture" :alt="profile.name">
              </v-list-item-avatar>
              <v-list-item-title>
                {{ profile.email }}
              </v-list-item-title>
            </v-list-item>

            <v-list-item class="px-2">
              <v-list-item-title v-if="hasRole('Administrator')">
                User has the <span class="red--text">Administrator</span> role in the organization.
              </v-list-item-title>
            </v-list-item>
            <v-list-item class="px-2">
              <v-list-item-title v-if="hasRole('Member')">
                User has the <span class="blue--text">Member</span> role in the organization.
              </v-list-item-title>
            </v-list-item>

            <v-card-text>
              Manage your personal, contact, and security information.
            </v-card-text>

            <v-form>
              <v-container fluid>
                <v-row>
                  <v-col cols=6 class="px-8">
                    <v-text-field
                      v-model="profile.given_name"
                      label="First Name"
                      :disabled="isDisabled"
                      outlined
                    ></v-text-field>

                    <v-text-field
                      v-model="profile.email"
                      label="Email"
                      outlined
                      disabled
                    ></v-text-field>
                  </v-col>

                  <v-col cols=6 class="px-8">
                    <v-text-field
                      v-model="profile.family_name"
                      label="Last Name"
                      :disabled="isDisabled"
                      outlined
                    ></v-text-field>

                    <v-text-field
                      v-model="profile.nickname"
                      label="Nickname"
                      :disabled="isDisabled"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row align="center">
                  <v-col cols="12" class="px-8">

                    <v-text-field
                      v-model="profile.picture"
                      label="Picture URL"
                      :disabled="isDisabled"
                      outlined
                    ></v-text-field>

                    <v-checkbox
                      v-model="profile.enableMFA"
                      label="Enable MFA"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>

            <v-divider></v-divider>

            <v-card-text v-if="isDisabled">
              NOTE: We cannot update the user profile when the user comes in from the {{ connection }} connection. Please
              update the user profile with that identity provider.
            </v-card-text>

            <v-card-actions class="pa-4">
              <v-container>
                <v-row>
                  <v-col cols=12>
                    <v-btn class="primary" block @click="saveChanges" :disabled="isDisabled">
                      Save Changes
                    </v-btn>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-actions>
          </v-card>

        </v-col>
      </v-row>
    </v-card>
  </v-card>
</template>

<script>
import Banner from '@/components/Banner.vue'
import EventBus from './../helpers/eventBus.js'

export default {
  name: 'Profile',
  metaInfo: {
    title: 'User Profile',
  },
  components: {
    Banner
  },
  data () {
    return {
      banner: {
        titles: [
          'Building a network of finanancial security professionals'
        ],
        texts: [
          'Join our network to access others with your expertise'
        ]
      },
      profile: {
        email: '',
        given_name: '',
        family_name: '',
        nickname: '',
        name: '',
        picture: '',
        enableMFA: false
      },
      progress: {
        indeterminate: false
      }
    }
  },
  async created () {
    const profile = await this.fetchProfile()
    
    this.profile.email = profile.data.email,
    this.profile.given_name = profile.data.given_name,
    this.profile.family_name = profile.data.family_name,
    this.profile.nickname = profile.data.nickname,
    this.profile.name = profile.data.name,
    this.profile.picture = profile.data.picture
    
    // console.log(profile.data)
  },
  computed: {
    logoIsAvailable () {
      return this.org && this.org.branding && this.org.branding.logo_url
    },
    orgNameIsAvailable () {
      return this.org && this.org.display_name
    },
    connection () {
      return this.$auth.user?.sub.split('|')[0]
    },
    isDisabled () {
      if (!this.connection) { return false }
      return !['auth0', 'email', 'sms'].includes(this.connection)
    },
    roles () {
      if (!this.$auth.isAuthenticated) {
				return []
			}

			const clientID = process.env.VUE_APP_AUTH0_CLIENT_ID
			const data = this.$auth.isAuthenticated ? this.$auth.user[`${clientID}/data`] : { }
			const roles = data?.roles || []
      return roles
    }
  },
  methods: {
    async fetchProfile () {
      const userId = this.$auth.user.sub
      const accesstoken = await this.$auth.getTokenSilently()
      const response = await this.$http(accesstoken).get(`/users/${userId}`)
      return response.data
    },
    async saveChanges () {
      this.progress.indeterminate = true
      const accesstoken = await this.$auth.getTokenSilently()
      const body = {
        given_name: this.profile.given_name,
        family_name: this.profile.family_name,
        nickname: this.profile.nickname,
        name: this.profile.name,
        picture: this.profile.picture,
        user_metadata: {
          enableMFA: this.profile.enableMFA
        }
      }
      const response = await this.$http(accesstoken).patch(`/users/${this.$auth.user.sub}`, body)
      const announcement = {
        text: response.data.message,
        type: response.data.success ? 'success' : 'error',
        top: true,
        right: true,
        left: false
      }
      EventBus.$emit('announce', announcement)
      this.progress.indeterminate = false
      return response.data
    },
    hasRole (rolename) {
      return this.roles.includes(rolename)
    }
  }
}
</script>
