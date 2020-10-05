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
import EventForm from '@/components/admin/EventForm'
import mixinGlobal from '@/mixins/global'

export default {
  layout: 'admin',
  components: {
    EventForm
  },
  mixins: [mixinGlobal],
  data () {
    return {
      event: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Eventos', to: '/admin/events' },
        { text: 'Editar', active: true }
      ]
    }
  },
  async created () {
    this.event = await this.$axios.$get('/api/events/' + this.$route.params.id).catch(this.showError)
  }
}
</script>
