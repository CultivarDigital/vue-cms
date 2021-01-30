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
            <template v-if="menus !== null">
              <dynamic-menu-item v-for="menu in menus" :key="menu._id" :menu="menu" />
            </template>
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
    setUrls(menu) {
      if (menu.url) {
        menu.internalUrl = menu.url.startsWith('/') ? menu.url : ''
        menu.externalUrl = !menu.internalUrl ? menu.url : ''
        if (menu.externalUrl) {
          menu.externalUrl = (menu.url.startsWith('https://') ? '' : 'https://') + menu.url
        }
      } else {
        menu.internalUrl = ''
        menu.externalUrl = ''
      }
    },
    async list () {
      this.menus = await this.$axios.$get('/api/menus/submenus').catch(this.showError)
      for (let i = 0; i < this.menus.length; i++) {
        const menu = this.menus[i]
        this.setUrls(menu)
        for (let submenuIndex = 0; submenuIndex < menu.submenus.length; submenuIndex++) {
          const submenu = menu.submenus[submenuIndex]
          this.setUrls(submenu)
        }
      }
    }
  }
}
</script>
