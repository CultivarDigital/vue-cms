<template>
  <div v-if="page" class="posts-page">
    <section class="content pb-5">
      <b-container>
        <h1 v-if="page.title" class="title pt-5">{{ page.title }}</h1>
        <p v-if="page.description">{{ page.description }}</p>
        <div v-if="page.content" class="quill-content mt-4" v-html="page.content" />
        <div>
          <b-row>
            <b-col md="9">
              <Posts :posts="posts" />
              <h3 v-if="posts.length === 0" class="text-center">Nenhuma notícia encontrada</h3>
            </b-col>
            <b-col md="3">
              <h3 class="mt-3">Tags</h3>
              <tags :to="$route.path" />
            </b-col>
          </b-row>
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
import mixinPage from '@/mixins/page'
import Posts from '@/components/site/Posts'
export default {
  components: {
    Posts
  },
  mixins: [mixinGlobal, mixinPage],
  data () {
    return {
      page_id: 'posts'
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
  },
  head () {
    return {
      title: 'Notícias - ' + this.site.name,
      meta: [
        { hid: 'description', name: 'description', content: this.page.description || this.site.description }
      ]
    }
  }
}
</script>
