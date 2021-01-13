<template>
  <div class="categories">
    <b-breadcrumb :items="breadcrumb" />
    <PageForm v-if="show_page_form" slug="categories" @cancel="show_page_form = !show_page_form" />
    <div v-else>
      <div class="text-right mb-3">
        <b-button @click="show_page_form = !show_page_form">
          Configurar página
        </b-button>
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
      categories: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Categorias', active: true }
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
            this.$toast.success('Categoria removida com sucesso!')
          }).catch(this.showError)
        }
      })
    }
  }
}
</script>
