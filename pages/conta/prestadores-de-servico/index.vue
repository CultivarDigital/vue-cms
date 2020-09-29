<template>
  <div class="service_providers">
    <b-breadcrumb :items="breadcrumb" />
    <PageForm v-if="show_page_form" slug="service_providers" @cancel="show_page_form = !show_page_form" />
    <div v-else>
      <div class="text-right mb-3">
        <b-button variant="primary" to="/conta/prestadores-de-servico/new">
          Cadastrar
        </b-button>
      </div>
      <div v-if="service_providers">
        <b-table v-if="service_providers.length" :fields="table" :items="service_providers" responsive="sm">
          <template v-slot:cell(actions)="data">
            <n-link class="btn btn-info btn-sm" :to="'/conta/prestadores-de-servico/' + data.item.slug + '/edit'">
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
      service_providers: null,
      breadcrumb: [
        { text: 'Minha conta', to: '/conta' },
        { text: 'Prestadores de serviço', active: true }
      ],
      table: [
        { key: 'name', label: 'Nome' },
        { key: 'description', label: 'Descrição' },
        { key: 'actions', label: '', class: 'text-right' }
      ]
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.service_providers = await this.$axios.$get('/api/service_providers', { params: { populate: 'tags categories', user: this.$auth.user._id } }).catch(this.showError)
    },
    remove (serviceProvider) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este ítem?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/service_providers/' + serviceProvider.slug).then(() => {
            this.list()
            this.$toast.success('Prestador de serviço removido com sucesso!')
          }).catch(this.showError)
        }
      })
    }
  }
}
</script>
