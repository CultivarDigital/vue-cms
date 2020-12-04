<template>
  <div v-if="page" class="page-info">
    <banners :items="page.pictures" />
    <b-container>
      <h1 v-if="page.title" class="title pt-5 pb-4">{{ page.title }}</h1>
      <p v-if="page.description">{{ page.description }}</p>
      <b-button v-if="page.content || (page.pictures && page.pictures.length) || (page.pdfs && page.pdfs.length)" variant="primary" @click="showMore = !showMore">
        Saiba mais
      </b-button>
      <div v-if="showMore" class="quill-content mt-4">
        <banners :items="page.pictures" />
        <div v-html="page.content" />
        <div v-if="page.pdfs && page.pdfs.length > 0" class="gallery">
          <br>
          <h5>Documentos em anexo</h5>
          <div v-for="(pdf, index) in page.pdfs" :key="index">
            <a :href="pdf.url" target="_blank">
              <b-img :src="pdf.thumb" class="thumbnail" />
              <strong v-if="pdf.title">{{ pdf.title }}<br></strong>
              <br><span>{{ 'https://' + $store.state.site.domain_name + pdf.url }}</span>
            </a>
          </div>
        </div>
        <share />
      </div>
    </b-container>
  </div>
</template>
<script>
export default {
  props: {
    page: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      showMore: false
    }
  }
}
</script>
<style lang="sass">
  .page-info
    color: #fff
    .title
      font-size: 2rem
</style>
