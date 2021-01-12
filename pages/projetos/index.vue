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
        <p v-if="$route.params.categoria && currentCategory.description" class="text-justify">{{ currentCategory.description }}<br><br></p>
        <p v-else-if="page.description" class="text-justify">{{ page.description }}<br><br></p>
        <b-row>
          <b-col md="9">
            <projects :projects="projects" />
            <h3 v-if="projects.length === 0" class="text-center">Nenhum projeto encontrado</h3>
          </b-col>
          <b-col md="3">
            <h3 class="mt-3">Tags</h3>
            <tags :to="$route.path" />
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
export default {
  components: {
    Projects
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
