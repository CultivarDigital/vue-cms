<template>
  <div class="sites">
    <b-breadcrumb :items="breadcrumb" />
    <div class="text-right mb-3">
      <b-button variant="primary" to="/admin/sites/new">
        Cadastrar
      </b-button>
    </div>
    <div v-if="sites">
      <b-table v-if="sites.length" :fields="table" :items="sites" responsive="sm">
        <template v-slot:cell(actions)="data">
          <n-link class="btn btn-info btn-sm" :to="'/admin/sites/' + data.item._id + '/edit'">
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
</template>

<script>
import mixinGlobal from '@/mixins/global'
export default {
  layout: 'admin',
  mixins: [mixinGlobal],
  data () {
    return {
      sites: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Sites', active: true }
      ],
      table: [
        { key: 'name', label: 'Nome' },
        { key: 'domain_name', label: 'Domínio' },
        { key: 'description', label: 'Descrição' },
        { key: 'contact', label: 'Contatos' },
        { key: 'actions', label: '', class: 'text-right' }
      ]
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.sites = await this.$axios.$get('/api/sites').catch(this.showError)
    },
    remove (site) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este ítem?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/sites/' + site._id).then(() => {
            this.list()
            this.$toast.success('Site removido com sucesso!')
          }).catch(this.showError)
        }
      })
    }
  }
}
</script>
