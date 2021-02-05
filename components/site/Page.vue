<template>
  <div v-if="pageInfo" class="default-page">
    <section class="content pb-5">
      <b-container>
        <h1 v-if="pageInfo.title" class="title pt-5">{{ pageInfo.title }}</h1>
        <p v-if="pageInfo.description">{{ pageInfo.description }}</p>
        <div class="quill-content mt-4">
          <banners :items="pageInfo.pictures" />
          <div v-html="pageInfo.content" />
          <div v-if="pageInfo.pdfs && pageInfo.pdfs.length > 0" class="gallery">
            <br>
            <h5>Documentos em anexo</h5>
            <div v-for="(pdf, index) in pageInfo.pdfs" :key="index">
              <a :href="pdf.url" target="_blank">
                <b-img :src="pdf.thumb" class="thumbnail" />
                <strong v-if="pdf.title">{{ pdf.title }}<br></strong>
                <span>{{ 'https://' + site.domain_name + pdf.url }}</span>
              </a>
            </div>
          </div>
          <share />
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
import mixinPage from '@/mixins/page'
export default {
  mixins: [mixinPage],
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      pageInfo: null
    }
  },
  async created() {
    this.pageInfo = await this.$axios.$get('/api/pages/' + this.id)
    console.log(this.pageInfo)
  }
}
</script>
