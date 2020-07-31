export default {
  computed: {
    site () {
      return this.$store.state.site
    },
    page () {
      return this.site.pages.find(page => page.slug === this.page_id)
    }
  }
}
