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
              <div v-if="post.pdfs && post.pdfs.length > 0" class="pdfs">
                <h3>Documentos</h3>
                <b-row class="text-center">
                  <b-col v-for="pdf in post.pdfs" :key="pdf._id" md="4">
                    <a :href="pdf.url" target="_blank">
                      <div class="img">
                        <b-img :src="pdf.thumb" />
                      </div>
                      <p>{{ pdf.title || 'Baixar arquivo' }}</p>
                      <br>
                    </a>
                  </b-col>
                </b-row>
              </div>
              <share />
            </div>
          </b-col>
          <b-col md="3">
            <h3 class="mt-3">Tags</h3>
            <tags :tags="post.tags" />
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
      title: this.post.title + ' - Unidades de Referência - ' + this.site.name,
      meta: [
        { hid: 'description', name: 'description', content: this.post.description || this.site.description }
      ]
    }
  }
}
</script>
