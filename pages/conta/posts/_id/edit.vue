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
import features from '@/data/features'
export default {
  layout: 'conta',
  data () {
    return {
      post: null
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings
    },
    breadcrumb() {
      let title = features.posts.title
      if (this.settings && this.settings.features && this.settings.features.posts && this.settings.features.posts.title) {
        title = this.settings.features.posts.title
      }
      return [
        { text: 'Painel', to: '/conta' },
        { text: title, to: '/conta/posts' },
        { text: 'Editar', active: true }
      ]
    }
  },
  async created () {
    this.post = await this.$axios.$get('/api/posts/' + this.$route.params.id)
  }
}
</script>
