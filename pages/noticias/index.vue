<template>
  <div v-if="page" class="posts-page">
    <section class="content pb-5">
      <page-info :info="page" />
      <b-container>
        <tags :to="$route.path" />
        <Posts :posts="posts" />
        <p v-if="posts.length === 0" class="text-center">Nenhum item encontrado</p>
        <share />
      </b-container>
    </section>
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
import mixinPage from '@/mixins/page'
export default {
  mixins: [mixinGlobal, mixinPage],
  data () {
    return {
      page_id: 'noticias',
      page_title: 'Notícias',
      posts: null
    }
  },
  async created() {
    this.posts = await this.$axios.$get('/api/posts/' + this.$route.params.id, { params: this.$route.query })
  }
}
</script>
