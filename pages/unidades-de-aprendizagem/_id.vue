<template>
  <div v-if="learning_unit" class="learning-unit-page">
    <banners :items="learning_unit.pictures" />
    <section class="content pb-5">
      <b-container>
        <h1 class="title pt-5">{{ learning_unit.name }}</h1>
        <p v-if="learning_unit.description">{{ learning_unit.description }}</p>
        <div class="quill-content mt-4">
          <p v-if="learning_unit.planting_time"><strong>Data:</strong>{{ learning_unit.planting_time }}</p>
          <p vplanting_timeif="learning_unit.area_size"><strong>Área:</strong> {{ learning_unit.area_size }} hectares</p>
          <p v-if="learning_unit.address && learning_unit.address.location && learning_unit.address.location.coordinates">
            <strong>Local:</strong>
            {{ learning_unit.address.location.coordinates[0] }}, {{ learning_unit.address.location.coordinates[1] }}
          </p>
        </div>
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
      title: this.learning_unit.name + ' - Notícias - ' + this.site.name,
      meta: [
        { hid: 'description', name: 'description', content: this.learning_unit.description || this.site.description }
      ]
    }
  }
}
</script>
