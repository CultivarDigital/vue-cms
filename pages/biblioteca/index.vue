<template>
  <div class="medias-page">
    <section class="content pb-5">
      <b-container>
        <div class="pt-5">
          <b-row>
            <b-col md="3">
              <div class="search">
                <b-form-input v-model="filters.search" type="search" class="search" placeholder="O que você procura?" @input="searchChanged" />
                <b-button v-if="filters.search" variant="primary" block :to="'/biblioteca?categoria=' + filters.category + '&tag=' + filters.tag + '&search=' + filters.search ">Buscar</b-button>
              </div>
              <div class="categories">
                <div class="title">
                  <h4>Tipos de documentos</h4>
                </div>
                <ul>
                  <li v-for="category in categories" :key="category"><n-link variant="primary" :to="'/biblioteca?categoria=' + category + '&tag=' + filters.tag + '&search=' + filters.search ">{{ category }}</n-link></li>
                  <li v-if="filters.category"><n-link variant="primary" :to="'/biblioteca?tag=' + filters.tag + '&search=' + filters.search ">Todos os tipos</n-link></li>
                </ul>
              </div>
              <div class="tags">
                <b-button v-for="tag in tags" :key="tag" variant="primary" :to="'/biblioteca?categoria=' + filters.category + '&tag=' + tag + '&search=' + filters.search" :class="{ active: (tag === filters.tag) }">{{ tag }}</b-button>
                <b-button v-if="filters.tag" variant="primary" :to="'/biblioteca?categoria=' + filters.category + '&search=' + filters.search">Todos os temas</b-button>
              </div>
              <b-button v-if="filters.search || filters.category || filters.tag" class="mt-4 mb-4" variant="primary" block to="/biblioteca">Limpar filtros</b-button>
            </b-col>
            <b-col md="9" class="medias">
              <div v-if="medias">
                <div class="pattern" />
                <div class="title">
                  <h3 v-if="filters.tag">{{ filters.tag }}</h3>
                  <h3 v-else>BIBLIOTECA</h3>
                  <p v-if="medias.length === 1"><strong>1</strong> ITEM ENCONTRADO <span v-if="filters.category">em <n-link :to="'/biblioteca?categoria=' + filters.category"><strong>{{ filters.category }}</strong></n-link></span></p>
                  <p v-else><strong>{{ medias.length }}</strong> ITENS ENCONTRADOS <span v-if="filters.category">em <n-link :to="'/biblioteca?categoria=' + filters.category"><strong>{{ filters.category }}</strong></n-link></span></p>
                  <h3 v-if="medias && medias.length === 0" class="text-center">Nenhum item encontrado</h3>
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
<style lang="sass">
  .medias-page
    .search
      margin-bottom: 30px
      input
        border-radius: 10px
        border: none
        font-weight: bold
        color: #00794e
        font-size: 14px
        background-image: url('~assets/img/lupa.png')
        background-repeat: no-repeat
        background-position: calc(100% - 10px)
        &::placeholder
          color: #00794e
      button
        border-radius: 10px
    .tags
      .btn
        background-color: transparent
        color: #00794e
        border-color: #00794e
        border-radius: 10px
        margin-right: 10px
        margin-bottom: 10px
        font-size: 13px
        font-weight: bold
        padding: 5px 10px
        &:hover
          background-color: #fff
          border-color: #fff
          color: #00794e
        &.active
          background-color: #00794e
          border-color: #00794e
          color: #51009c
    .categories
      margin-bottom: 30px
      .title
        background-color: #00794e
        background-image: url('~assets/img/squares.png')
        background-repeat: no-repeat
        background-position: 10px
        padding-left: 30px
        border-radius: 10px
      h4
        font-size: 14px
        color: #51009c
        padding: 7px 10px
        background-image: url('~assets/img/arrow-down.png')
        background-repeat: no-repeat
        background-position: calc(100% - 10px)
      ul
        background: #fff
        border-bottom-left-radius: 10px
        border-bottom-right-radius: 10px
        padding: 15px
        width: calc(100% - 20px)
        margin: auto
        margin-top: -8px
        li
          color: #a1a1a1
          background-image: url('~assets/img/categories.png')
          background-repeat: no-repeat
          padding: 0px 0px 5px 27px
          border-bottom: 1px solid #f6f6f6
          font-size: 13px
          list-style: none
          margin-bottom: 5px
          &.active
            font-weight: bold
          &:last-child
            border-bottom: 0
    .medias
      .pattern
        width: 15px
        height: 25px
        background-color: #fff
        position: absolute
        left: 15px
      .title
        margin-left: 30px
        margin-bottom: 20px
        h3
          color: #fff
          font-size: 24px
          font-weight: 700
          text-transform: uppercase
        p
          color: #00794e
          font-size: 12px
          text-transform: uppercase
</style>
