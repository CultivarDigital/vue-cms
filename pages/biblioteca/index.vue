<template>
  <div class="medias-page">
    <Breadcrumb
      v-if="media"
      :links="[[title, '/biblioteca']]"
      :active="media.title"
    />
    <Breadcrumb v-else :active="title" />
    <section id="content" class="content pt-4">
      <b-container>
        <div>
          <b-row>
            <b-col md="3" class="search">
              <div v-if="filterOptions">
                <div class="mb-3">
                  <b-input-group>
                    <b-form-input v-model="filters.search" type="search" placeholder="O que você busca?" @keyup.prevent.enter="filter" />
                    <b-input-group-append>
                      <b-button variant="outline-primary" @click="filter"><b-icon-search /></b-button>
                    </b-input-group-append>
                  </b-input-group>
                </div>
                <b-card v-if="filterOptions.categories && filterOptions.categories.length" title="Categorias" no-body class="mb-3 d-none d-md-block">
                  <b-list-group flush>
                    <b-list-group-item v-for="category in filterOptions.categories" :key="category" class="pointer" :class="category === filters.category ? 'bg-secondary' : 'bg-primary'" @click="filter({category})">{{ category }}</b-list-group-item>
                    <b-list-group-item v-if="filters.category" class="bg-primary pointer" @click="filter({category: ''})">Todas as categorias</b-list-group-item>
                  </b-list-group>
                </b-card>
                <b-form-select v-model="filters.category" :options="filterOptions.categories" class="mb-3 d-md-none" @input="filter">
                  <template v-slot:first>
                    <b-form-select-option value="">Todas as categorias</b-form-select-option>
                  </template>
                </b-form-select>
                <b-form-select v-model="filters.type" :options="filterOptions.types" class="mb-3" @input="filter">
                  <template v-slot:first>
                    <b-form-select-option value="">Todos os tipos</b-form-select-option>
                  </template>
                </b-form-select>
                <b-form-select v-model="filters.language" :options="filterOptions.languages" class="mb-3" @input="filter">
                  <template v-slot:first>
                    <b-form-select-option value="">Todos os idiomas</b-form-select-option>
                  </template>
                </b-form-select>
              </div>

              <!-- <div class="tags mb-3">
                <b-button v-for="tag in tags" :key="tag" size="sm" variant="secondary" :class="{ active: (tag === filters.tag) }" class="mb-1 mr-1" @click="filters.tag = tag; list()">{{ tag }}</b-button>
                <b-button v-if="filters.tag" variant="primary" @click="filters.tag = null; list()">Todos os temas</b-button>
              </div> -->
              <b-button v-if="filters.search || filters.category || filters.type" class="mb-3" variant="primary" block @click="clearFilters">Limpar filtros</b-button>
            </b-col>
            <b-col id="media-list" md="9" class="medias">
              <div v-if="medias">
                <div class="mb-3">
                  <Found :total="medias.pagination.total" />&nbsp;<span v-if="filters.category" class="text-primary"> em <strong>{{ filters.category }}</strong></span>
                </div>
                <Medias :medias="medias.data" />
                <b-pagination
                  v-if="medias.pagination.total > medias.pagination.per_page"
                  v-model="page"
                  :total-rows="medias.pagination.total"
                  :per-page="medias.pagination.per_page"
                  aria-controls="my-table"
                  @input="list"
                />
              </div>
              <Media v-if="media" :media="media" />
            </b-col>
          </b-row>
          <span v-if="!medias && !media">
            <b-spinner small /> Carregando...
          </span>
        </div>
      </b-container>
    </section>
  </div>
</template>
<script>
import categories from '@/data/categories'
import features from '@/data/features'
export default {
  data () {
    return {
      medias: null,
      media: null,
      page: 1,
      tags: [],
      categories,
      filters: {
        tag: this.$route.query.tag || '',
        category: this.$route.query.category || '',
        search: this.$route.query.search || '',
        type: this.$route.query.type || '',
        language: this.$route.query.language || ''
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
    title() {
      if (this.settings && this.settings.features && this.settings.features.medias && this.settings.features.medias.title) {
        return this.settings.features.medias.title
      }
      return features.medias.title
    }
  },

  async created () {
    if (this.$route.params.id) {
      this.get(this.$route.params.id)
    } else {
      this.list(this.$route.query)
    }

    if (!this.filterOptions) {
      const filterOptions = await this.$axios.$get('/api/medias/filters')
      this.$store.commit('setMediaFilters', filterOptions)
    }
  },
  methods: {
    async list (query) {
      this.media = null
      this.medias = await this.$axios.$get('/api/medias', { params: { page: this.page, ...this.filters } })
      // this.$scrollTo('#media-list', 1000, { offset: -25 })
    },
    filter (query = {}) {
      this.page = 1
      Object.keys(query).forEach(key => {
        this.filters[key] = query[key]
      })
      this.list()
    },
    async get (id) {
      this.medias = null
      this.media = await this.$axios.$get('/api/medias/' + id)
    },
    clearFilters () {
      this.filters.search = ''
      this.filters.tag = ''
      this.filters.category = ''
      this.filters.type = ''
      this.filters.language = ''
      this.list()
    }
  }
}
</script>
