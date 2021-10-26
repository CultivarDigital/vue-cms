<template>
  <div v-if="post" class="post-page">
    <Breadcrumb
      :links="[[title, '/noticias']]"
      :active="post.title"
      :description="post.description"
    />
    <section class="mb-5">
      <Banners v-if="post.image" :items="[post.image]" />
      <b-container>
        <h1 class="title pt-5 text-primary">{{ post.title }}</h1>
        <div class="mb-3">
          <tags :tags="post.tags" @click="filterbyTag" />
        </div>
        <p v-if="post.description">{{ post.description }}</p>
        <div class="dynamic-content mt-4">
          <div v-if="post.content" v-html="post.content" />
          <Documents :documents="post.docs" />
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
      post: null
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
    this.post = await this.$axios.$get('/api/posts/' + this.$route.params.id)
  },
  methods: {
    filterbyTag(tag) {
      this.$router.push('/noticias?tag=' + tag)
    }
  }
}
</script>
