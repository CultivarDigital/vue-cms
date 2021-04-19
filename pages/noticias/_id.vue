<template>
  <div v-if="post" class="post-page">
    <section class="content pb-5">
      <banners :items="[post.picture]" />
      <b-container>
        <h1 class="title pt-5">{{ post.title }}</h1>
        <div class="mb-3">
          <tags :tags="post.tags" />
        </div>

        <p v-if="post.description">{{ post.description }}</p>
        <div class="quill-content mt-4">
          <div v-if="post.content" v-html="post.content" />
          <div v-if="post.documents && post.documents.length > 0" class="documents mt-4">
            <h3 class="mb-3">Documentos</h3>
            <b-btn v-for="pdf in post.documents" :key="pdf._id" :href="pdf.url" target="_blank">
              <b-icon-paperclip /> {{ pdf.title || 'Baixar arquivo' }}
            </b-btn>
          </div>
          <share />
        </div>
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
      title: this.post.title + ' - Unidades de Referência - ' + this.site.name,
      meta: [
        { hid: 'description', name: 'description', content: this.post.description || this.site.description }
      ]
    }
  }
}
</script>
