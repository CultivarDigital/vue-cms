<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <ServiceProviderForm v-if="service_provider" :service-provider="service_provider" />
    <div v-else class="text-center">
      <b-spinner label="Carregando..." />
    </div>
  </div>
</template>
<script>
import ServiceProviderForm from '@/components/admin/ServiceProviderForm'
import mixinGlobal from '@/mixins/global'

export default {
  layout: 'conta',
  components: {
    ServiceProviderForm
  },
  mixins: [mixinGlobal],
  data () {
    return {
      service_provider: null,
      breadcrumb: []
    }
  },
  async created () {
    this.service_provider = await this.$axios.$get('/api/service_providers/' + this.$route.params.id).catch(this.showError)
    this.breadcrumb = [
      { text: 'Minha conta', to: '/conta' },
      { text: 'Prestadores de serviço', to: '/conta/prestadores-de-servico' },
      { text: this.service_provider.name, active: true }
    ]
  }
}
</script>
