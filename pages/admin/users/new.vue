<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <UserForm />
  </div>
</template>
<script>
export default {
  layout: 'admin',
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Usuários', to: '/admin/users' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
