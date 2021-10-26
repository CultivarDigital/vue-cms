<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <ProductForm />
  </div>
</template>
<script>
import features from '@/data/features'
export default {
  layout: 'conta',
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
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
