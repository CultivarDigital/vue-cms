<template>
  <div class="dashboard">
    <b-breadcrumb :items="breadcrumb" />
    <b-list-group>
      <!-- <b-list-group-item v-if="$auth.user.role === 'admin'" to="/admin/categories">Categorias</b-list-group-item> -->
      <b-list-group-item v-if="$auth.user.role === 'admin'" to="/admin/pages">Páginas</b-list-group-item>
      <b-list-group-item v-if="$auth.user.role === 'admin'" to="/admin/menus">Menus</b-list-group-item>
      <b-list-group-item v-if="$auth.user.role === 'admin'" to="/admin/posts">Notícias</b-list-group-item>
      <b-list-group-item v-if="$auth.user.role === 'admin'" to="/admin/medias">Biblioteca</b-list-group-item>
      <b-list-group-item v-if="$auth.user.role === 'admin'" to="/admin/events">Agenda</b-list-group-item>
      <b-list-group-item v-if="$auth.user.role === 'admin'" to="/admin/ecommerce">Loja</b-list-group-item>
      <b-list-group-item to="/admin/contacts">Contatos</b-list-group-item>
      <b-list-group-item to="/admin/users">Usuários</b-list-group-item>
      <b-list-group-item v-if="$auth.user.role === 'admin'" to="/admin/settings">Configurações</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', active: true }
      ]
    }
  }
}
</script>
