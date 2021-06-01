<template>
  <div class="default-layout">
    <div class="conta">
      <Header />
      <div class="mb-5" fluid>
        <b-navbar toggleable="lg" variant="secondary" class="d-block d-sm-none">
          <b-container fluid="lg">
            <b-navbar-brand to="/conta" class="text-white">
              Minha conta
            </b-navbar-brand>
            <b-collapse id="conta-header" is-nav>
              <b-navbar-nav>
                <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/settings">Configurações</b-nav-item>
                <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/pages">Páginas</b-nav-item>
                <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/menus">Menus</b-nav-item>
                <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/medias">Midiateca</b-nav-item>
                <b-nav-item to="/conta/users">Usuários</b-nav-item>
                <!-- <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/posts">Notícias</b-nav-item> -->
                <!-- <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/events">Agenda</b-nav-item> -->
                <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/ecommerce">Loja</b-nav-item>
                <b-nav-item to="/conta/contacts">Contatos</b-nav-item>
              </b-navbar-nav>
              <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                  <template v-slot:button-content>
                    <em>{{ $auth.user.name }}</em>
                  </template>
                  <b-dropdown-item to="/conta/profile">Meus dados</b-dropdown-item>
                  <b-dropdown-item @click="logout">Sair</b-dropdown-item>
                </b-nav-item-dropdown>
              </b-navbar-nav>
            </b-collapse>
            <b-navbar-toggle target="conta-header">
              <font-awesome-icon icon="bars" />
            </b-navbar-toggle>
          </b-container>
        </b-navbar>

        <b-container fluid="lg" class="mt-3">
          <b-row>
            <b-col md="3" class="d-none d-sm-block">
              <b-nav vertical>
                <b-nav-item to="/conta">
                  <strong>{{ $auth.user.name }}</strong>
                  <br>
                  <small>{{ userRoleText }}</small>
                </b-nav-item>
                <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/pages">Páginas</b-nav-item>
                <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/menus">Menus</b-nav-item>
                <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/medias">Midiateca</b-nav-item>
                <b-nav-item to="/conta/users">Usuários</b-nav-item>
                <!-- <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/posts">Notícias</b-nav-item> -->
                <!-- <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/events">Agenda</b-nav-item> -->
                <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/ecommerce">Loja</b-nav-item>
                <b-nav-item to="/conta/contacts">Contatos</b-nav-item>
                <b-nav-item v-if="$auth.user.role === 'admin'" to="/conta/settings">Configurações</b-nav-item>
                <b-nav-item to="/conta/profile">Meus dados</b-nav-item>
                <b-nav-item @click="logout"><small>Sair</small></b-nav-item>
              </b-nav>
            </b-col>
            <b-col md="9">
              <Nuxt />
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>
<script>
import roles from '@/data/roles.json'
export default {
  middleware: 'auth',
  computed: {
    userRoleText() {
      let roleText = null
      if (this.$auth.user) {
        const role = roles.find(r => r.value === this.$auth.user.role)
        if (role) {
          roleText = role.text
        }
      }
      return roleText
    },
    settings () {
      return this.$store.state.settings
    }
  },
  methods: {
    logout () {
      this.$auth.logout()
    }
  },
  head () {
    return {
      title: (this.settings ? this.settings.title : process.env.APP_NAME),
      link: [
        { rel: 'icon', type: 'image/x-icon', href: (this.settings && this.settings.favicon ? this.settings.favicon.url : '/favicon.ico') }
      ]
    }
  }
}
</script>
