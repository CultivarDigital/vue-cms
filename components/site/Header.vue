<template>
  <header>
    <b-navbar toggleable="md">
      <b-container class="mt-2" fluid="lg">
        <b-navbar-brand to="/">
          <b-img v-if="site && site.logo" :src="site.logo.url" />
        </b-navbar-brand>
        <b-navbar-toggle target="header-menu" />
        <b-collapse id="header-menu" is-nav>
          <b-navbar-nav />
          <b-navbar-nav class="ml-auto">
            <!-- <b-nav-item v-for="page in site.pages" :key="page.slug" :to="'/' + page.slug">{{ page.title }}</b-nav-item> -->
            <b-nav-item to="/mapa">Mapa</b-nav-item>
            <b-nav-item to="/biblioteca">Biblioteca</b-nav-item>
            <b-nav-item to="/noticias">Notícias</b-nav-item>
            <b-nav-item to="/agenda">Agenda</b-nav-item>
            <b-nav-item @click="$scrollTo('footer')">Contato</b-nav-item>
            <b-nav-item v-if="!$auth.loggedIn" to="/conta" class="btn-login">Login / Cadastro</b-nav-item>
            <b-nav-item v-else-if="$auth.hasScope('user')" to="/conta" class="btn-login">Minha conta</b-nav-item>
            <b-nav-item v-else to="/admin" class="btn-login">Painel administrativo</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </header>
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
  .navbar-brand
    img
      height: 55px
  .navbar-nav
    .nav-link
      font-weight: 700
      font-style: normal
      color: #00794e
      font-size: 12px
      &.dropdown-toggle
        em
          font-style: normal
        &::after
          display: none
    .btn-login
      background-color: #51009c
      border-radius: 10px
      margin-left: 5px
      a
        color: #fff
        &:hover
          color: #fdfdfd
</style>
