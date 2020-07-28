<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <UserForm />
  </div>
</template>
<script>
import UserForm from '@/components/admin/UserForm'
export default {
  layout: 'admin',
  components: {
    UserForm
  },
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Usuários', to: '/admin/sites' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
