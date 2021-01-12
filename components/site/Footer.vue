<template>
  <div class="footer">
    <footer v-if="site">
      <b-container fluid="lg">
        <b-row>
          <b-col sm="2" class="logo">
            <n-link to="/">
              <b-img v-if="site && site.logo" :src="site.logo.url" />
            </n-link>
          </b-col>
          <b-col sm="4">
            <p>
              <strong>{{ site.name }}</strong>
            </p>
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
