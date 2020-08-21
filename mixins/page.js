export default {
  computed: {
    site () {
      return this.$store.state.site
    },
    page () {
      return this.site.pages.find(page => page.slug === this.page_id)
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
    let image = baseUrl + this.site.logo.url
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

    console.log(this.page_id)
    console.log(meta)
    return {
      title,
      meta
    }
  }
}
