<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <PageForm v-if="page" :page="page" />
    <div v-else class="text-center">
      <b-spinner small label="Carregando..." />
    </div>
  </div>
</template>
<script>
import PageForm from '@/components/admin/PageForm'
import mixinGlobal from '@/mixins/global'

export default {
  layout: 'admin',
  components: {
    PageForm
  },
  mixins: [mixinGlobal],
  data () {
    return {
      page: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Páginas', to: '/admin/pages' },
        { text: 'Editar', active: true }
      ]
    }
  },
  async created () {
    this.page = await this.$axios.$get('/api/pages/' + this.$route.params.id).catch(this.showError)
  }
}
</script>
