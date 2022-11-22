<template>
  <v-card>

    <!-- Banner Card -->
    <v-card :dark="!isDark" :light="isDark" >
      <v-img height="250px" :src="otherRibbon">
        <v-container container fill-height fluid>
          <v-row align="center" justify="center">
            <v-col>

              <!-- <v-card-title class="justify-center">
                <h1>Join Financial Firms Around the World</h1>
              </v-card-title>
              <v-card-title class="justify-center">
                <h1>Become an FS-ISAC Member</h1>
              </v-card-title>
              <v-card-text class="text-center">
                  The only global cyber intelligence sharing community solely focused on financial services
              </v-card-text> -->

            </v-col>
          </v-row>
        </v-container>
      </v-img>
    </v-card>

    <v-card class="pa-6">
      <v-card-text>
        This page will be where a developer can signup for his / her website to permit users to
        login with their FS-ISAC social network credentials.
      </v-card-text>
    </v-card>

  </v-card>
</template>

<script>
export default {
  name: 'Social',
  data () {},
  methods: {}
}
</script>