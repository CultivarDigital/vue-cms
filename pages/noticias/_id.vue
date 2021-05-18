<template>
  <div v-if="post" class="post-page">
    <section class="content pb-5">
      <Banners :items="[post.picture]" />
      <b-container>
        <h1 class="title pt-5">{{ post.title }}</h1>
        <div class="mb-3">
          <tags :tags="post.tags" @click="filterbyTag" />
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
export default {
  mixins: [mixinGlobal, mixinPage],
  data () {
    return {
      page_id: 'posts',
      post: null
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
