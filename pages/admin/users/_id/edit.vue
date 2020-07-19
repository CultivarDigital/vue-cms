<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <UserForm v-if="user" :user="user" />
    <div v-else class="text-center">
      <b-spinner label="Carregando..." />
    </div>
  </div>
</template>
<script>
import UserForm from '@/components/UserForm'
export default {
  layout: 'admin',
  components: {
    UserForm
  },
  data () {
    return {
      user: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Usuários', to: '/admin/users' },
        { text: 'Editar', active: true }
      ]
    }
  },
  async created () {
    this.user = await this.$axios.$get('/api/users/' + this.$route.params.id)
  }
}
</script>
