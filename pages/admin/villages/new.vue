<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <VillageForm />
  </div>
</template>
<script>
import VillageForm from '@/components/admin/VillageForm'
export default {
  layout: 'admin',
  components: {
    VillageForm
  },
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Aldeias', to: '/admin/villages' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
