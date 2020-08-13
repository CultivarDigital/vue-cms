<template>
  <footer v-if="site">
    <b-container fluid="lg">
      <b-row>
        <b-col sm="2" class="logo">
          <n-link to="/"><b-img src="~assets/img/logo-branca.png" /></n-link>
        </b-col>
        <b-col sm="4">
          <p>{{ site.contact }}</p>
          <div class="social">
            <a v-if="site.url_facebook" :href="site.url_facebook" target="_blank"><b-img src="~assets/img/facebook.png" /></a>
            <a v-if="site.url_twitter" :href="site.url_twitter" target="_blank"><b-img src="~assets/img/twitter.png" /></a>
          </div>
        </b-col>
        <b-col sm="6">
          <newsletter />
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>
<script>
export default {
  computed: {
    site() {
      return this.$store.state.site
    }
  }
}
</script>
<style lang="sass" scoped>
  footer
    background-color: #394e3f
    color: #fff
    padding: 70px 0
    a
      color: #fff
    .logo
      img
        height: 40px
    .row > div
      // display: flex
      // align-items: center
      &.col-sm-4
        font-size: 11px
        white-space: pre-line
</style>
