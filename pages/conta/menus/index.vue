<template>
  <div class="menus">
    <b-breadcrumb :items="breadcrumb" />
    <div class="text-right mb-3">
      <b-button variant="success" to="/conta/menus/new">
        <b-icon-plus /> Cadastrar
      </b-button>
    </div>
    <div v-if="menus">
      <div v-if="menus.length">
        <draggable-menu :menus="menus" @change="reorder" />
      </div>
      <b-alert v-else show variant="dark" class="text-center">Nenhum Menu encontrado</b-alert>
    </div>
    <div v-else class="text-center">
      <b-spinner small label="Carregando..." />
    </div>
  </div>
</template>

<script>
export default {
  layout: 'conta',
  data () {
    return {
      menus: null,
      breadcrumb: [
        { text: 'Painel', to: '/conta' },
        { text: 'Menus', active: true }
      ],
      table: [
        { key: 'name', label: 'Nome' },
        { key: 'page', label: 'Página' },
        { key: 'actions', label: '', class: 'text-right' }
      ]
    }
  },
  created () {
    this.list()
  },
  methods: {
    async reorder (event) {
      const menusToReorder = []
      let order = 0
      this.menus.forEach(menu => {
        menusToReorder.push({ id: menu._id, order })
        order += 1
        menu.submenus.forEach(submenu => {
          menusToReorder.push({ id: submenu._id, order, menu: menu._id })
          order += 1
        })
      })
      // passa a lista de id + order de cada card pra ser reordenado na api
      await this.$axios
        .$put('/api/menus/reorder', {
          menus: menusToReorder
        })
        .catch(this.showError)
    },
    async list () {
      this.menus = await this.$axios.$get('/api/menus', { params: { populate: 'page' } })
    }
  }
}
</script>
