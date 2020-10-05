<template>
  <div class="projects">
    <b-breadcrumb :items="breadcrumb" />
    <PageForm v-if="show_page_form" slug="projects" @cancel="show_page_form = !show_page_form" />
    <div v-else>
      <div class="text-right mb-3">
        <b-button @click="show_page_form = !show_page_form">
          Configurar página
        </b-button>
        <b-button variant="primary" to="/admin/projects/new">
          Cadastrar
        </b-button>
      </div>
      <div v-if="projects">
        <b-table v-if="projects.length" :fields="table" :items="projects" responsive="sm">
          <template v-slot:cell(categories)="data">
            {{ data.value.map(category => category.name).join(', ') }}
          </template>
          <template v-slot:cell(tags)="data">
            <tags :tags="data.value" />
          </template>
          <template v-slot:cell(actions)="data">
            <n-link class="btn btn-info btn-sm" :to="'/admin/projects/' + data.item.slug + '/edit'">
              <b-icon-pencil />
            </n-link>
            <b-button variant="danger" size="sm" @click="remove(data.item)">
              <b-icon-trash />
            </b-button>
            <b-button size="sm" @click="moveUp(data)">
              <b-icon-arrow-up />
            </b-button>
            <b-button size="sm" @click="moveDown(data)">
              <b-icon-arrow-down />
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
      projects: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Projetos', active: true }
      ],
      table: [
        { key: 'name', label: 'Nome' },
        { key: 'categories', label: 'Categorias' },
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
      this.projects = await this.$axios.$get('/api/projects', { params: { populate: 'categories' } }).catch(this.showError)
    },
    moveUp (data) {
      this.projects[data.index].order -= 1.1
      this.saveReorder()
    },
    moveDown (data) {
      this.projects[data.index].order += 1.1
      this.saveReorder()
    },
    async saveReorder () {
      this.projects.sort((a, b) => a.order - b.order).forEach((project, index) => {
        this.projects[index].order = index
      })
      const ids = this.projects.map(project => {
        return { slug: project.slug, order: project.order }
      })
      await this.$axios.post('/api/projects/reorder', ids).then(() => {
        this.list()
      }).catch(this.showError)
    },
    remove (project) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este ítem?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/projects/' + project.slug).then(() => {
            this.list()
            this.$toast.success('Projeto removido com sucesso!')
          }).catch(this.showError)
        }
      })
    }
  }
}
</script>
