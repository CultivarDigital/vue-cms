<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <CategoryForm />
  </div>
</template>
<script>
import CategoryForm from '@/components/CategoryForm'
export default {
  layout: 'admin',
  components: {
    CategoryForm
  },
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Linhas de ação', to: '/admin/categories' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
