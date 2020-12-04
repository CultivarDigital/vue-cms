export default {
  computed: {
    site () {
      return this.$store.state.site
    },
    page () {
      const page = this.site.pages.find(page => page.slug === this.page_id)
      if (!page) {
        return {
          slug: this.page_id,
          title: this.page_title,
          description: this.page_description
        }
      }
      return page
    }
  },
  head () {
    const meta = []

    let title = this.site.name
    if (this.page_title) {
      title = this.page_title + ' - ' + this.site.name
    } else if (this.page) {
      title = this.page.title + ' - ' + this.site.name
    }

    let description = this.site.description
    if (this.page_description) {
      description = this.page_description
    } else if (this.page) {
      description = this.page.description
    }

    const baseUrl = 'https://' + this.site.domain_name
    let image = baseUrl + (this.site && this.site.logo ? this.site.logo.url : '/static/logo.png')
    if (this.page_image) {
      image = baseUrl + this.page_image
    } else if (this.page && this.page.pictures && this.page.pictures.length > 0) {
      image = baseUrl + this.page.pictures[0].url
    }

    meta.push({ hid: 'og:site_name', name: 'og:site_name', content: this.site.name })
    meta.push({ hid: 'og:title', name: 'og:title', content: title })
    meta.push({ hid: 'og:description', name: 'og:description', content: description })
    meta.push({ hid: 'og:image', name: 'og:image', content: image })
    meta.push({ hid: 'description', name: 'description', content: description })

    return {
      title,
      meta
    }
  }
}
