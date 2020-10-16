<template>
  <div class="unidades-de-referencia-page">
    <section class="content pb-5">
      <div class="page-header">
        <b-container>
          <b-breadcrumb :items="breadcrumb" />
        </b-container>
      </div>
      <page-info :page="page" />
      <b-container>
        <div>
          <LearningUnits :learning-units="learning_units" />
        </div>
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
      page_id: 'learning_units',
      page_title: 'Unidades de referência',
      breadcrumb: [
        { text: 'Mapa', to: '/mapa' },
        { text: 'Unidades de referência', active: true }
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
