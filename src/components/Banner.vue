<template>
  <v-card :dark="!isDark" :light="isDark" >
      <v-img height="250px" :src="otherRibbon">
        <v-container container fill-height fluid>
          <v-row align="center" justify="center">
            <v-col>

              <v-card-title v-for="(title, i) of titles" :key="i" class="justify-center">
                <h1>{{ title }}</h1>
              </v-card-title>
              <div>
                <v-card-text v-for="(text, j) of texts" :key="j" class="text-center">
                  {{ text }}
                </v-card-text>
              </div>

              <v-card-actions v-if="button.text !==null" class="justify-center">
                <v-btn 
                  link
                  :href="button.link"
                  target="__blank"
                  class="primary"
                >
                  {{ button.text }}
                </v-btn>
              </v-card-actions>

            </v-col>
          </v-row>
        </v-container>
      </v-img>
    </v-card>
</template>

<script>
export default {
  name: 'Banner',
  data () {
    return {

    }
  },
  props: {
    titles: Array,
    texts: Array,
    button: {
      type: Object,
      // Object or array defaults must be returned from a factory function
      default () {
        return {
          link: null,
          text: null
        }
      }
    }
  }
}
</script>
