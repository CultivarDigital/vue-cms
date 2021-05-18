export default {
  computed: {
    settings () {
      return this.$store.state.settings
    },
    page () {
      const page = this.settings.pages.find(page => page.slug === this.page_id)
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

    let title = this.settings.name
    if (this.page_title) {
      title = this.page_title + ' - ' + this.settings.name
    } else if (this.page) {
      title = this.page.title + ' - ' + this.settings.name
    }

    let description = this.settings.description
    if (this.page_description) {
      description = this.page_description
    } else if (this.page) {
      description = this.page.description
    }

    const baseUrl = process.env.BASE_URL
    let image = baseUrl + (this.settings && this.settings.logo ? this.settings.logo.url : '/static/icon.png')
    if (this.page_image) {
      image = baseUrl + this.page_image
    } else if (this.page && this.page.pictures && this.page.pictures.length > 0) {
      image = baseUrl + this.page.pictures[0].url
    }

    meta.push({ hid: 'og:settings_name', name: 'og:settings_name', content: this.settings.name })
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
