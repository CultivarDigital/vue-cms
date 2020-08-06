<template>
  <div class="profile">
    <b-breadcrumb :items="breadcrumb" />
    <ProfileForm />
  </div>
</template>
<script>
import ProfileForm from '@/components/admin/ProfileForm'
export default {
  layout: 'conta',
  components: {
    ProfileForm
  },
  data () {
    return {
      breadcrumb: [
        { text: 'Minha conta', to: '/conta' },
        { text: 'Perfil do usuário', active: true }
      ]
    }
  }
}
</script>
