import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)
const okta = {
  lightblue: colors.blue.darken4,
  darkblue: '#151a66',
}

const fsisac = {
  blue: '#4a46de',
  lightblue: '#09b5f7',
  green: '#54b155',
  purple: '#9fa0eb',
  dark: '#011b34',
  surface: '#e9e8fb'
}

export default new Vuetify({
  theme: {
    dark: false,
    themes: {
      dark: {
        surface: colors.grey.darken2,
        primary: colors.blue.lighten3,
        secondary: colors.blueGrey.darken4,
        info: colors.blueGrey.lighten3,
        accent: colors.cyan.accent4,
        success: colors.green.darken1,
        warning: colors.yellow.lighten4,
        error: colors.red.lighten4,
      },
      light: {
        surface: fsisac.surface,
        primary: fsisac.blue,
        secondary: fsisac.lightblue,
        info: fsisac.green,
        accent: colors.cyan,
        success: colors.green.darken1,
        warning: colors.yellow,
        error: colors.red,
      }
    }
  },
  icons: {
    iconfont: 'mdiSvg'
  },
});
