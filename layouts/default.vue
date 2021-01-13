<template>
  <div class="default-layout">
    <div v-show="site">
      <Header />
      <Nuxt />
      <Footer />
    </div>
    <div v-if="!site" class="text-center mt-5">
      <p>No one site was created yet.</p>
      <p><strong>Please run <i>yarn seed</i> to create it!</strong></p>
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
  computed: {
    site () {
      return this.$store.state.site
    }
  },
  head () {
    return {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: (this.site && this.site.favicon ? this.site.favicon.url : '/favicon.ico') }
      ]
    }
  }
}
</script>
