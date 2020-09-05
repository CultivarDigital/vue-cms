<template>
  <div class="dashboard">
    <b-breadcrumb :items="breadcrumb" />
    <b-list-group>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/learning_units">Unidades de aprendizagem</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/service_providers">Prestadores de serviço</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/seeds_networks">Redes de sementes</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/tags">Tags</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/posts">Notícias</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/about">Quem somos</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/press">Imprensa</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/medias">Biblioteca</b-list-group-item>
      <b-list-group-item to="/admin/newsletters">Contatos</b-list-group-item>
      <b-list-group-item to="/admin/users">Usuários</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('super')" to="/admin/sites">Sites</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('admin') && $store.state.site" :to="'/admin/sites/' + $store.state.site._id + '/edit'">Site</b-list-group-item>
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
