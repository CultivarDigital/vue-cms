<template>
  <div>
    <Breadcrumb
      active="Notícias"
    />
    <section class="content pb-5">
      <Page slug="noticias" />
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
export default {
  data () {
    return {
      posts: null
    }
  },
  async created() {
    this.posts = await this.$axios.$get('/api/posts', { params: this.$route.query })
  }
}
</script>
