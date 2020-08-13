<template>
  <div class="newsletters">
    <b-breadcrumb :items="breadcrumb" />
    <div>
      <div v-if="newsletters">
        <b-table v-if="newsletters.length" :fields="table" :items="newsletters" responsive="sm" />
        <b-alert v-else show variant="dark" class="text-center">Nenhum item encontrado</b-alert>
      </div>
      <div v-else class="text-center">
        <b-spinner label="Carregando..." />
    </div>
  </div>
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
export default {
  layout: 'admin',
  mixins: [mixinGlobal],
  data () {
    return {
      newsletters: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Contatos', active: true }
      ],
      table: [
        { key: 'name', label: 'Nome' },
        { key: 'email', label: 'Email' }
      ]
    }
  },
  async created () {
    this.newsletters = await this.$axios.$get('/api/newsletters').catch(this.showError)
  }
}
</script>
