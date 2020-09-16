<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <PlantingAreaForm />
  </div>
</template>
<script>
import PlantingAreaForm from '@/components/admin/PlantingAreaForm'
export default {
  layout: 'admin',
  components: {
    PlantingAreaForm
  },
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Áreas de plantio', to: '/admin/planting_areas' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
