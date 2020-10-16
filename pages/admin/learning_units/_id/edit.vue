<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <LearningUnitForm v-if="learning_unit" :learning-unit="learning_unit" />
    <div v-else class="text-center">
      <b-spinner small label="Carregando..." />
    </div>
  </div>
</template>
<script>
import LearningUnitForm from '@/components/admin/LearningUnitForm'
import mixinGlobal from '@/mixins/global'

export default {
  layout: 'admin',
  components: {
    LearningUnitForm
  },
  mixins: [mixinGlobal],
  data () {
    return {
      learning_unit: null,
      breadcrumb: []
    }
  },
  async created () {
    this.learning_unit = await this.$axios.$get('/api/learning_units/' + this.$route.params.id).catch(this.showError)
    this.breadcrumb = [
      { text: 'Painel', to: '/admin' },
      { text: 'Unidades de referência', to: '/admin/learning_units' },
      { text: this.learning_unit.name, active: true }
    ]
  }
}
</script>
