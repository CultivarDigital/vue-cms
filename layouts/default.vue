<template>
  <div class="default-layout" :class="{ 'header-transparent': $route.path === '/' && settings.banners && settings.banners.length > 0 }">
    <div v-show="settings">
      <Header />
      <div class="sub-header" />
      <Nuxt />
      <Footer />
    </div>
    <div v-if="!settings" class="my-5">
      <b-container>
        <h4>Este site ainda não foi configurado.</h4>
        <h5 class="mb-5">Vamos configurá-lo?</h5>
        <SetupForm />
      </b-container>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    settings () {
      return this.$store.state.settings
    }
  },
  head () {
    return {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: (this.settings && this.settings.favicon ? this.settings.favicon.url : '/favicon.ico') }
      ]
    }
  }
}
</script>
