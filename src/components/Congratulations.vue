<template>
  <v-container>
    <v-row justify="space-around">
      <v-col cols="auto">
        <v-dialog v-model="show" persistent transition="dialog-bottom-transition" max-width="80%">

          <v-card>
            <v-toolbar dark color="primary">
              <v-btn icon dark @click="hide()">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>

            <v-container>
              <v-row justify="center">
                <v-col cols="12">

                  <v-card-title class="text-h2">
                    Congratulations !
                  </v-card-title>

                  <v-card-title class="text-h3 info--text">
                    {{ organization }}
                  </v-card-title>

                  <v-card-title class="text-h5">
                    Congratulations! Your new "{{organization}}" organization has been created. An invitation to the organization has been sent to {{email}}`
                  </v-card-title>
                  <v-card-title class="text-h5">
                    Please check your email to login to your new organization.
                  </v-card-title>

                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>  
</template>

<script>
import EventBus from '@/helpers/eventBus.js'

export default {
  name: 'Congratulations',
  data () {
    return {}
  },
  props: {
    show: {
      type: Boolean,
      default: true
    },
    organization: {
      type: String,
      required: true
    }, 
    email: {
      type: String,
      required: true
    }
  },
  methods: {
    hide () {
      EventBus.$emit('hideDialog', {})
    }
  }
}
</script>

<style>

</style>