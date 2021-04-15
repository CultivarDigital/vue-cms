<template>
  <div class="footer pt-5 pb-5 bg-secondary">
    <footer v-if="site">
      <b-container fluid="lg">
        <b-row>
          <b-col sm="6">
            <a>
              PARCEIROS E APOIOS
            </a>
            <partners />
            <div class="mt-4">
              <small>&copy; 2013 Rede de Sementes do Xingu. Todos os direitos reservados.</small>
            </div>
          </b-col>
          <b-col sm="6" class="">
            <a>
              CONTATO
            </a>
            <contact />
            <b-col sm="6">
              <a href="mailto:contato@sementesdoxingu.org.br">contato@sementesdoxingu.org.br</a>
              &nbsp;
              <a v-if="site.url_facebook" :href="site.url_facebook" target="_blank"><b-img src="~/assets/img/facebook_icon.png" /></a>
              <a v-if="site.url_youtube" :href="site.url_youtube" target="_blank"><b-img src="~/assets/img/youtube_icon.png" /></a>
              <a v-if="site.url_flickr" :href="site.url_flickr" target="_blank"><b-img src="~/assets/img/flickr_icon.png" /></a>
              <a v-if="site.url_instagram" :href="site.url_instagram" target="_blank"><b-img src="~/assets/img/instagram_icon.png" /></a>
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
    site() {
      return this.$store.state.site
    }
  }
}
</script>
