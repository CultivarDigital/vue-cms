<template>
  <div class="container-fluid">
    <div class="card">
      <div class="row">
        <div class="col-md-3">
          <div v-if="organization" class="organization">
            <img :src="defaultThumb(organization.images)" :alt="organization.name">
          </div>
          <div class="filters">
            <div class="search">
              <input v-model="filters.search" type="search" placeholder="O que você procura?" class="form-control">
            </div>
            <br>
            <b-dropdown :text="filters.category || 'Filtrar por Categoria'" variant="outline-default" size="sm">
              <b-dropdown-item @click="filters.category = null">Todas as categorias</b-dropdown-item>
              <b-dropdown-item v-for="(category, index) in categorias_de_produtos" :key="index" @click="filters.category = category">{{ category }}</b-dropdown-item>
            </b-dropdown>
            <br>
            <div class="checkbox-list">
              <h6>Filtrar por Tags</h6>
              <div>
                <div v-for="(tag, index) in tags" :key="index">
                  <label :class="{ active: filters.tags.includes(tag) }">
                    <input v-model="filters.tags" :value="tag" type="checkbox">
                    {{ tag }}
                  </label>
                </div>
              </div>
            </div>
            <br>
            <DemandModal />
          </div>
        </div>
        <div class="col-md-9">
          <div class="content-header">
            <span v-if="filtered_products" class="list-counter">
              <span v-if="filtered_products.length > 1">{{ filtered_products.length }} ofertas encontradas</span>
              <span v-else-if="filtered_products.length == 1">Uma oferta encontrada</span>
            </span>
            <div class="text-right pull-right">
              <b-dropdown :text="'Ordenar por ' + tiposDeOrdenacao[filters.sort]" variant="outline-default" size="sm">
                <b-dropdown-item v-for="(v, k) in tiposDeOrdenacao" :key="k" @click="filters.sort = k">{{ v }}</b-dropdown-item>
              </b-dropdown>
            </div>
            <div class="clearfix" />
          </div>
          <loading :loading="isLoading" msg="Carregando ofertas" />
          <div class="row products">
            <template v-for="(product, index) in filtered_products">
              <div v-if="showAll || index < 12" :key="index" class="col-lg-4 col-md-6">
                <div class="card">
                  <router-link :to="'/oferta/'+product._id" class="card-img">
                    <product-image :product="product.product" :product_variation="product.product_variation" css_class="card-img-top" />
                  </router-link>
                  <div class="card-body">
                    <router-link :to="'/oferta/'+product._id">
                      <h2 class="card-title">{{ product.product_variation.name }}</h2>
                    </router-link>
                  </div>
                  <div class="card-footer">
                    <AddToCart :product="product" />
                  </div>
                </div>
                <!-- end card -->
              </div>
            </template>
          </div>
          <div v-if="filtered_products && filtered_products.length >= 12 && !showAll" class="text-center" @click="showAll = true">
            <b-button variant="primary">
              + ver mais
            </b-button>
          </div>
          <br>
          <hr>
          <div v-if="filtered_products && filtered_products.length == 0" class="alert alert-warning">
            Nenhuma oferta encontrada.
          </div>
          <div>
            <br>
            <DemandModal />
            <br>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import slugify from 'slugify'
import tiposDeOrdenacao from '@/data/tipos-de-ordenacao.json'

export default {

  data() {
    return {
      tiposDeOrdenacao,
      qtds: [],
      showAll: false,
      filters: {
        tags: [],
        search: '',
        category: '',
        sort: 'most_recent'
      },
      products: null,
      filtered_products: null,
      tags: [],
      isLoading: false
    }
  },
  async created() {
    this.tags = await this.$axios.$get('shop/tags', params).catch(this.showError)
    this.list()
  },
  methods: {
    async list() {
      this.isLoading = true
      const params = {}
      this.products = await this.$axios.$get('shop/products', params).catch(this.showError)
    },
    applyFilters() {
      this.filtered_products = this.products
      if (this.filters.search) {
        this.filtered_products = this.filtered_products.filter(product => {
          const name = slugify(product.product_variation.name).toLowerCase()
          const search = slugify(this.filters.search).toLowerCase()
          return name.search(search) >= 0
        })
      }

      if (this.filters.tags && this.filters.tags.length) {
        this.filters.tags.forEach(tag => {
          this.filtered_products = this.filtered_products.filter(product => {
            return product.product_variation.tags.find(product_tag => {
              return product_tag.text == tag
            })
          })
        })
      }

      if (this.filters.category && this.filters.category) {
        this.filtered_products = this.filtered_products.filter(product => {
          if (product.product_variation.product.categories) {
            return product.product_variation.product.categories.find(category => {
              return category == this.filters.category
            })
          }
        })
      }

      switch (this.filters.sort) {
        case 'most_recent':
          this.filtered_products = this.filtered_products.sort((a, b) => {
            return new Date(b.createdAt) - new Date(a.createdAt)
          })
          break
        case 'best_sellers':
          this.filtered_products = this.filtered_products.sort((a, b) => {
            return b.qtd_ordered - a.qtd_ordered
          })
          break
        case 'alphabetical_order':
          this.filtered_products = this.filtered_products.sort((a, b) => {
            return a.product_variation.name.localeCompare(b.product_variation.name)
          })
          break
      }

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
