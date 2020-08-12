<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <ServiceProviderForm />
  </div>
</template>
<script>
import ServiceProviderForm from '@/components/admin/ServiceProviderForm'
export default {
  layout: 'admin',
  components: {
    ServiceProviderForm
  },
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Prestadores de serviço', to: '/admin/service_providers' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
