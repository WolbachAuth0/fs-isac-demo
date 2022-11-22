<template>
  <v-card>

    <!-- Banner Card -->
    <banner :titles="banner.titles" :texts="banner.texts" :button="banner.button"></banner>

    <v-card class="pa-6">
      <v-card v-for="(paragraph, index) of paragraphs" :key="index" class="pa-6" color="surface">
        <v-card-title>
          {{ paragraph.title }}
        </v-card-title>
        <v-card-text>
          {{ paragraph.text }}
        </v-card-text>
      </v-card>
      
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
      paragraphs: [
        {
          title: 'Purpose',
          text: ''
        }
      ]
    }
  },
  methods: {}
}
</script>