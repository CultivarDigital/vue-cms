<template>
  <div class="service_providers">
    <b-breadcrumb :items="breadcrumb" />
    <PageForm v-if="show_page_form" slug="service_providers" @cancel="show_page_form = !show_page_form" />
    <div v-else>
      <div class="text-right mb-3">
        <b-button @click="show_page_form = !show_page_form">
          Configurar página
        </b-button>
        <b-button variant="primary" to="/admin/service_providers/new">
          Cadastrar
        </b-button>
      </div>
      <div v-if="service_providers">
        <b-table v-if="service_providers.length" :fields="table" :items="service_providers" responsive="sm">
          <template v-slot:cell(actions)="data">
            <n-link class="btn btn-info btn-sm" :to="'/admin/service_providers/' + data.item.slug + '/edit'">
              <b-icon-pencil />
            </n-link>
            <b-button variant="danger" size="sm" @click="remove(data.item)">
              <b-icon-trash />
            </b-button>
            <b-button v-if="data.item.status !== 'approved'" variant="primary" size="sm" @click="approve(data.item)">
              Aprovar
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
  components: {
    PageForm
  },
  mixins: [mixinGlobal],
  data () {
    return {
      show_page_form: false,
      service_providers: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
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
      this.service_providers = await this.$axios.$get('/api/service_providers').catch(this.showError)
    },
    remove (serviceProvider) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este ítem?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/service_providers/' + serviceProvider.slug).then(() => {
            this.list()
            this.$toast.success('Provedor de serviço removido com sucesso!')
          }).catch(this.showError)
        }
      })
    },
    async approve (serviceProvider) {
      await this.$axios.put('/api/service_providers/' + serviceProvider.slug, { status: 'approved' }).then(() => {
        this.list()
        this.$toast.success('Provedor de serviço aprovado com sucesso!')
      }).catch(this.showError)
    }
  }
}
</script>
