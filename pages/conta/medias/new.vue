<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <MediaForm />
  </div>
</template>
<script>
import features from '@/data/features'
export default {
  layout: 'conta',
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
        { text: 'Cadastrar item', active: true }
      ]
    }
  }

}
</script>
