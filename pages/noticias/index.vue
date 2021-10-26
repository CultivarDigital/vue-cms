<template>
  <div>
    <Breadcrumb
      :active="title"
    />
    <section class="content pb-5">
      <Page slug="noticias" :breadcrumb="false" />
      <b-container>
        <tags :to="$route.path" />
        <div v-if="posts">
          <Posts :posts="posts" />
          <div v-if="posts.length === 0" class="alert text-center">Nenhuma notícia encontrada</div>
          <share />
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
import features from '@/data/features'
export default {
  data () {
    return {
      posts: null
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings
    },
    title() {
      if (this.settings && this.settings.features && this.settings.features.posts && this.settings.features.posts.title) {
        return this.settings.features.posts.title
      }
      return features.posts.title
    }
  },
  async created() {
    this.posts = await this.$axios.$get('/api/posts', { params: this.$route.query })
  }
}
</script>
