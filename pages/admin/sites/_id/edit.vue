<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <SiteForm v-if="site" :site="site" />
    <div v-else class="text-center">
      <b-spinner label="Carregando..." />
    </div>
  </div>
</template>
<script>
import SiteForm from '@/components/SiteForm'
export default {
  layout: 'admin',
  components: {
    SiteForm
  },
  data () {
    return {
      site: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Sites', to: '/admin/sites' },
        { text: 'Editar', active: true }
      ]
    }
  },
  async created () {
    this.site = await this.$axios.$get('/api/sites/' + this.$route.params.id)
  }
}
</script>
