<template>
  <div v-if="project" class="project-page">
    <b-carousel :interval="7000" :indicators="project.pictures.length > 1">
      <b-carousel-slide v-for="(picture, index) in project.pictures" :key="index" :caption="picture.title" :img-src="picture.url" />
    </b-carousel>
    <div class="page-title">
      <b-container>
        <h3>Projeto</h3>
      </b-container>
    </div>
    <section class="content pb-5">
      <b-container>
        <b-row class="categories">
          <b-col lg="4">
            <h1 class="title">{{ project.name }}</h1>
          </b-col>
          <b-col lg="8">
            <b-row>
              <b-col v-for="category in site.categories" :key="category._id" md="3">
                <n-link :to="'/' + category.slug + '/projetos'"><b-img :src="require('~/assets/img/' + category.slug + (project.categories.includes(category._id) ? '-active' : '') + '.png')" /></n-link>
                <h3>{{ category.name }}</h3>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <p v-if="project.description">{{ project.description }}</p>
        <b-row>
          <b-col md="9">
            <div class="quill-content mt-4">
              <div v-if="project.content" v-html="project.content" />
              <div v-if="project.pdfs.length > 0" class="pdfs">
                <h3>Documentos</h3>
                <b-row class="text-center">
                  <b-col v-for="pdf in project.pdfs" :key="pdf._id" md="4">
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
            <tags :tags="project.tags.length > 0 ? project.tags : site.tags" to="/projetos" />
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
import mixinPage from '@/mixins/page'
import Tags from '@/components/site/Tags'
export default {
  components: {
    Tags
  },
  mixins: [mixinGlobal, mixinPage],
  data () {
    return {
      page_id: 'projects'
    }
  },
  computed: {
    project () {
      return this.site.projects.find(project => project.slug === this.$route.params.id)
    }
  },
  methods: {
    categories (project) {
      return this.site.categories.filter(category => project.categories.includes(category._id))
    }
  },
  head () {
    return {
      title: (this.currentCategory ? this.currentCategory.name + ' - ' : 'Linhas de ação - ') + 'Projetos - ' + this.site.name,
      meta: [
        { hid: 'description', name: 'description', content: this.project.description || this.site.description }
      ]
    }
  }
}
</script>
<style lang="sass">
  .project-page
    background-color: #ECDAB2
    a:hover
      text-decoration: none
    .carousel-item
      max-height: 38vw
    .page-title
      background-color: #2A114B
      color: #fff
      padding: 5px 20px
      h3
        font-size: 28px
        margin: 0
        span
          font-weight: 400
          font-size: 20px
          margin-top: 5px
          float: right
          position: relative
          @media (max-width: 576px)
            display: none
    .content
      background-position-x: center
      position: relative
      background-size: 1300px
      color: #2A114B
      h1
        font-family: 'Arvo', serif
        font-weight: 700
        font-size: 46px
        a
          text-decoration: none
          color: #2A114B
      h3
        color: #2A114B
        font-size: 40px
      .categories
        margin-top: 40px
        margin-bottom: 40px
        text-align: center
        img
          width: 70px
        h3
          font-size: 20px
          color: #2A114B
        .col-lg-4
          @media (min-width: 992px)
            border-right: 2px solid #2A114B
      .pdfs
        a
          text-decoration: none
          color: #2A114B
          .img
            min-height: 18vw
            img
              border-radius: 0
      .tags-component
        .btn
          width: 100%
          color: #722b1d
          border-color: #f5e7c5
          background-color: #f5e7c5
          margin: 10px 0
          &:hover, &.active
            color: #f5e7c5
            border-color: #722b1d
            background-color: #722b1d

</style>
