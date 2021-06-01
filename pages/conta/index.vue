<template>
  <div class="dashboard">
    <b-breadcrumb :items="breadcrumb" />
    <b-list-group>
      <!-- <b-list-group-item v-if="$auth.user.role === 'admin'" to="/conta/categories">Categorias</b-list-group-item> -->
      <b-list-group-item v-if="$auth.user.role === 'admin'" to="/conta/pages">Páginas</b-list-group-item>
      <b-list-group-item v-if="$auth.user.role === 'admin'" to="/conta/menus">Menus</b-list-group-item>
      <!-- <b-list-group-item v-if="$auth.user.role === 'admin'" to="/conta/posts">Notícias</b-list-group-item> -->
      <b-list-group-item v-if="$auth.user.role === 'admin'" to="/conta/medias">Midiateca</b-list-group-item>
      <!-- <b-list-group-item v-if="$auth.user.role === 'admin'" to="/conta/events">Agenda</b-list-group-item> -->
      <b-list-group-item v-if="$auth.user.role === 'admin'" to="/conta/ecommerce">Loja</b-list-group-item>
      <b-list-group-item to="/conta/contacts">Contatos</b-list-group-item>
      <b-list-group-item to="/conta/users">Usuários</b-list-group-item>
      <b-list-group-item v-if="$auth.user.role === 'admin'" to="/conta/settings">Configurações</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  layout: 'conta',
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', active: true }
      ]
    }
  }
}
</script>
