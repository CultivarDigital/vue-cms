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
export default {
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
