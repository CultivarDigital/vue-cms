<template>
  <div class="footer pt-5 pb-5">
    <footer v-if="site">
      <b-container fluid="lg">
        <b-row>
          <b-col sm="2" class="logo">
            <n-link to="/">
              <b-img :src="site.logo ? site.logo.url : require('~/assets/img/nuxt.png')" />
            </n-link>
          </b-col>
          <b-col sm="4">
            <p>{{ site.contact }}</p>
            <div class="social">
              <a v-if="site.url_facebook" :href="site.url_facebook" target="_blank">
                <client-only><font-awesome-icon :icon="['fab', 'facebook-square']" /></client-only>
              </a>
              <a v-if="site.url_twitter" :href="site.url_twitter" target="_blank">
                <client-only><font-awesome-icon :icon="['fab', 'twitter-square']" /></client-only>
              </a>
            </div>
          </b-col>
          <b-col sm="6">
            <contact />
          </b-col>
        </b-row>
      </b-container>
    </footer>
    <!-- <div class="pb-5">
      <share />
    </div> -->
  </div>
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
