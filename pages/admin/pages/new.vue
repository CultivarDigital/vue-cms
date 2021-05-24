<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <PageForm />
  </div>
</template>
<script>
export default {
  layout: 'admin',
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
