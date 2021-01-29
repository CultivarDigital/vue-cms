<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <MenuForm v-if="menu" :menu="menu" />
    <div v-else class="text-center">
      <b-spinner small label="Carregando..." />
    </div>
  </div>
</template>
<script>
import MenuForm from '@/components/admin/MenuForm'
import mixinGlobal from '@/mixins/global'

export default {
  layout: 'admin',
  components: {
    MenuForm
  },
  mixins: [mixinGlobal],
  data () {
    return {
      menu: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Menus', to: '/admin/menus' },
        { text: 'Editar', active: true }
      ]
    }
  },
  async created () {
    this.menu = await this.$axios.$get('/api/menus/' + this.$route.params.id).catch(this.showError)
  }
}
</script>
