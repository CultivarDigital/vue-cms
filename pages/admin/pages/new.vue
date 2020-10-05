<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <PageForm />
  </div>
</template>
<script>
import PageForm from '@/components/admin/PageForm'
export default {
  layout: 'admin',
  components: {
    PageForm
  },
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Páginas', to: '/admin/pages' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
