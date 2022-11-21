<template>
  <v-card>

    <v-card class="pa-6">
      <v-card-title>{{ title }}</v-card-title>

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

export default {
  name: 'Home',
  metaInfo: {
    title: 'Welcome',
  },
  data () {
    return {
      title: 'Welcome!',
      banner: {
        lightRibbon: 'https://www.fsisac.com/hubfs/Banner%20Images/FS-ISAC_01-07.png',
        darkRibbon: 'https://www.fsisac.com/hs-fs/hubfs/FS-ISAC_NewDNA_02_Purple.png?width=6251&amp;name=FS-ISAC_NewDNA_02_Purple.png&quot'
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