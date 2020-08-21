<template>
  <div v-if="page" class="default-page">
    <section class="content pb-5">
      <b-container>
        <h1 v-if="page.title" class="title pt-5">{{ page.title }}</h1>
        <p v-if="page.description">{{ page.description }}</p>
        <div class="quill-content mt-4">
          <banners :items="page.pictures" />
          <div v-html="page.content" />
          <div v-if="page.pdfs && page.pdfs.length > 0" class="gallery">
            <br>
            <h5>Anexos</h5>
            <b-row>
              <b-col v-for="(pdf, index) in page.pdfs" :key="index" md="4">
                <a :href="pdf.url" target="_blank">
                  <b-img :src="pdf.thumb" class="thumbnail" />
                  <p v-if="pdf.title" class="text-center">{{ pdf.title }}</p>
                </a>
              </b-col>
            </b-row>
          </div>
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
      page_id: this.id
    }
  }
}
</script>
