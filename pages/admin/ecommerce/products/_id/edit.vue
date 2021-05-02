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
import ProductForm from '@/components/admin/ProductForm'
import mixinGlobal from '@/mixins/global'

export default {
  layout: 'admin',
  components: {
    ProductForm
  },
  mixins: [mixinGlobal],
  data () {
    return {
      product: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Loja', to: '/admin/ecommerce' },
        { text: 'Produtos', to: '/admin/ecommerce/products' },
        { text: 'Editar', active: true }
      ]
    }
  },
  async created () {
    this.product = await this.$axios.$get('/api/products/' + this.$route.params.id).catch(this.showError)
  }
}
</script>
