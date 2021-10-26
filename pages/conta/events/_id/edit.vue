<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <EventForm v-if="event" :event="event" />
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
      event: null
    }
  },
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
        { text: 'Editar', active: true }
      ]
    }
  },
  async created () {
    this.event = await this.$axios.$get('/api/events/' + this.$route.params.id)
  }

}
</script>
