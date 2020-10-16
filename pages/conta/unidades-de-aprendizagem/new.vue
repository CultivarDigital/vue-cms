<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <LearningUnitForm />
  </div>
</template>
<script>
import LearningUnitForm from '@/components/admin/LearningUnitForm'
export default {
  layout: 'conta',
  components: {
    LearningUnitForm
  },
  data () {
    return {
      breadcrumb: [
        { text: 'Minha conta', to: '/conta' },
        { text: 'Unidades de referência', to: '/conta/unidades-de-referencia' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
