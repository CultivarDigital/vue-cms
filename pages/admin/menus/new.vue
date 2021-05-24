<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <MenuForm />
  </div>
</template>
<script>
export default {
  layout: 'admin',
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Menus', to: '/admin/menus' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
