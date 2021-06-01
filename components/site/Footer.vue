<template>
  <div class="footer pt-5 pb-5 bg-primary">
    <footer v-if="settings">
      <b-container fluid="lg">
        <b-row>
          <b-col sm="6">
            <a>
              PARCEIROS E APOIOS
            </a>
            <partners />
            <div class="mt-4">
              <small>&copy; {{ settings.title }}. Todos os direitos reservados.</small>
            </div>
          </b-col>
          <b-col sm="6" class="">
            <a>
              CONTATO
            </a>
            <contact />
            <b-col sm="6">
              <a :href="'mailto:' + settings.email">{{ settings.email }}</a>
              &nbsp;
              <a v-if="settings.url_facebook" :href="settings.url_facebook" target="_blank"><b-img src="~/assets/img/facebook_icon.png" /></a>
              <a v-if="settings.url_youtube" :href="settings.url_youtube" target="_blank"><b-img src="~/assets/img/youtube_icon.png" /></a>
              <a v-if="settings.url_flickr" :href="settings.url_flickr" target="_blank"><b-img src="~/assets/img/flickr_icon.png" /></a>
              <a v-if="settings.url_instagram" :href="settings.url_instagram" target="_blank"><b-img src="~/assets/img/instagram_icon.png" /></a>
            </b-col>
          </b-col>
        </b-row>
      </b-container>
    </footer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show_contact: false,
      show_partners: false
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings
    }
  }
}
</script>
