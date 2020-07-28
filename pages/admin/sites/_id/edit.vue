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
import SiteForm from '@/components/admin/SiteForm'
import mixinGlobal from '@/mixins/global'

export default {
  layout: 'admin',
  components: {
    SiteForm
  },
  mixins: [mixinGlobal],
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
    this.site = await this.$axios.$get('/api/sites/' + this.$route.params.id).catch(this.showError)
  }
}
</script>
