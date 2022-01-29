<template>
  <div class="medias">
    <b-breadcrumb :items="breadcrumb" />
    <div>
      <div class="text-right mb-3">
        <b-button variant="success" to="/conta/medias/new">
          <b-icon-plus /> Cadastrar
        </b-button>
      </div>
      <div v-if="filterOptions">
        <b-row>
          <b-col cols="12" md="6">
            <b-form-select v-model="filters.type" :options="filterOptions.types" class="mb-3" @input="list">
              <template v-slot:first>
                <b-form-select-option value="">Todos os tipos</b-form-select-option>
              </template>
            </b-form-select>
          </b-col>
          <b-col cols="12" md="6">
            <b-form-select v-model="filters.category" :options="filterOptions.categories" class="mb-3" @input="list">
              <template v-slot:first>
                <b-form-select-option value="">Todas as categorias</b-form-select-option>
              </template>
            </b-form-select>
          </b-col>
        </b-row>
        <div class="search">
          <b-input-group class="mb-3">
            <b-form-input v-model="filters.search" type="search" placeholder="Procurar..." @keyup.prevent.enter="list" />
            <b-input-group-append>
              <b-button variant="outline-primary" @click="list"><b-icon-search /></b-button>
            </b-input-group-append>
          </b-input-group>
        </div>
      </div>
      <div v-if="medias">
        <div class="text-right mb-3">
          <small><Found :total="medias.pagination.total" />&nbsp;<span v-if="filters.category" class="text-primary"> em <strong>{{ filters.category }}</strong></span></small>
        </div>
        <b-table v-if="medias.data && medias.data.length" :fields="table" :items="medias.data" responsive="sm">
          <template v-slot:cell(image)="data">
            <b-img v-if="data.value" :src="data.value.thumb" width="100" rounded />
            <b-img v-else-if="data.item.oembed_thumb" :src="data.item.oembed_thumb" width="100" rounded />
          </template>
          <template v-slot:cell(type)="data">
            {{ data.value }}
          </template>
          <template v-slot:cell(categories)="data">
            <span v-if="data.value">{{ data.value.join(', ') }}</span>
          </template>
          <template v-slot:cell(actions)="data">
            <n-link class="btn btn-info btn-sm" :to="'/conta/medias/' + data.item._id + '/edit'">
              <b-icon-pencil />
            </n-link>
            <b-button variant="danger" size="sm" @click="remove(data.item)">
              <b-icon-trash />
            </b-button>
          </template>
        </b-table>
        <b-alert v-else show variant="dark" class="text-center">Nenhum item encontrado</b-alert>
        <div class="d-flex justify-center">
          <b-pagination
            v-model="page"
            :total-rows="medias.pagination.total"
            :per-page="medias.pagination.per_page"
            aria-controls="my-table"
            @input="list"
          />
        </div>
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
      medias: null,
      page: 1,
      table: [
        { key: 'image', label: '' },
        { key: 'title', label: 'Título' },
        { key: 'type', label: 'Tipo' },
        { key: 'categories', label: 'Categorias' },
        { key: 'actions', label: '', class: 'text-right' }
      ],
      filters: {
        tag: this.$route.query.tag || '',
        category: this.$route.query.category || '',
        search: this.$route.query.search || '',
        type: this.$route.query.type || ''
      }
    }
  },
  computed: {
    filterOptions() {
      return this.$store.state.media_filters
    },
    settings() {
      return this.$store.state.settings
    },
    breadcrumb() {
      let title = features.medias.title
      if (this.settings && this.settings.features && this.settings.features.medias && this.settings.features.medias.title) {
        title = this.settings.features.medias.title
      }
      return [
        { text: 'Painel', to: '/conta' },
        { text: title, active: true }
      ]
    }
  },
  async created () {
    this.list()

    if (!this.filterOptions) {
      const filterOptions = await this.$axios.$get('/api/medias/filters')
      this.$store.commit('setMediaFilters', filterOptions)
    }
  },
  methods: {
    async list () {
      this.medias = await this.$axios.$get('/api/medias', { params: { page: this.page, ...this.filters } })
    },
    clearFilters () {
      this.filters.search = null
      this.filters.tag = null
      this.filters.category = null
      this.list()
    },
    remove (media) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este item?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/medias/' + media._id).then(() => {
            this.list()
            this.$toast.success('Item removido com sucesso!')
          })
        }
      })
    }
  }
}
</script>
