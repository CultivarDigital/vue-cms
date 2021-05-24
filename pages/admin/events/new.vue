<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <EventForm />
  </div>
</template>
<script>
export default {
  layout: 'admin',
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
