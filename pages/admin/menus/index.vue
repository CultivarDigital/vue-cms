<template>
  <div class="menus">
    <b-breadcrumb :items="breadcrumb" />
    <MenuForm v-if="show_page_form" slug="menus" @cancel="show_page_form = !show_page_form" />
    <div v-else>
      <div class="text-right mb-3">
        <b-button @click="show_page_form = !show_page_form">
          Configurar página
        </b-button>
        <b-button variant="primary" to="/admin/menus/new">
          Cadastrar
        </b-button>
      </div>
      <div v-if="menus">
        <b-table v-if="menus.length" :fields="table" :items="menus" responsive="sm">
          <template v-slot:cell(actions)="data">
            <n-link class="btn btn-info btn-sm" :to="'/admin/menus/' + data.item.slug + '/edit'">
              <b-icon-pencil />
            </n-link>
            <b-button variant="danger" size="sm" @click="remove(data.item)">
              <b-icon-trash />
            </b-button>
          </template>
        </b-table>
        <b-alert v-else show variant="dark" class="text-center">Nenhum item encontrado</b-alert>
      </div>
      <div v-else class="text-center">
        <b-spinner small label="Carregando..." />
      </div>
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
        { text: 'Menu', active: true }
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
          await this.$axios.delete('/api/menus/' + menu.slug).then(() => {
            this.list()
            this.$toast.success('Menu removido com sucesso!')
          }).catch(this.showError)
        }
      })
    }
  }
}
</script>
