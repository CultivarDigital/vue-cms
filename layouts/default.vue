<template>
  <div class="default-layout">
    <header>
      <b-navbar toggleable="md" variant="faded" type="dark">
        <b-container class="mt-2">
          <b-navbar-brand href="/"><b-img src="~/assets/img/logo.png" /> </b-navbar-brand>
          <b-navbar-toggle target="header-menu" />
          <b-collapse id="header-menu" is-nav>
            <b-navbar-nav>
            </b-navbar-nav>
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
  </div>
</template>
<script>
</script>
<style lang="sass">
  @import "@/assets/css/_vars.scss"
  .default-layout
    header
      margin-bottom: -93px
      z-index: 1
      position: absolute
      width: 100%
      .navbar-brand
        img
          width: 189px
      .navbar-nav
        .nav-item
          font-family: 'Amatic SC', cursive
          font-size: 20px
    .carousel-caption
      font-family: 'Amatic SC', cursive
      font-size: 20px
      bottom: 150px
    .carousel-indicators
      bottom: 130px
      li
        width: 6px
        height: 6px
        background-color: transparent
        border: 1px solid $white
        border-radius: 100%
</style>
