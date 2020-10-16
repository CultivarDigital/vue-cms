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
        { text: 'Produtores orgânicos', to: '/conta/produtores-organicos' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
