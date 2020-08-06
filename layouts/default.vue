<template>
  <div class="default-layout">
    <div v-show="show_content">
      <header>
        <b-navbar toggleable="md">
          <b-container class="mt-2" fluid="lg">
            <b-navbar-brand to="/"><b-img v-if="site.logo" :src="site.logo.url" /> </b-navbar-brand>
            <b-navbar-toggle target="header-menu" />
            <b-collapse id="header-menu" is-nav>
              <b-navbar-nav />
              <b-navbar-nav class="ml-auto">
                <b-nav-item to="/sobre">Quem Somos</b-nav-item>
                <b-nav-item to="/mapa">Mapa</b-nav-item>
                <b-nav-item-dropdown>
                  <template v-slot:button-content>
                    <em>Sobre Sementes</em>
                  </template>
                  <b-dropdown-item to="/noticias">Notícias</b-dropdown-item>
                  <b-dropdown-item to="/biblioteca">Biblioteca</b-dropdown-item>
                </b-nav-item-dropdown>
                <b-nav-item to="/projetos">Contato</b-nav-item>
                <b-nav-item to="/entrar" class="btn-login">Login / Cadastro</b-nav-item>
              </b-navbar-nav>
            </b-collapse>
          </b-container>
        </b-navbar>
      </header>
      <Nuxt />
      <footer v-if="site">
        <b-container fluid="lg">
          <b-row>
            <b-col sm="3">
              <a href="/"><b-img src="~assets/img/logo-branca.png" /></a>
            </b-col>
            <b-col sm="3">
              {{ site.contact }}
            </b-col>
            <b-col sm="6">
              <a :href="'mailto:' + site.email">{{ site.email }}</a>
              &nbsp;
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
    if (this.site) {
      this.show_content = true
    }
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
  .default-layout
    font-family: 'Arvo', serif
    color: #384e3f
    .banners
      .carousel-caption
        h2
          font-weight: 700
          font-size: 30px
    .navbar-brand
      img
        height: 55px
    .navbar-nav
      .nav-link
        font-weight: 700
        font-style: normal
        color: #384e3f
        font-size: 12px
        &.dropdown-toggle
          em
            font-style: normal
          &::after
            display: none
      .btn-login
        border: 1px solid #f6a447
        border-radius: 10px
    footer
      background-color: #394e3f
      color: #fff
      padding: 20px 0
      a
        color: #fff
      img
        height: 40px
      .row > div
        display: flex
        align-items: center
        &.col-sm-3
          font-size: 11px
        &.col-sm-6
    .quill-content
      background-color: #fff
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
        font-family: 'Arvo', serif
        font-weight: 700
</style>
