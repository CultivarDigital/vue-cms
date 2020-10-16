<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <WomenGroupForm />
  </div>
</template>
<script>
import WomenGroupForm from '@/components/admin/WomenGroupForm'
export default {
  layout: 'admin',
  components: {
    WomenGroupForm
  },
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Grupos de mulheres', to: '/admin/women_groups' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
