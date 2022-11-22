<template>
  <v-card>

    <!-- Banner Card -->
    <banner :titles="banner.titles" :texts="banner.texts"></banner>

    <v-card class="pa-6">
      <v-card-title>
        User Profile
      </v-card-title>

      <v-card-text>
        Manage your personal, contact, and security information.
      </v-card-text>

      <v-card class="pa-6" color="surface">
        <v-row>
          <v-col cols="2">
            <v-list-item class="px-2">
              <v-list-item-avatar>
                <img :src="profile.picture" :alt="profile.name">
              </v-list-item-avatar>
              <v-list-item-title>
                Avatar
              </v-list-item-title>
            </v-list-item>
          </v-col>

          <v-col cols="8">
            <v-text-field v-model="profile.picture" label="Picture URL" :disabled="isDisabled"></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="3">
            <v-text-field v-model="profile.given_name" label="First Name" :disabled="isDisabled"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="profile.family_name" label="Last Name" :disabled="isDisabled"></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="profile.email" label="Email" disabled></v-text-field>
          </v-col>
          <v-col cols="3">
            <v-text-field v-model="profile.nickname" label="Nickname" :disabled="isDisabled"></v-text-field>
          </v-col>
        </v-row>
      </v-card>

      <v-divider></v-divider>

      <v-card-text v-if="isDisabled">
        NOTE: We cannot update the user profile when the user comes in from the {{ connection }} connection. Please
        update the user profile with that identity provider.
      </v-card-text>

      <v-card-actions>
        <v-btn color="primary" @click="saveChanges" :disabled="isDisabled">
          Save Changes
        </v-btn>
      </v-card-actions>
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
        ],
        texts: [
          'Update your user profile from here'
        ]
      },
      profile: {
        email: '',
        given_name: '',
        family_name: '',
        nickname: '',
        name: '',
        picture: ''
      },
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
    
    console.log(profile.data)
  },
  computed: {
    logoIsAvailable () {
      return this.org && this.org.branding && this.org.branding.logo_url
    },
    orgNameIsAvailable () {
      return this.org && this.org.display_name
    },
    connection () {
      return this.$auth.user.sub.split('|')[0]
    },
    isDisabled () {
      return !['auth0', 'email', 'sms'].includes(this.connection)
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
      const accesstoken = await this.$auth.getTokenSilently()
      const body = {
        given_name: this.profile.given_name,
        family_name: this.profile.family_name,
        nickname: this.profile.nickname,
        name: this.profile.name,
        picture: this.profile.picture
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
      console.log(response.data)
      return response.data
    }
  }
}
</script>
