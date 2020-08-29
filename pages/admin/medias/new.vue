<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <MediaForm />
  </div>
</template>
<script>
import MediaForm from '@/components/admin/MediaForm'
export default {
  layout: 'admin',
  components: {
    MediaForm
  },
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
