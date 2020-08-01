<template>
  <div class="default-layout">
    <div v-show="show_content">
      <header>
        <b-navbar toggleable="md" variant="faded" type="dark">
          <b-container class="mt-2">
            <b-navbar-brand to="/"><b-img :src="this.site.logo.url" /> </b-navbar-brand>
            <b-navbar-toggle target="header-menu" />
            <b-collapse id="header-menu" is-nav>
              <b-navbar-nav />
              <b-navbar-nav class="ml-auto">
                <b-nav-item to="/sobre" right>SOBRE NÓS</b-nav-item>
                <b-nav-item to="/aldeias" right>ALDEIAS</b-nav-item>
                <b-nav-item to="/linhas-de-acao" right>LINHAS DE AÇÃO</b-nav-item>
                <b-nav-item to="/projetos" right>PROJETOS</b-nav-item>
                <b-nav-item to="/noticias" right>NOTíCIAS</b-nav-item>
              </b-navbar-nav>
            </b-collapse>
          </b-container>
        </b-navbar>
      </header>
      <Nuxt />
      <footer v-if="site">
        <b-container>
          <b-row>
            <b-col sm="3">
              <a href="http://www.fundoamazonia.gov.br"><b-img src="~/assets/img/fundo-amazonia.png" /></a>
            </b-col>
            <b-col sm="3">
              Rua Lateral, Nº 38
              <br>
              Bairro JK, CEP 68.385-000
              <br>
              Tucumã - Pará
            </b-col>
            <b-col sm="6">
              <a href="mailto:floresta@florestaprotegida.org.br">floresta@florestaprotegida.org.br</a>
              &nbsp;
              <a v-if="site.url_facebook" :href="site.url_facebook" target="_blank"><b-img src="~/assets/img/facebook_icon.png" /></a>
              <a v-if="site.url_youtube" :href="site.url_youtube" target="_blank"><b-img src="~/assets/img/youtube_icon.png" /></a>
              <a v-if="site.url_flickr" :href="site.url_flickr" target="_blank"><b-img src="~/assets/img/flickr_icon.png" /></a>
              <a v-if="site.url_instagram" :href="site.url_instagram" target="_blank"><b-img src="~/assets/img/instagram_icon.png" /></a>
            </b-col>
          </b-row>
        </b-container>
      </footer>
    </div>
  </div>
</template>
<script>
export default {
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
    this.show_content = true
  },
  head () {
    return {
      title: 'Inicio - ' + this.site.name,
      link: [
        { rel: 'icon', type: 'image/x-icon', href: this.site.favicon ? this.site.favicon.url : '/favicon.ico' }
      ]
    }
  }
}
</script>
<style lang="sass">
  pre
    background-color: #fff
  .modal-gallery
    h3
      font-family: 'Amatic SC', cursive
      font-weight: 700
      color: #2A114B
    .modal-footer
      justify-content: center
      .btn-primary
        background-color: #2A114B
        border-color: #2A114B

  .default-layout
    background-color: #1E2C18
    color: #fff
    min-height: 100vh
    a
      text-decoration: none !important
    h3, .modal h3, h4
      font-family: 'Amatic SC', cursive
      font-weight: 700
      font-size: 32px
      color: #fff
    header
      margin-bottom: -93px
      z-index: 1
      position: absolute
      width: 100%
      .navbar-brand
        img
          width: 220px
          @media (max-width: 768px)
            width: 150px
          @media (max-width: 576px)
            width: 120px
      .navbar-nav
        .nav-item
          .nav-link
            font-family: 'Amatic SC', cursive
            color: #fff
            font-weight: 700
            font-size: 20px
    footer
      background-color: #fff
      color: #2A114B
      padding: 20px 0
      a
        color: #2A114B

      .row > div
        display: flex
        align-items: center
        &.col-sm-3
          font-size: 11px
        &.col-sm-6
          font-family: 'Amatic SC', cursive
          font-weight: 700
          font-size: 20px
          justify-content: flex-end
          img
            max-width: 20px
            max-height: 20px
            margin: 5px
    .carousel-caption
      font-family: 'Amatic SC', cursive
      left: 5%
      right: 5%
      h3
        font-size: 20px
        font-weight: 400
      @media (min-width: 768px)
        bottom: 18%
        h3
          font-size: 40px
    .carousel-indicators
      @media (min-width: 768px)
        bottom: 16%
      li
        width: 6px
        height: 6px
        background-color: transparent
        border: 1px solid #fff
        border-radius: 100%
    .quill-content
      background-color: #f5e7c5
      border-radius: 20px
      padding: 20px
      p
        margin-bottom: 0
      p:first-child img
        border-bottom-left-radius: 0
        border-bottom-right-radius: 0
        margin: -20px -20px 0 -20px
        width: calc(100% + 40px)
        max-width: calc(100% + 40px)
      p:last-child img
        border-top-left-radius: 0
        border-top-right-radius: 0
        margin: 0 -20px -20px -20px
        width: calc(100% + 40px)
        max-width: calc(100% + 40px)
      img
        max-width: 100%
        border-radius: 20px
      h1, h2, h3, h4, h5, h6
        font-family: 'Amatic SC', cursive
        font-weight: 700
</style>
