<template>
  <div class="default-layout">
    <div class="admin">
      <Header />
      <div class="mb-5" fluid>
        <b-navbar toggleable="lg" variant="default">
          <b-navbar-toggle target="header-admin" />
          <b-collapse id="header-admin" is-nav>
            <b-navbar-nav>
              <b-nav-item v-if="$auth.hasScope('super')" to="/admin/sites">Sites</b-nav-item>
              <b-nav-item v-if="$auth.hasScope('admin') && $store.state.site" :to="'/admin/sites/' + $store.state.site._id + '/edit'">Site</b-nav-item>
              <b-nav-item v-if="$auth.hasScope('admin')" to="/admin/menus">Menus</b-nav-item>
              <b-nav-item v-if="$auth.hasScope('admin')" to="/admin/categories">Categorias</b-nav-item>
              <b-nav-item v-if="$auth.hasScope('admin')" to="/admin/tags">Tags</b-nav-item>
              <b-nav-item v-if="$auth.hasScope('admin')" to="/admin/pages">Páginas</b-nav-item>
              <b-nav-item v-if="$auth.hasScope('admin')" to="/admin/medias">Biblioteca</b-nav-item>
              <b-nav-item to="/admin/users">Usuários</b-nav-item>
              <b-nav-item v-if="$auth.hasScope('admin')" to="/admin/posts">Notícias</b-nav-item>
              <b-nav-item v-if="$auth.hasScope('admin')" to="/admin/events">Agenda</b-nav-item>
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
        </b-navbar>
        <div class="container pt-3">
          <Nuxt />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  middleware: 'auth',
  methods: {
    logout () {
      this.$auth.logout()
    }
  }
}
</script>
