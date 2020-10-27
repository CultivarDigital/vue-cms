<template>
  <div class="posts">
    <b-breadcrumb :items="breadcrumb" />
    <PageForm v-if="show_page_form" slug="noticias" @cancel="show_page_form = !show_page_form" />
    <div v-else>
      <div class="text-right mb-3">
        <b-button @click="show_page_form = !show_page_form">
          Configurar página
        </b-button>
        <b-button variant="primary" to="/admin/posts/new">
          Cadastrar
        </b-button>
      </div>
      <div v-if="posts">
        <b-table v-if="posts.length" :fields="table" :items="posts" responsive="sm">
          <template v-slot:cell(tags)="data">
            <tags :tags="data.value" />
          </template>
          <template v-slot:cell(actions)="data">
            <n-link class="btn btn-info btn-sm" :to="'/admin/posts/' + data.item.slug + '/edit'">
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
      posts: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Notícias', active: true }
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
      this.posts = await this.$axios.$get('/api/posts', { params: { populate: 'tags' } }).catch(this.showError)
    },
    remove (post) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este ítem?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/posts/' + post.slug).then(() => {
            this.list()
            this.$toast.success('Notícia removida com sucesso!')
          }).catch(this.showError)
        }
      })
    }
  }
}
</script>
