<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <MenuForm />
  </div>
</template>
<script>
import MenuForm from '@/components/admin/MenuForm'
export default {
  layout: 'admin',
  components: {
    MenuForm
  },
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
