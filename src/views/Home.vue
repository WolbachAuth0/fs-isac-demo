<template>
  <v-card>

    <!-- Banner Card -->
    <banner :titles="banner.titles" :texts="banner.texts" :button="banner.button"></banner>

    <v-card class="pa-6">
      <v-row>
        <v-col cols=6 offset=1>
          <!-- Terms and Conditions Card -->
          <v-card>
            <v-card-title>
              <h1>{{ main.title }}</h1>
            </v-card-title>
            <v-card-text v-for="(para, i) of main.paragraphs" :key="i">
              
              <v-card-title class="primary--text">{{ para.subtitle }}</v-card-title>
              <div v-for="(text, j) of para.texts" :key="j">
                <v-card-text>
                  {{ text }}
                </v-card-text>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols=4>
          <v-card color="surface">
            <v-progress-linear value="100" height="20" class="primary--text"></v-progress-linear>
            <v-card-title>
              {{ secondary.title }}
            </v-card-title>

            <v-card-text>{{ secondary.text }}</v-card-text>
            
            <v-card-text v-for="(para, i) of secondary.paragraphs" :key="i">             
              <v-card-title class="primary--text">{{ para.subtitle }}</v-card-title>
              <v-card-text>{{ para.text }}</v-card-text>
            </v-card-text>
          </v-card>
        </v-col>

      </v-row>
    </v-card>
  </v-card>
</template>

<script>
import Banner from '@/components/Banner.vue'
export default {
  name: 'Home',
  metaInfo: {
    title: 'Welcome',
  },
  components: {
    Banner
  },
  data () {
    return {
      title: 'Welcome!',
      banner: {
        titles: [
          'Safeguarding the Global Financial',
          'System by Reducing Cyber Risk'
        ],
        texts: [
          'FS-ISAC helps protect the financial sector and the billions of people who rely on it.'
        ],
        button: {
          link: 'https://www.fsisac.com/globalleaders-2022?hsCtaTracking=9be799bb-5e87-45ab-a1db-68521d8263d9%7Cbda14b60-c3ce-463d-aaef-5d7e28fec1f0',
          text: 'Read about our 2022 Global Leaders winners'
        }
      },
      main: {
        title: 'Welcome!',
        paragraphs: [
          {
            subtitle: 'Purpose',
            texts:[
              `This application is a custom built demonstration of for the Financial Services Information Sharing 
              and Analysis Center (FS-ISAC). The application is intended to show the capability of the Okta 
              Customer Identity Cloud (Okta CIC) to provide solutions to many of your stated business use cases.`,
            ]
          }
        ]
      },
      secondary: {
        title: 'About the pages in this application',
        text: 'Here is a quick mapping between the pages of this application and the use cases you have told us about.',
        paragraphs: [
          {
            subtitle: 'Join Us!',
            text: 'Use the "Join Us!" page to sign up a brand new organization to the FS-ISAC association.'
          },
          {
            subtitle: 'Profile',
            text: 'Use the "Profile" page to update the information about the currently logged in user.'
          }
        ]
      }
    }
  },
  methods: {}
}
</script>