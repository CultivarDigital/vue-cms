<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <ServiceProviderForm />
  </div>
</template>
<script>
import ServiceProviderForm from '@/components/admin/ServiceProviderForm'
export default {
  layout: 'conta',
  components: {
    ServiceProviderForm
  },
  data () {
    return {
      breadcrumb: [
        { text: 'Minha conta', to: '/conta' },
        { text: 'Prestadores de serviço', to: '/conta/prestadores-de-servico' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
