<template>
  <div v-if="page" class="posts-page">
    <section class="content pb-5">
      <page-info :page="page" />
      <b-container>
        <tags :to="$route.path" />
        <Posts :posts="posts" />
        <p v-if="posts.length === 0" class="text-center">Nenhum item encontrado</p>
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
      page_title: 'Notícias'
    }
  },
  computed: {
    posts () {
      let posts = this.site.posts
      if (this.$route.query.tag) {
        posts = posts.filter(post => {
          return post.tags.find(tag => tag === this.$route.query.tag)
        })
      }
      return posts
    }
  }
}
</script>
