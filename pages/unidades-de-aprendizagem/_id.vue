<template>
  <div v-if="learning_unit" class="learning-unit-page">
    <banners :items="[learning_unit.picture]" />
    <section class="content pb-5">
      <b-container>
        <h1 class="title pt-5">{{ learning_unit.title }}</h1>
        <p v-if="learning_unit.description">{{ learning_unit.description }}</p>
        <b-row>
          <b-col md="9">
            <div class="quill-content mt-4">
              <div v-if="learning_unit.content" v-html="learning_unit.content" />
            </div>
          </b-col>
          <b-col md="3">
            <h3 class="mt-3">Assuntos</h3>
            <tags :tags="learning_unit.tags.length > 0 ? learning_unit.tags : site.tags" to="/noticias" />
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
import mixinPage from '@/mixins/page'
import Banners from '@/components/site/Banners'
export default {
  components: {
    Banners
  },
  mixins: [mixinGlobal, mixinPage],
  data () {
    return {
      page_id: 'learning_units'
    }
  },
  computed: {
    learning_unit () {
      return this.site.learning_units.find(learningUnit => learningUnit.slug === this.$route.params.id)
    }
  },
  head () {
    return {
      title: this.post.title + ' - Notícias - ' + this.site.name,
      meta: [
        { hid: 'description', name: 'description', content: this.post.description || this.site.description }
      ]
    }
  }
}
</script>
<style lang="sass">
  .learning-unit-page
    .content
      background-color: #f6a447
</style>
