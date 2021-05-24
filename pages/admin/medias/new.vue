<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <MediaForm />
  </div>
</template>
<script>
export default {
  layout: 'admin',
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Biblioteca', to: '/admin/medias' },
        { text: 'Cadastrar item', active: true }
      ]
    }
  }
}
</script>
