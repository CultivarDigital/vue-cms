<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <PostForm v-if="post" :post="post" />
    <div v-else class="text-center">
      <b-spinner small label="Carregando..." />
    </div>
  </div>
</template>
<script>
export default {
  layout: 'admin',
  data () {
    return {
      post: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Notícias', to: '/admin/posts' },
        { text: 'Editar', active: true }
      ]
    }
  },
  async created () {
    this.post = await this.$axios.$get('/api/posts/' + this.$route.params.id)
  }
}
</script>
