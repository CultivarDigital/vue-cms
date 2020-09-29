<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <CategoryForm v-if="category" :category="category" />
    <div v-else class="text-center">
      <b-spinner small label="Carregando..." />
    </div>
  </div>
</template>
<script>
import CategoryForm from '@/components/admin/CategoryForm'
import mixinGlobal from '@/mixins/global'

export default {
  layout: 'admin',
  components: {
    CategoryForm
  },
  mixins: [mixinGlobal],
  data () {
    return {
      category: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Linhas de ação', to: '/admin/categories' },
        { text: 'Editar', active: true }
      ]
    }
  },
  async created () {
    this.category = await this.$axios.$get('/api/categories/' + this.$route.params.id).catch(this.showError)
  }
}
</script>
