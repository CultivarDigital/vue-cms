<template>
  <div v-if="page" class="posts-page">
    <section class="content pb-5">
      <page-info :page="page" />
      <b-container>
        <b-row>
          <b-col md="9">
            <Posts :posts="posts" />
            <h3 v-if="posts.length === 0" class="text-center text-white">Nenhuma notícia encontrada</h3>
          </b-col>
          <b-col md="3">
            <h3 class="mt-3 title">Tags</h3>
            <tags :to="$route.path" />
          </b-col>
        </b-row>
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
          return post.tags.find(tag => tag.slug === this.$route.query.tag)
        })
      }
      return posts
    }
  }
}
</script>
