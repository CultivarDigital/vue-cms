<template>
  <div class="profile">
    <b-breadcrumb :items="breadcrumb" />
    <ProfileForm />
  </div>
</template>

<script>
export default {
  layout: 'conta',
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/conta' },
        { text: 'Perfil do usuário', active: true }
      ]
    }
  }
}
</script>
