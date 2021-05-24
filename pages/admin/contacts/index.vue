<template>
  <div class="contacts">
    <b-breadcrumb :items="breadcrumb" />
    <div>
      <div v-if="contacts">
        <b-table v-if="contacts.length" :fields="table" :items="contacts" responsive="sm" />
        <b-alert v-else show variant="dark" class="text-center">Nenhum item encontrado</b-alert>
      </div>
      <div v-else class="text-center">
        <b-spinner small label="Carregando..." />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'admin',

  data () {
    return {
      contacts: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Contatos', active: true }
      ],
      table: [
        { key: 'name', label: 'Nome' },
        { key: 'email', label: 'Email' },
        { key: 'message', label: 'Mensagem' }
      ]
    }
  },
  async created () {
    this.contacts = await this.$axios.$get('/api/contacts')
  }
}
</script>
