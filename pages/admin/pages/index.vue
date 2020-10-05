<template>
  <div class="pages">
    <b-breadcrumb :items="breadcrumb" />
    <PageForm v-if="show_page_form" slug="pages" @cancel="show_page_form = !show_page_form" />
    <div v-else>
      <div class="text-right mb-3">
        <b-button @click="show_page_form = !show_page_form">
          Configurar página
        </b-button>
        <b-button variant="primary" to="/admin/pages/new">
          Cadastrar
        </b-button>
      </div>
      <div v-if="pages">
        <b-table v-if="pages.length" :fields="table" :items="pages" responsive="sm">
          <template v-slot:cell(tags)="data">
            <tags :tags="data.value" />
          </template>
          <template v-slot:cell(actions)="data">
            <n-link class="btn btn-info btn-sm" :to="'/admin/pages/' + data.item.slug + '/edit'">
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
  layout: 'admin',
  components: {
    PageForm
  },
  mixins: [mixinGlobal],
  data () {
    return {
      show_page_form: false,
      pages: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Páginas', active: true }
      ],
      table: [
        { key: 'title', label: 'Título' },
        { key: 'tags', label: 'Tags' },
        { key: 'actions', label: '', class: 'text-right' }
      ]
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.pages = await this.$axios.$get('/api/pages').catch(this.showError)
    },
    remove (page) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este ítem?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/pages/' + page.slug).then(() => {
            this.list()
            this.$toast.success('Página removida com sucesso!')
          }).catch(this.showError)
        }
      })
    }
  }
}
</script>
