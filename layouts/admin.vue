<template>
  <div class="default-layout">
    <div class="admin">
      <Header />
      <div class="mb-5" fluid>
        <b-navbar toggleable="lg" type="dark" variant="default">
          <b-navbar-toggle target="header-admin" />
          <b-collapse id="header-admin" is-nav>
            <b-navbar-nav>
              <b-nav-item v-if="$auth.hasScope('super')" to="/admin/sites">Redes</b-nav-item>
              <b-nav-item v-if="$auth.hasScope('admin') && $store.state.site" :to="'/admin/sites/' + $store.state.site._id + '/edit'">Rede</b-nav-item>
              <b-nav-item-dropdown v-if="$auth.hasScope('admin')">
                <template v-slot:button-content>
                  <em>Mapa</em>
                </template>
                <b-dropdown-item to="/admin/learning_units">Unidades de referência</b-dropdown-item>
                <b-dropdown-item to="/admin/seeds_networks">Produtores orgânicos</b-dropdown-item>
                <b-dropdown-item to="/admin/women_groups">Grupos de mulheres</b-dropdown-item>
                <b-dropdown-item to="/admin/service_providers">Prestadores de serviço</b-dropdown-item>
                <!-- <b-dropdown-item to="/admin/planting_areas">Áreas de plantio</b-dropdown-item> -->
              </b-nav-item-dropdown>
              <b-nav-item v-if="$auth.hasScope('admin')" to="/admin/pages">Páginas</b-nav-item>
              <b-nav-item v-if="$auth.hasScope('admin')" to="/admin/medias">Biblioteca</b-nav-item>
              <b-nav-item to="/admin/users">Membros</b-nav-item>
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
        <div class="container">
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
<style lang="sass">
  .admin
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"
    color: #222
  .form-group
    margin-top: 1rem
    legend
      font-weight: bold

</style>
