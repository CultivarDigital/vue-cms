<template>
  <div class="default-layout">
    <header>
      <b-navbar toggleable="md" variant="faded" type="dark">
        <b-container class="mt-2">
          <b-navbar-brand href="/"><b-img src="~/assets/img/logo.png" /> </b-navbar-brand>
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
            <b-img src="~/assets/img/fundo-amazonia.png" />
          </b-col>
          <b-col sm="3">
            Rua Lateral, Nº 38
            <br>
            Bairro JK, CEP 68.385-000
            <br>
            Tucumã - Pará
          </b-col>
          <b-col sm="6">
            <a mailto="floresta@florestaprotegida.org.br">floresta@florestaprotegida.org.br</a>
            <b-img v-if="site.url_facebook" src="~/assets/img/facebook_icon.png" />
            <b-img v-if="site.url_youtube" src="~/assets/img/youtube_icon.png" />
            <b-img v-if="site.url_flickr" src="~/assets/img/flickr_icon.png" />
            <b-img v-if="site.url_instagram" src="~/assets/img/instagram_icon.png" />
          </b-col>
        </b-row>
      </b-container>
    </footer>
  </div>
</template>
<script>
export default {
  computed: {
    site () {
      return this.$store.state.site
    }
  }
}
</script>
<style lang="sass">
  pre
    background-color: #fff
  .default-layout
    background-color: #1E2C18
    color: #fff
    h3
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
      color: #1e2048
      padding: 20px 0
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

</style>
