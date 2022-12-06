export default {
  state: {
    isDark: false,
    theme: {
      dark: {
        ribbon: 'https://www.fsisac.com/hs-fs/hubfs/FS-ISAC_NewDNA_02_Purple.png?width=6251&amp;name=FS-ISAC_NewDNA_02_Purple.png&quot',
        logo: require('../assets/fs-isac-logo-dark.svg')
      },
      light: {
        ribbon: 'https://www.fsisac.com/hubfs/Banner%20Images/FS-ISAC_01-07.png',
        logo: require('../assets/fs-isac-logo.svg'),
      }
    }
  },
  getters: {
    isDark (state) {
      return state.isDark
    },
    logo (state) {
      return state.isDark ? state.theme.dark.logo : state.theme.light.logo
    },
    ribbon (state) {
      return state.isDark ? state.theme.dark.ribbon : state.theme.light.ribbon
    },
    otherLogo (state) {
      return state.isDark ? state.theme.light.logo : state.theme.dark.logo
    },
    otherRibbon (state) {
      return state.isDark ? state.theme.light.ribbon : state.theme.dark.ribbon
    }
  },
  mutations: {
    setTheme (state, theme) {
      console.log('setTheme', theme)
      if (typeof theme === 'string' || theme instanceof String) {
        state.isDark = theme === 'dark' ? true : false
      } else if (typeof theme === 'boolean') {
        state.isDark = theme
      } else {
        state.isDark = !!theme
      }
    }
  },
  // actions: {
  //   example ({ state, commit, rootState }) {
  //     // state is the modules local state
  //     // rootState is the global state
  //   }
  // },
}