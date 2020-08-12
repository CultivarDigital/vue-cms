<template>
  <footer v-if="site">
    <b-container fluid="lg">
      <b-row>
        <b-col sm="2">
          <n-link to="/"><b-img src="~assets/img/logo-branca.png" /></n-link>
        </b-col>
        <b-col sm="4">
          {{ site.contact }}
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
    img
      height: 40px
    .row > div
      // display: flex
      // align-items: center
      &.col-sm-4
        font-size: 11px
        white-space: pre-line
        margin-top: -20px
</style>
