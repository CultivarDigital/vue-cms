<template>
  <div class="menus">
    <b-breadcrumb :items="breadcrumb" />
    <div class="text-right mb-3">
      <b-button variant="primary" to="/admin/menus/new">
        <b-icon-plus-circle /> Cadastrar
      </b-button>
    </div>
    <div v-if="menus">
      <b-table v-if="menus.length" :fields="table" :items="menus" responsive="sm">
        <template v-slot:cell(actions)="data">
          <n-link class="btn btn-info btn-sm" :to="'/admin/menus/' + data.item.id + '/edit'">
            <b-icon-pencil />
          </n-link>
          <b-button variant="danger" size="sm" @click="remove(data.item)">
            <b-icon-trash />
          </b-button>
        </template>
      </b-table>
      <b-alert v-else show variant="dark" class="text-center">Nenhum Menu encontrado</b-alert>
    </div>
    <div v-else class="text-center">
      <b-spinner small label="Carregando..." />
    </div>
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
export default {
  layout: 'admin',
  mixins: [mixinGlobal],
  data () {
    return {
      show_page_form: false,
      menus: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Menus', active: true }
      ],
      table: [
        { key: 'name', label: 'Nome' },
        { key: 'actions', label: '', class: 'text-right' }
      ]
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.menus = await this.$axios.$get('/api/menus').catch(this.showError)
    },
    remove (menu) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este ítem?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/menus/' + menu._id).then(() => {
            this.list()
            this.$toast.success('Menu removido com sucesso!')
          }).catch(this.showError)
        }
      })
    }
  }
}
</script>
