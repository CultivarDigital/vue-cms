<template>
  <div>
    <Breadcrumb
      active="Loja"
    />
    <b-container class="shop py-4">
      <b-row>
        <b-col lg="3">
          <div class="filters">
            <div class="search">
              <input v-model="filters.search" type="search" placeholder="O que você procura?" class="form-control mb-3" @keyup.prevent.enter="list">
            </div>
            <b-btn v-if="filters.search" variant="secondary" class="mb-3" @click="list">
              <b-icon-search />
              Buscar
            </b-btn>
            <b-btn v-if="filters.search" variant="default" class="mb-3" @click="filters.search = ''; list()">
              Limpar busca
            </b-btn>
            <b-dropdown :text="'Ordenar por ' + sorts[filters.sort]" variant="outline-default" size="sm" class="mb-3">
              <b-dropdown-item v-for="(v, k) in sorts" :key="k" @click="filters.sort = k; list()">{{ v }}</b-dropdown-item>
            </b-dropdown>
            <b-dropdown :text="filters.tag || 'Filtrar por categoria'" variant="outline-default" size="sm" class="mb-3">
              <b-dropdown-item @click="filters.tag = null; list()">Todas as categorias</b-dropdown-item>
              <b-dropdown-item v-for="(tag, index) in tags" :key="index" @click="filters.tag = tag; list()">{{ tag }}</b-dropdown-item>
            </b-dropdown>
          </div>
        </b-col>
        <b-col lg="9">
          <div class="content-header">
            <div class="text-lg-right">
              <CartButton />
            </div>
            <div class="clearfix" />
          </div>
          <b-spinner v-if="isLoading" small label="Carregando ofertas" />
          <div v-if="products" class="products mt-3">
            <p class="list-counter">
              <span v-if="products.length > 1"><strong>{{ products.length }}</strong> ofertas encontradas</span>
              <span v-else-if="products.length == 1"><strong>Uma</strong> oferta encontrada</span>
              <span v-if="filters.tag"> em <strong>{{ filters.tag }}</strong></span>
            </p>
            <b-card-group columns>
              <Product v-for="product in products" :key="product._id" :product="product" />
            </b-card-group>
          </div>
          <div v-if="products && products.length == 0" class="alert alert-warning">
            Nenhuma oferta encontrada.
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import sorts from '@/data/sorts.json'
export default {
  data() {
    return {
      sorts,
      qtds: [],
      filters: {
        tag: this.$route.query.tag,
        search: '',
        sort: 'most_recent'
      },
      products: null,
      tags: [],
      isLoading: false
    }
  },
  async created() {
    this.tags = await this.$axios.$get('/api/shop/tags')
    this.list()
  },
  methods: {
    async list() {
      this.isLoading = true
      this.products = await this.$axios.$get('/api/shop/products', { params: this.filters })
      this.isLoading = false
    },
    clearFilters() {
      this.filters = {
        search: '',
        tags: []
      }
      location.href = '/'
    }
  }
}
</script>
