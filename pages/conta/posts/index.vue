<template>
  <div class="posts">
    <b-breadcrumb :items="breadcrumb" />
    <div>
      <div class="text-right mb-3">
        <b-button variant="success" to="/conta/posts/new">
          <b-icon-plus /> Cadastrar
        </b-button>
      </div>
      <div v-if="posts">
        <b-table v-if="posts.length" :fields="table" :items="posts" responsive="sm">
          <template v-slot:cell(tags)="data">
            <tags :tags="data.value" />
          </template>
          <template v-slot:cell(title)="data">
            <n-link :to="'/noticias/' + data.item.slug">
              {{ data.value }}
            </n-link>
          </template>
          <template v-slot:cell(actions)="data">
            <n-link class="btn btn-info btn-sm" :to="'/conta/posts/' + data.item.slug + '/edit'">
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
import features from '@/data/features'
export default {
  layout: 'conta',
  data () {
    return {
      posts: null,
      table: [
        { key: 'title', label: 'Título' },
        { key: 'tags', label: 'Tags' },
        { key: 'actions', label: '', class: 'text-right' }
      ]
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings
    },
    breadcrumb() {
      let title = features.posts.title
      if (this.settings && this.settings.features && this.settings.features.posts && this.settings.features.posts.title) {
        title = this.settings.features.posts.title
      }
      return [
        { text: 'Painel', to: '/conta' },
        { text: title, active: true }
      ]
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.posts = await this.$axios.$get('/api/posts')
    },
    remove (post) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este item?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/posts/' + post.slug).then(() => {
            this.list()
            this.$toast.success('Notícia removida com sucesso!')
          })
        }
      })
    }
  }
}
</script>
