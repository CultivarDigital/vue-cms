<template>
  <div class="press">
    <b-breadcrumb :items="breadcrumb" />
    <PageForm slug="press" />
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
        { text: 'Na imprensa', active: true }
      ]
    }
  }
}
</script>
