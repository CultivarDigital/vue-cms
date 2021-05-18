<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <SettingsForm />
  </div>
</template>
<script>
export default {
  layout: 'admin',
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Configurações', active: true }
      ]
    }
  }
}
</script>
