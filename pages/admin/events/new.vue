<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <EventForm />
  </div>
</template>
<script>
import EventForm from '@/components/admin/EventForm'
export default {
  layout: 'admin',
  components: {
    EventForm
  },
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Eventos', to: '/admin/events' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
