<template>
  <div class="categories">
    <b-breadcrumb :items="breadcrumb" />
    <PageForm slug="categories"/>
    <div class="text-right mb-3">
      <b-button variant="primary" to="/admin/categories/new">
        Cadastrar
      </b-button>
    </div>
    <div v-if="categories">
      <b-table v-if="categories.length" :fields="table" :items="categories" responsive="sm">
        <template v-slot:cell(actions)="data">
          <n-link class="btn btn-info btn-sm" :to="'/admin/categories/' + data.item.slug + '/edit'">
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
</template>

<script>
import PageForm from '@/components/admin/PageForm'
import mixinGlobal from '@/mixins/global'
export default {
  layout: 'admin',
  mixins: [mixinGlobal],
  components: {
    PageForm
  },
  data () {
    return {
      categories: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Linhas de ação', active: true }
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
      this.categories = await this.$axios.$get('/api/categories').catch(this.showError)
    },
    remove (category) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este ítem?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/categories/' + category.slug).then(() => {
            this.list()
            this.$toast.success('Linha de ação removida com sucesso!')
          }).catch(this.showError)
        }
      })
    }
  }
}
</script>
