<template>
  <header>
    <b-navbar toggleable="md">
      <b-container fluid="lg">
        <b-navbar-brand v-if="site" to="/">
          <b-img :src="site.logo ? site.logo.url : require('~/assets/img/logo.svg')" />
          <b-img :src="site.logo ? site.logo.url : require('~/assets/img/logo-nome.svg')" />
        </b-navbar-brand>
        <b-navbar-toggle target="header-menu" />
        <b-collapse id="header-menu" is-nav>
          <b-navbar-nav />
          <b-navbar-nav class="ml-auto">
            <template v-if="menus !== null">
              <dynamic-menu-item v-for="menu in menus" :key="menu._id" :menu="menu" />
            </template>
            <b-nav-item to="/biblioteca">Biblioteca</b-nav-item>
            <b-nav-item to="/noticias">Notícias</b-nav-item>
            <b-nav-item to="/agenda">Agenda</b-nav-item>
            <b-nav-item @click="$scrollTo('footer')">Contato</b-nav-item>
            <b-nav-item v-if="!$auth.loggedIn" to="/admin" class="btn-login">Entrar</b-nav-item>
            <b-nav-item v-else to="/admin" class="btn-login">Painel</b-nav-item>
          </b-navbar-nav>
        </b-collapse>
      </b-container>
    </b-navbar>
  </header>
</template>
<script>

import DynamicMenuItem from '@/components/site/DynamicMenuItem.vue'

export default {
  components: {
    DynamicMenuItem
  },
  data () {
    return {
      menus: null
    }
  },
  computed: {
    site() {
      return this.$store.state.site
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.menus = await this.$axios.$get('/api/menus/submenus', { params: { populate: 'page' } })
    }
  }
}
</script>
