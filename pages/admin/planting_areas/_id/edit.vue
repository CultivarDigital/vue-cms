<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <PlantingAreaForm v-if="planting_area" :planting-area="planting_area" />
    <div v-else class="text-center">
      <b-spinner small label="Carregando..." />
    </div>
  </div>
</template>
<script>
import PlantingAreaForm from '@/components/admin/PlantingAreaForm'
import mixinGlobal from '@/mixins/global'

export default {
  layout: 'admin',
  components: {
    PlantingAreaForm
  },
  mixins: [mixinGlobal],
  data () {
    return {
      planting_area: null,
      breadcrumb: []
    }
  },
  async created () {
    this.planting_area = await this.$axios.$get('/api/planting_areas/' + this.$route.params.id).catch(this.showError)
    this.breadcrumb = [
      { text: 'Painel', to: '/admin' },
      { text: 'Áreas de plantio', to: '/admin/planting_areas' },
      { text: [this.planting_area.city, this.planting_area.city].join(' - '), active: true }
    ]
  }
}
</script>
