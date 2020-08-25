<template>
  <div class="seeds_networks">
    <b-breadcrumb :items="breadcrumb" />
    <PageForm v-if="show_page_form" slug="seeds_networks" @cancel="show_page_form = !show_page_form" />
    <div v-else>
      <div class="text-right mb-3">
        <b-button variant="primary" to="/conta/redes-de-sementes/new">
          Cadastrar
        </b-button>
      </div>
      <div v-if="seeds_networks">
        <b-table v-if="seeds_networks.length" :fields="table" :items="seeds_networks" responsive="sm">
          <template v-slot:cell(actions)="data">
            <n-link class="btn btn-info btn-sm" :to="'/conta/redes-de-sementes/' + data.item.slug + '/edit'">
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
  layout: 'conta',
  components: {
    PageForm
  },
  mixins: [mixinGlobal],
  data () {
    return {
      show_page_form: false,
      seeds_networks: null,
      breadcrumb: [
        { text: 'Minha conta', to: '/conta' },
        { text: 'Redes de sementes', active: true }
      ],
      table: [
        { key: 'name', label: 'Nome' },
        { key: 'notes', label: 'Descrição' },
        { key: 'actions', label: '', class: 'text-right' }
      ]
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.seeds_networks = await this.$axios.$get('/api/seeds_networks', { params: { populate: 'tags categories', user: this.$auth.user._id } }).catch(this.showError)
    },
    remove (seedsNetwork) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este ítem?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/seeds_networks/' + seedsNetwork.slug).then(() => {
            this.list()
            this.$toast.success('Rede de sementes removida com sucesso!')
          }).catch(this.showError)
        }
      })
    }
  }
}
</script>
