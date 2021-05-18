<template>
  <div class="default-layout">
    <div class="admin">
      <Header />
      <div class="mb-5" fluid>
        <b-navbar toggleable="lg" variant="primary">
          <b-container fluid="lg">
            <b-navbar-brand to="/admin" class="text-white .d-block .d-sm-none">
              {{ userRoleText }}
            </b-navbar-brand>
            <b-collapse id="header-admin" is-nav>
              <b-navbar-nav>
                <b-nav-item v-if="$auth.hasScope('admin')" to="/admin/settings">Configurações</b-nav-item>
                <b-nav-item v-if="$auth.hasScope('admin')" to="/admin/pages">Páginas</b-nav-item>
                <b-nav-item v-if="$auth.hasScope('admin')" to="/admin/menus">Menus</b-nav-item>
                <b-nav-item v-if="$auth.hasScope('admin')" to="/admin/medias">Biblioteca</b-nav-item>
                <b-nav-item to="/admin/users">Usuários</b-nav-item>
                <b-nav-item v-if="$auth.hasScope('admin')" to="/admin/posts">Notícias</b-nav-item>
                <b-nav-item v-if="$auth.hasScope('admin')" to="/admin/events">Agenda</b-nav-item>
                <b-nav-item v-if="$auth.hasScope('admin')" to="/admin/ecommerce">Loja</b-nav-item>
                <b-nav-item to="/admin/contacts">Contatos</b-nav-item>
              </b-navbar-nav>
              <b-navbar-nav class="ml-auto">
                <b-nav-item-dropdown right>
                  <template v-slot:button-content>
                    <em>{{ $auth.user.name }}</em>
                  </template>
                  <b-dropdown-item to="/admin/profile">Meus dados</b-dropdown-item>
                  <b-dropdown-item @click="logout">Sair</b-dropdown-item>
                </b-nav-item-dropdown>
              </b-navbar-nav>
            </b-collapse>
            <b-navbar-toggle target="header-admin">
              <font-awesome-icon icon="bars" />
            </b-navbar-toggle>
          </b-container>
        </b-navbar>

        <b-container class="container mt-3">
          <Nuxt />
        </b-container>
      </div>
    </div>
  </div>
</template>
<script>
import roles from '@/data/roles.json'
export default {
  middleware: 'auth',
  data() {
    return {
      roles
    }
  },
  computed: {
    userRoleText() {
      let roleText = null
      if (this.$auth.user && this.$auth.user.roles && this.$auth.user.roles.length) {
        const role = this.roles.find(r => r.value[0] === this.$auth.user.roles[0])
        if (role) {
          roleText = role.text
        }
      }
      return roleText
    }
  },
  methods: {
    logout () {
      this.$auth.logout()
    }
  }

}
</script>
