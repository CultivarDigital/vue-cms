<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <VillageForm v-if="village" :village="village" />
    <div v-else class="text-center">
      <b-spinner label="Carregando..." />
    </div>
  </div>
</template>
<script>
import VillageForm from '@/components/VillageForm'
import mixinGlobal from '@/mixins/global'

export default {
  layout: 'admin',
  components: {
    VillageForm
  },
  mixins: [mixinGlobal],
  data () {
    return {
      village: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Aldeias', to: '/admin/villages' },
        { text: 'Editar', active: true }
      ]
    }
  },
  async created () {
    this.village = await this.$axios.$get('/api/villages/' + this.$route.params.id).catch(this.showError)
  }
}
</script>
