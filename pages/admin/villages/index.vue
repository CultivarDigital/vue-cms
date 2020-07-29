<template>
  <div class="villages">
    <b-breadcrumb :items="breadcrumb" />
    <PageForm v-if="show_page_form" @cancel="show_page_form = !show_page_form" slug="villages" />
    <div v-else>
      <div class="text-right mb-3">
        <b-button @click="show_page_form = !show_page_form">
          Configurar página
        </b-button>
        <b-button variant="primary" to="/admin/villages/new">
          Cadastrar
        </b-button>
      </div>
      <div v-if="villages">
        <b-table v-if="villages.length" :fields="table" :items="villages" responsive="sm">
          <template v-slot:cell(actions)="data">
            <n-link class="btn btn-info btn-sm" :to="'/admin/villages/' + data.item.slug + '/edit'">
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
        <b-spinner label="Carregando..." />
      </div>
    </div>
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
import PageForm from '@/components/admin/PageForm'
export default {
  layout: 'admin',
  mixins: [mixinGlobal],
  components: {
    PageForm
  },
  data () {
    return {
      show_page_form: false,
      villages: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Aldeias', active: true }
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
      this.villages = await this.$axios.$get('/api/villages').catch(this.showError)
    },
    remove (village) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este ítem?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/villages/' + village.slug).then(() => {
            this.list()
            this.$toast.success('Aldeia removida com sucesso!')
          }).catch(this.showError)
        }
      })
    }
  }
}
</script>
