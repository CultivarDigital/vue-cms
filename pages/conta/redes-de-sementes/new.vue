<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <SeedsNetworkForm />
  </div>
</template>
<script>
import SeedsNetworkForm from '@/components/admin/SeedsNetworkForm'
export default {
  layout: 'conta',
  components: {
    SeedsNetworkForm
  },
  data () {
    return {
      breadcrumb: [
        { text: 'Minha conta', to: '/conta' },
        { text: 'Redes de sementes', to: '/conta/redes-de-sementes' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
