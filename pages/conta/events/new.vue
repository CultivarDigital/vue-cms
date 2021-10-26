<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <EventForm />
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
      let title = features.events.title
      if (this.settings && this.settings.features && this.settings.features.events && this.settings.features.events.title) {
        title = this.settings.features.events.title
      }
      return [
        { text: 'Painel', to: '/conta' },
        { text: title, to: '/conta/events' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
