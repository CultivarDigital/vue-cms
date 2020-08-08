<template>
  <div v-if="page" class="unidades-de-aprendizagem-page">
    <banners :items="page.pictures" />
    <section class="content pb-5">
      <b-container>
        <h1 v-if="page.title" class="title pt-5">{{ page.title }}</h1>
        <p v-if="page.description">{{ page.description }}</p>
        <div v-if="page.content" class="quill-content mt-4" v-html="page.content" />
        <div>
          <b-row>
            <b-col md="9">
              <LearningUnits :learning-units="learning_units" />
              <h3 v-if="learning_units.length === 0" class="text-center">Nenhuma notícia encontrada</h3>
            </b-col>
            <b-col md="3">
              <h3 class="mt-3">Assuntos</h3>
              <tags :tags="site.tags" :to="$route.path" />
            </b-col>
          </b-row>
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
import mixinPage from '@/mixins/page'
import LearningUnits from '@/components/site/LearningUnits'
import Tags from '@/components/site/Tags'
import Banners from '@/components/site/Banners'
export default {
  components: {
    LearningUnits,
    Tags,
    Banners
  },
  mixins: [mixinGlobal, mixinPage],
  data () {
    return {
      page_id: 'learning_units'
    }
  },
  computed: {
    learning_units () {
      let learningUnits = this.site.learning_units
      if (this.$route.query.tag) {
        learningUnits = learningUnits.filter(learningUnit => {
          return learningUnit.tags.find(tag => tag.slug === this.$route.query.tag)
        })
      }
      return learningUnits
    }
  },
  head () {
    return {
      title: 'Notícias - ' + this.site.name,
      meta: [
        { hid: 'description', name: 'description', content: this.page.description || this.site.description }
      ]
    }
  }
}
</script>
