<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <CategoryForm />
  </div>
</template>
<script>
import CategoryForm from '@/components/admin/CategoryForm'
export default {
  layout: 'admin',
  components: {
    CategoryForm
  },
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Categorias', to: '/admin/categories' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
