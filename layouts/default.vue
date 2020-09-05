<template>
  <div class="default-layout">
    <div v-show="show_content">
      <Header />
      <Nuxt />
      <divisor variant="orange-down" />
      <b-carousel class="banners-component banners">
        <b-carousel-slide :img-src="require('~/assets/img/banner_biblioteca.png')">
          <n-link to="/biblioteca">
            <h2>Biblioteca</h2>
            <p>O maior acervo online de semeadura direta no Brasil.</p>
          </n-link>
        </b-carousel-slide>
      </b-carousel>
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
<style lang="sass" scoped>
  .banners-component
    a
      color: #fff
</style>
