<template>
  <div v-if="info" class="page-info">
    <banners :items="info.pictures" />
    <b-container>
      <div class="title">
        <h4 v-if="info.title" class="title">{{ info.title }}</h4>
        <hr>
      </div>
      <p v-if="info.description">{{ info.description }}</p>
      <div v-if="!showContent" class="text-center mb-5">
        <b-button v-if="info.content || (info.pictures && info.pictures.length) || (info.pdfs && info.pdfs.length)" variant="primary" @click="showMore = !showMore">
          Saiba mais
        </b-button>
      </div>
      <div v-if="showMore || showContent" class="quill-content mt-4">
        <div v-html="info.content" />
        <div v-if="info.pdfs && info.pdfs.length > 0" class="gallery mt-5">
          <h5>Documentos em anexo</h5>
          <hr>
          <b-row>
            <b-col v-for="(pdf, index) in info.pdfs" :key="index" md="6">
              <b-card :img-src="pdf.thumb" :img-alt="pdf.title" img-left class="mb-4">
                <b-card-text>
                  <p>{{ pdf.title }}</p>
                  <br>
                  <p>
                    <a :href="pdf.url" target="_blank" class="btn btn-secondary">Baixar</a>
                  </p>
                </b-card-text>
              </b-card>
            </b-col>
          </b-row>
        </div>
      </div>
    </b-container>
  </div>
</template>
<script>
export default {
  props: {
    info: {
      type: Object,
      default: null
    },
    showContent: {
      type: Boolean,
      default: false
    },
    noShare: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showMore: false
    }
  }
}
</script>
