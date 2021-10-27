<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <div v-if="menu" class="text-right">
      <b-btn variant="danger" @click="remove"><b-icon-trash /></b-btn>
    </div>
    <MenuForm v-if="menu" :menu="menu" />
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
      menu: null,
      breadcrumb: [
        { text: 'Painel', to: '/conta' },
        { text: 'Menus', to: '/conta/menus' },
        { text: 'Editar', active: true }
      ]
    }
  },
  async created () {
    this.menu = await this.$axios.$get('/api/menus/' + this.$route.params.id)
  },
  methods: {
    remove () {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este item?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/menus/' + this.menu._id).then(() => {
            this.$toast.success('Menu removido com sucesso!')
            this.$router.replace('/conta/menus')
          })
        }
      })
    }
  }
}
</script>
