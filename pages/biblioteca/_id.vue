<template>
  <div v-if="post" class="post-page">
    <section class="content pb-5">
      <b-container>
        <h1 class="title pt-5">{{ post.title }}</h1>
        <p v-if="post.description">{{ post.description }}</p>
        <b-row>
          <b-col md="9">
            <div class="quill-content mt-4">
              <banners :items="[post.picture]" />
              <div v-if="post.content" v-html="post.content" />
            </div>
          </b-col>
          <b-col md="3">
            <h3 class="mt-3">Tags</h3>
            <tags :tags="post.tags.length > 0 ? post.tags : site.tags" to="/noticias" />
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
import mixinPage from '@/mixins/page'
import Banners from '@/components/site/Banners'
export default {
  components: {
    Banners
  },
  mixins: [mixinGlobal, mixinPage],
  data () {
    return {
      page_id: 'posts'
    }
  },
  computed: {
    post () {
      return this.site.posts.find(post => post.slug === this.$route.params.id)
    }
  },
  head () {
    return {
      title: this.post.title + ' - Unidades de Aprendizagem - ' + this.site.name,
      meta: [
        { hid: 'description', name: 'description', content: this.post.description || this.site.description }
      ]
    }
  }
}
</script>
<style lang="sass">
  .post-page
    .content
      background-color: #f6a447
</style>
