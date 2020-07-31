export default {
  computed: {
    site () {
      return this.$store.state.site
    },
    page () {
      if (this.site) {
        return this.site.pages.find(page => page.slug === this.page_id)
      }
      return null
    }
  }
}
