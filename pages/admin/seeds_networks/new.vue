<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <SeedsNetworkForm />
  </div>
</template>
<script>
import SeedsNetworkForm from '@/components/admin/SeedsNetworkForm'
export default {
  layout: 'admin',
  components: {
    SeedsNetworkForm
  },
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Redes de sementes', to: '/admin/seeds_networks' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
