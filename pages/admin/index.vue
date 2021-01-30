<template>
  <div class="dashboard">
    <b-breadcrumb :items="breadcrumb" />
    <b-list-group>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/menus">Menus</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/tags">Tags</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/categories">Categorias</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/pages">Páginas</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/posts">Notícias</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/events">Eventos</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/medias">Biblioteca</b-list-group-item>
      <b-list-group-item to="/admin/contacts">Contatos</b-list-group-item>
      <b-list-group-item to="/admin/users">Usuários</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('super')" to="/admin/sites">Sites</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('admin') && $store.state.site" :to="'/admin/sites/' + $store.state.site._id + '/edit'">Configurações do site</b-list-group-item>
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
