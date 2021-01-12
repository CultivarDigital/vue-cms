<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <UserForm v-if="user" :user="user" />
    <div v-else class="text-center">
      <b-spinner small label="Carregando..." />
    </div>
  </div>
</template>
<script>
import mixinGlobal from '@/mixins/global'
import UserForm from '@/components/admin/UserForm'
export default {
  layout: 'admin',
  components: {
    UserForm
  },
  mixins: [mixinGlobal],
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
    this.user = await this.$axios.$get('/api/users/' + this.$route.params.id).catch(this.showError)
  }
}
</script>
