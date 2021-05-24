<template>
  <div class="profile">
    <b-breadcrumb :items="breadcrumb" />
    <ProfileForm />
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Perfil do usuário', active: true }
      ]
    }
  }
}
</script>
