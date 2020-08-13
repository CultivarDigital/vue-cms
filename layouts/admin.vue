<template>
  <div class="default-layout">
    <div class="admin">
      <Header />
      <div class="mb-5" fluid>
        <b-navbar toggleable="lg" type="dark" variant="default">
          <b-navbar-toggle target="header-admin" />
          <b-collapse id="header-admin" is-nav>
            <b-navbar-nav>
              <b-nav-item v-if="$auth.hasScope('admin')" to="/admin/learning_units">Unidades de aprendizagem</b-nav-item>
              <b-nav-item v-if="$auth.hasScope('admin')" to="/admin/service_providers">Prestadores de serviço</b-nav-item>
              <!-- <b-nav-item v-if="$auth.hasScope('admin')" to="/admin/learning_units">Redes de semente</b-nav-item> -->
              <b-nav-item v-if="$auth.hasScope('admin')" to="/admin/tags">Tags</b-nav-item>
              <b-nav-item v-if="$auth.hasScope('admin')" to="/admin/posts">Notícias</b-nav-item>
              <b-nav-item v-if="$auth.hasScope('admin')" to="/admin/about">Quem somos</b-nav-item>
              <b-nav-item v-if="$auth.hasScope('admin')" to="/admin/press">Imprensa</b-nav-item>
              <b-nav-item to="/admin/newsletters">Contatos</b-nav-item>
              <b-nav-item to="/admin/users">Usuários</b-nav-item>
              <b-nav-item v-if="$auth.hasScope('super')" to="/admin/sites">Sites</b-nav-item>
              <b-nav-item v-if="$auth.hasScope('admin') && $store.state.site" :to="'/admin/sites/' + $store.state.site._id + '/edit'">Site</b-nav-item>
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
        <div class="container">
          <Nuxt />
        </div>
      </div>
      <Footer />
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
<style lang="sass">
  .admin
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
    color: #222
  .form-group
    margin-top: 1rem
    legend
      font-weight: bold

</style>
