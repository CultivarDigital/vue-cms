<template>
  <div class="dashboard">
    <b-breadcrumb :items="breadcrumb" />
    <b-list-group v-if="$auth.user.role === 'admin' || $auth.user.role === 'super'">
      <b-list-group-item to="/conta/pages">Páginas</b-list-group-item>
      <b-list-group-item to="/conta/menus">Menus</b-list-group-item>
      <template v-for="key in Object.keys(settings.features)">
        <b-list-group-item v-if="settings.features[key].enabled" :key="key" :to="'/conta/' + key">{{ settings.features[key].title }}</b-list-group-item>
      </template>
      <b-list-group-item to="/conta/contacts">Contatos</b-list-group-item>
      <b-list-group-item to="/conta/users">Usuários</b-list-group-item>
      <b-list-group-item to="/conta/settings">Configurações</b-list-group-item>
    </b-list-group>
    <b-list-group v-else>
      <b-list-group-item to="/conta/pedidos">Meus pedidos</b-list-group-item>
      <b-list-group-item to="/conta/profile">Meus dados</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  layout: 'conta',
  data () {
    return {
      breadcrumb: [
        { text: this.$auth.user.role === 'user' ? 'Minha conta' : 'Painel', active: true }
      ]
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings
    }
  }
}
</script>
