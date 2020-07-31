<template>
  <div class="dashboard">
    <b-breadcrumb :items="breadcrumb" />
    <b-list-group>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/villages">Aldeias</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/categories">Linhas de ação</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/projects">Projetos</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/tags">Tags</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/posts">Notícias</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('admin')" to="/admin/about">Quem somos</b-list-group-item>
      <b-list-group-item to="/admin/users">Usuários</b-list-group-item>
      <b-list-group-item v-if="$auth.hasScope('super')" to="/admin/sites">Sites</b-list-group-item>
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
