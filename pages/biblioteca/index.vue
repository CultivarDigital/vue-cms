<template>
  <div class="medias-page">
    <section class="content">
      <b-container>
        <div>
          <b-row>
            <b-col md="3">
              <div class="search mb-4">
                <b-form-input v-model="filters.search" type="search" class="search" placeholder="O que você procura?" @input="searchChanged" />
                <b-button v-if="filters.search" variant="primary" block :to="'/biblioteca?categoria=' + filters.category + '&tag=' + filters.tag + '&search=' + filters.search" class="mt-1">Buscar</b-button>
              </div>
              <b-card title="Categorias" no-body class="mb-4">
                <b-list-group flush>
                  <b-list-group-item v-for="category in categories" :key="category" :to="'/biblioteca?categoria=' + category + '&tag=' + filters.tag + '&search=' + filters.search">{{ category }}</b-list-group-item>
                  <b-list-group-item v-if="filters.category" :to="'/biblioteca?tag=' + filters.tag + '&search=' + filters.search ">Todas as categorias</b-list-group-item>
                </b-list-group>
              </b-card>
              <div class="tags mb-4">
                <b-button v-for="tag in tags" :key="tag" variant="primary" :to="'/biblioteca?categoria=' + filters.category + '&tag=' + tag + '&search=' + filters.search" :class="{ active: (tag === filters.tag) }">{{ tag }}</b-button>
                <b-button v-if="filters.tag" variant="primary" :to="'/biblioteca?categoria=' + filters.category + '&search=' + filters.search">Todos os temas</b-button>
              </div>
              <b-button v-if="filters.search || filters.category || filters.tag" class="mb-4" variant="primary" block to="/biblioteca">Limpar filtros</b-button>
            </b-col>
            <b-col md="9" class="medias">
              <div v-if="medias">
                <div class="title">
                  <h3 v-if="filters.tag">{{ filters.tag }}</h3>
                  <h3 v-else>Biblioteca</h3>
                  <p v-if="medias.length === 1"><strong>1</strong> Item encontrado <span v-if="filters.category">em <n-link :to="'/biblioteca?categoria=' + filters.category"><strong>{{ filters.category }}</strong></n-link></span></p>
                  <p v-else><strong>{{ medias.length }}</strong> Items encontrados <span v-if="filters.category">em <n-link :to="'/biblioteca?categoria=' + filters.category"><strong>{{ filters.category }}</strong></n-link></span></p>
                  <p v-if="medias && medias.length === 0" class="text-center">Nenhum item encontrado</p>
                </div>
                <medias :medias="medias" />
              </div>
              <media v-if="media" :media="media" />
            </b-col>
          </b-row>
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
import mixinPage from '@/mixins/page'
import categories from '@/data/categories'
export default {
  mixins: [mixinGlobal, mixinPage],
  data () {
    return {
      page_id: 'biblioteca',
      page_title: 'Biblioteca',
      medias: null,
      media: null,
      tags: [],
      categories,
      filters: {
        search: '',
        category: '',
        tag: ''
      }
    }
  },
  async created () {
    if (this.$route.params.id) {
      this.get(this.$route.params.id)
    } else {
      this.list(this.$route.query)
    }

    const mediasTags = await this.$axios.$get('/api/medias', {
      params: {
        select: 'tags'
      }
    })
    mediasTags.forEach(mediasTag => {
      const tags = mediasTag.tags
      tags.forEach(tag => {
        if (!this.tags.includes(tag)) {
          this.tags.push(tag)
        }
      })
      this.tags = this.tags.sort((a, b) => a.localeCompare(b))
    })
  },
  methods: {
    async list (query) {
      this.filters.category = query.categoria || ''
      this.filters.tag = query.tag || ''
      this.medias = await this.$axios.$get('/api/medias', {
        params: this.filters
      })
    },
    async get (id) {
      this.media = await this.$axios.$get('/api/medias/' + id)
    },
    searchChanged () {
      if (this.filters.search === '') {
        this.$router.push('/biblioteca?categoria=' + this.filters.category + '&tag=' + this.filters.tag)
      }
    }
  },
  watchQuery(newQuery) {
    this.list(newQuery)
  }
}
</script>
