<template>
  <div v-if="page" class="projects-page">
    <b-carousel :interval="7000" :indicators="page.pictures.length > 1">
      <b-carousel-slide v-for="(picture, index) in banners" :key="index" :caption="picture.title" :img-src="picture.url" />
    </b-carousel>
    <div class="page-title">
      <b-container>
        <h3>Linhas de ação <span>{{ currentCategory ? currentCategory.name : 'Todos os projetos' }}</span></h3>
      </b-container>
    </div>
    <section class="content pb-5">
      <b-container>
        <img src="~assets/img/pattern-left.png" class="pattern-left">
        <b-row class="categories">
          <b-col lg="4">
            <h1 class="title"><n-link to="/projetos">Projetos da Associação Floresta Protegida</n-link></h1>
          </b-col>
          <b-col lg="8">
            <b-row>
              <b-col v-for="category in site.categories" :key="category._id" md="3">
                <n-link :to="'/' + category.slug + '/projetos'"><b-img :src="require('~/assets/img/' + category.slug + ($route.params.categoria && $route.params.categoria === category.slug ? '-active' : '') + '.png')" /></n-link>
                <h3>{{ category.name }}</h3>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <p class="text-justify" v-if="$route.params.categoria && currentCategory.description">{{ currentCategory.description }}<br><br></p>
        <p class="text-justify" v-else-if="page.description">{{ page.description }}<br><br></p>
        <b-row>
          <b-col md="9">
            <projects :projects="projects" />
            <h3 v-if="projects.length == 0" class="text-center">Nenhum projeto encontrado</h3>
          </b-col>
          <b-col md="3">
            <h3 class="mt-3">Tags</h3>
            <tags :tags="site.tags" :to="$route.path" />
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
import mixinPage from '@/mixins/page'
import Projects from '@/components/site/Projects'
import Tags from '@/components/site/Tags'
export default {
  components: {
    Projects,
    Tags
  },
  mixins: [mixinGlobal, mixinPage],
  data () {
    return {
      page_id: 'projects'
    }
  },
  computed: {
    banners () {
      const category = this.currentCategory
      if (category && category.picture && category.picture) {
        return [category.picture]
      } else if (this.page) {
        return this.page.pictures
      }
      return null
    },
    currentCategory () {
      if (this.$route.params.categoria) {
        return this.site.categories.find(category => category.slug === this.$route.params.categoria)
      }
      return null
    },
    projects () {
      let projects = this.site.projects
      if (this.currentCategory) {
        projects = projects.filter(project => {
          return project.categories.includes(this.currentCategory._id)
        })
      }
      if (this.$route.query.tag) {
        projects = projects.filter(project => {
          return project.tags.find(tag => tag.slug === this.$route.query.tag)
        })
      }
      return projects
    }
  },
  methods: {
    stripHtml: (html) => {
      return html ? html.replace(/<\/?[^>]+(>|$)/g, '') : ''
    }
  },
  head () {
    return {
      title: (this.currentCategory ? this.currentCategory.name + ' - ' : 'Linhas de ação - ') + 'Projetos - ' + this.site.name,
      meta: [
        { hid: 'description', name: 'description', content: this.page.description || this.site.description }
      ]
    }
  }
}
</script>
<style lang="sass">
  .projects-page
    background-color: #ECDAB2
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
      background: transparent url('~assets/img/pattern2.png')
      background-position-x: center
      position: relative
      background-size: 1300px
      color: #2A114B
      h1
        font-family: 'Amatic SC', cursive
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
      .projects
        > h3
          font-family: 'Amatic SC', cursive
          font-weight: 700
          font-size: 46px
          margin-top: 40px
          text-align: left
        .card
          background-color: #ECDAB2
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

      .pattern-left
        width: 100px
        margin-left: -120px
        margin-bottom: -159px
      iframe
        width: 100%
        border: none
        min-height: 600px
</style>
