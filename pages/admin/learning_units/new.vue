<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <LearningUnitForm />
  </div>
</template>
<script>
import LearningUnitForm from '@/components/admin/LearningUnitForm'
export default {
  layout: 'admin',
  components: {
    LearningUnitForm
  },
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Unidades de referência', to: '/admin/learning_units' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
