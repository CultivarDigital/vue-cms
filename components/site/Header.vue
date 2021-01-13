<template>
  <header>
    <b-navbar toggleable="md">
      <b-container fluid="lg">
        <b-navbar-brand to="/">
          <b-img :src="site.logo ? site.logo.url : require('~/assets/img/nuxt.png')" />
        </b-navbar-brand>
        <b-navbar-toggle target="header-menu" />
        <b-collapse id="header-menu" is-nav>
          <b-navbar-nav />
          <b-navbar-nav class="ml-auto">
            <!-- <b-nav-item v-for="page in site.pages" :key="page.slug" :to="'/' + page.slug">{{ page.title }}</b-nav-item> -->
            <b-nav-item to="/biblioteca">Biblioteca</b-nav-item>
            <b-nav-item to="/noticias">Notícias</b-nav-item>
            <b-nav-item to="/agenda">Agenda</b-nav-item>
            <b-nav-item @click="$scrollTo('footer')">Contato</b-nav-item>
            <b-nav-item v-if="!$auth.loggedIn" to="/admin" class="btn-login">Login / Cadastro</b-nav-item>
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
