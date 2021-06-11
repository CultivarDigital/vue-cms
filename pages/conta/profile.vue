<template>
  <div class="profile">
    <b-breadcrumb :items="breadcrumb" />
    <UserForm v-if="profile" :user="profile" />
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
      ],
      profile: null
    }
  },
  async created() {
    this.profile = await this.$axios.$get('/api/profile')
  }
}
</script>
