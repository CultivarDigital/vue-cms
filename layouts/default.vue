<template>
  <div class="default-layout">
    <div v-show="show_content">
      <Header />
      <Nuxt />
      <divisor variant="green-up" />
      <Footer />
    </div>
  </div>
</template>
<script>
import Header from '@/components/site/Header'
import Footer from '@/components/site/Footer'
import Divisor from '@/components/site/Divisor'
export default {
  components: {
    Header,
    Footer,
    Divisor
  },
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
  head () {
    return {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: this.site.favicon ? this.site.favicon.url : '/favicon.ico' }
      ]
    }
  }
}
</script>
