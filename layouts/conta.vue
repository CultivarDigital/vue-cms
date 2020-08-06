<template>
  <div class="default-layout">
    <div v-show="show_content">
      <Header />
      <Nuxt />
      <Footer />
    </div>
  </div>
</template>
<script>
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
export default {
  components: {
    Header,
    Footer
  },
  middleware: 'auth',
  data () {
    return {
      show_content: false
    }
  },
  computed: {
    site () {
      return this.$store.state.site
    }
  },
  mounted () {
    if (this.site) {
      this.show_content = true
    }
  },
  methods: {
    logout () {
      this.$auth.logout()
    }
  },
  head () {
    return {
      title: 'Inicio - ' + this.site.name,
      link: [
        { rel: 'icon', type: 'image/x-icon', href: this.site.favicon ? this.site.favicon.url : '/favicon.ico' }
      ]
    }
  }
}
</script>
<style lang="sass">
  pre
    background-color: #fff
  .default-layout
    font-family: 'Arvo', serif
    color: #384e3f
    .btn-primary
      background-color: #384e3f
    .banners
      .carousel-caption
        h2
          font-weight: 700
          font-size: 30px
    .quill-content
      background-color: #fff
      border-radius: 20px
      padding: 20px
      p
        margin-bottom: 0
      p:first-child img
        border-bottom-left-radius: 0
        border-bottom-right-radius: 0
        margin: -20px -20px 0 -20px
        width: calc(100% + 40px)
        max-width: calc(100% + 40px)
      p:last-child img
        border-top-left-radius: 0
        border-top-right-radius: 0
        margin: 0 -20px -20px -20px
        width: calc(100% + 40px)
        max-width: calc(100% + 40px)
      img
        max-width: 100%
        border-radius: 20px
      h1, h2, h3, h4, h5, h6
        font-family: 'Arvo', serif
        font-weight: 700
</style>
