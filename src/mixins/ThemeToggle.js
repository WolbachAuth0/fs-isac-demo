import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['isDark']),
    ...mapGetters(['logo', 'ribbon', 'otherLogo', 'otherRibbon']),
  },
  methods: {
    ...mapMutations(['setTheme'])
  }
}