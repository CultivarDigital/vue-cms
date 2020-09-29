<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <MediaForm v-if="media" :media="media" />
    <div v-else class="text-center">
      <b-spinner small label="Carregando..." />
    </div>
  </div>
</template>
<script>
import MediaForm from '@/components/admin/MediaForm'
import mixinGlobal from '@/mixins/global'

export default {
  layout: 'admin',
  components: {
    MediaForm
  },
  mixins: [mixinGlobal],
  data () {
    return {
      media: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Biblioteca', to: '/admin/medias' },
        { text: 'Editar item', active: true }
      ]
    }
  },
  async created () {
    this.media = await this.$axios.$get('/api/medias/' + this.$route.params.id).catch(this.showError)
  }
}
</script>
