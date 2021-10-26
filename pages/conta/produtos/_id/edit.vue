<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <ProductForm v-if="product" :product="product" />
    <div v-else class="text-center">
      <b-spinner small label="Carregando..." />
    </div>
  </div>
</template>
<script>
import features from '@/data/features'
export default {
  layout: 'conta',
  data () {
    return {
      product: null
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings
    },
    breadcrumb() {
      let title = features.shop.title
      if (this.settings && this.settings.features && this.settings.features.shop && this.settings.features.shop.title) {
        title = this.settings.features.shop.title
      }
      return [
        { text: 'Painel', to: '/conta' },
        { text: title, to: '/conta/shop' },
        { text: 'Produtos', to: '/conta/produtos' },
        { text: 'Editar', active: true }
      ]
    }
  },
  async created () {
    this.product = await this.$axios.$get('/api/products/' + this.$route.params.id)
  }
}
</script>
