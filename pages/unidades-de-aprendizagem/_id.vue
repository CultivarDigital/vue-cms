<template>
  <div v-if="learning_unit" class="learning-unit-page">
    <section class="content pb-5">
      <b-container>
        <h1 class="title pt-5">{{ learning_unit.name }}</h1>
        <p v-if="learning_unit.description">{{ learning_unit.description }}</p>
        <b-row>
          <b-col md="9">
            <div class="quill-content mt-4">
              <banners :items="learning_unit.pictures" />
              <p v-if="learning_unit.planting_time"><strong>Data do plantio:</strong> {{ learning_unit.planting_time }}</p>
              <p v-if="learning_unit.area_size"><strong>Área:</strong> {{ learning_unit.area_size }} hectares</p>
              <p v-if="learning_unit.address && learning_unit.address.location && learning_unit.address.location.coordinates">
                <strong>Local:</strong>
                {{ learning_unit.address.location.coordinates[0] }}, {{ learning_unit.address.location.coordinates[1] }}
              </p>
            </div>
          </b-col>
          <b-col md="3">
            <h3 class="mt-3">Localização</h3>
            <n-link to="/mapa">
              <ItemMap type="learning_units" :address="learning_unit.address" />
              <p v-if="learning_unit.address && learning_unit.address.location && learning_unit.address.location.coordinates" class="text-center">
                {{ learning_unit.address.location.coordinates[0] }}, {{ learning_unit.address.location.coordinates[1] }}
              </p>
            </n-link>
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
import ItemMap from '@/components/site/ItemMap'
export default {
  components: {
    Banners,
    ItemMap
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
