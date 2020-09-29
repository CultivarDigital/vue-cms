<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <SeedsNetworkForm v-if="seeds_network" :seeds-network="seeds_network" />
    <div v-else class="text-center">
      <b-spinner small label="Carregando..." />
    </div>
  </div>
</template>
<script>
import SeedsNetworkForm from '@/components/admin/SeedsNetworkForm'
import mixinGlobal from '@/mixins/global'

export default {
  layout: 'conta',
  components: {
    SeedsNetworkForm
  },
  mixins: [mixinGlobal],
  data () {
    return {
      seeds_network: null,
      breadcrumb: []
    }
  },
  async created () {
    this.seeds_network = await this.$axios.$get('/api/seeds_networks/' + this.$route.params.id).catch(this.showError)
    this.breadcrumb = [
      { text: 'Minha conta', to: '/conta' },
      { text: 'Redes de sementes', to: '/conta/redes-de-sementes' },
      { text: this.seeds_network.name, active: true }
    ]
  }
}
</script>
