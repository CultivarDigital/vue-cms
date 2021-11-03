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
import features from '@/data/features'
export default {
  layout: 'conta',
  data () {
    return {
      media: null
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings
    },
    breadcrumb() {
      let title = features.medias.title
      if (this.settings && this.settings.features && this.settings.features.medias && this.settings.features.medias.title) {
        title = this.settings.features.medias.title
      }
      return [
        { text: 'Painel', to: '/conta' },
        { text: title, to: '/conta/medias' },
        { text: 'Editar item', active: true }
      ]
    }
  },
  async created () {
    this.media = await this.$axios.$get('/api/medias/' + this.$route.params.id)
  }
}
</script>
