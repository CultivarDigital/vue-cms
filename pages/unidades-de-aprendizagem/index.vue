<template>
  <div v-if="page" class="unidades-de-aprendizagem-page">
    <banners :items="page.pictures" />
    <section class="content pb-5">
      <div class="page-header">
        <b-container>
          <b-breadcrumb :items="breadcrumb" />
        </b-container>
      </div>
      <b-container>
        <h1 v-if="page.title" class="title pt-5">{{ page.title }}</h1>
        <p v-if="page.description">{{ page.description }}</p>
        <div v-if="page.content" class="quill-content mt-4" v-html="page.content" />
        <div>
          <LearningUnits :learning-units="learning_units" />
          <h3 v-if="learning_units.length === 0" class="text-center">Nenhuma unidade encontrada</h3>
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
import mixinPage from '@/mixins/page'
import LearningUnits from '@/components/site/LearningUnits'
import Banners from '@/components/site/Banners'
export default {
  components: {
    LearningUnits,
    Banners
  },
  mixins: [mixinGlobal, mixinPage],
  data () {
    return {
      page_id: 'learning_units',
      breadcrumb: [
        { text: 'Mapa', to: '/mapa' },
        { text: 'Unidades de aprendizagem', active: true }
      ]
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
  }
}
</script>
