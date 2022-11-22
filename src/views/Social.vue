<template>
  <v-card>

    <!-- Banner Card -->
    <banner :titles="banner.titles" :texts="banner.texts"></banner>

    <v-card class="pa-6">
      <v-card-text>
        (TODO: Implement form to register Social Connection)
      </v-card-text>
    </v-card>

  </v-card>
</template>

<script>
import Banner from '@/components/Banner.vue'
export default {
  name: 'Social',
  metaInfo: {
    title: 'Network',
  },
  components: {
    Banner
  },
  data () {
    return {
      banner: {
        titles: [
          'Join Our Network',
          'Our community is growing!'
        ],
        texts: [
          'This page will be where a developer can signup for his / her website to permit users to login with their FS-ISAC social network credentials.'
        ]
      }
    }
  },
  methods: {}
}
</script>