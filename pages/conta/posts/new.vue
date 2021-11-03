<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <PostForm />
  </div>
</template>
<script>
import features from '@/data/features'
export default {
  layout: 'conta',
  data () {
    return {
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
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
