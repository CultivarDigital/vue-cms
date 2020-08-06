<template>
  <div class="admin">
    <b-navbar toggleable="lg" type="dark" variant="default">
      <b-navbar-brand href="/">{{ $auth.user.site ? $auth.user.site.name : 'Caminhos da Semente' }}</b-navbar-brand>
      <b-navbar-toggle target="header-menu" />
      <b-collapse id="header-menu" is-nav>
        <b-navbar-nav>
          <b-nav-item v-if="$auth.hasScope('admin')" to="/admin/learning_units">Unidades de aprendizado</b-nav-item>
          <b-nav-item v-if="$auth.hasScope('admin')" to="/admin/learning_units">Prestadores de serviço</b-nav-item>
          <b-nav-item v-if="$auth.hasScope('admin')" to="/admin/learning_units">Redes de semente</b-nav-item>
          <b-nav-item v-if="$auth.hasScope('admin')" to="/admin/posts">Notícias</b-nav-item>
          <b-nav-item v-if="$auth.hasScope('admin')" to="/admin/about">Quem somos</b-nav-item>
          <b-nav-item to="/admin/users">Usuários</b-nav-item>
          <b-nav-item v-if="$auth.hasScope('super')" to="/admin/sites">Sites</b-nav-item>
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
    <b-container class="mt-4">
      <Nuxt />
    </b-container>
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
  .b-table
    tr > td, tr > th
      vertical-align: middle !important
</style>
