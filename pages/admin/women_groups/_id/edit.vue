<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <WomenGroupForm v-if="women_group" :women-group="women_group" />
    <div v-else class="text-center">
      <b-spinner small label="Carregando..." />
    </div>
  </div>
</template>
<script>
import WomenGroupForm from '@/components/admin/WomenGroupForm'
import mixinGlobal from '@/mixins/global'

export default {
  layout: 'admin',
  components: {
    WomenGroupForm
  },
  mixins: [mixinGlobal],
  data () {
    return {
      women_group: null,
      breadcrumb: []
    }
  },
  async created () {
    this.women_group = await this.$axios.$get('/api/women_groups/' + this.$route.params.id).catch(this.showError)
    this.breadcrumb = [
      { text: 'Painel', to: '/admin' },
      { text: 'Grupos de mulheres', to: '/admin/women_groups' },
      { text: this.women_group.name, active: true }
    ]
  }
}
</script>
