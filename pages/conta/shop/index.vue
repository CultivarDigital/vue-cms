<template>
  <div class="events">
    <b-breadcrumb :items="breadcrumb" />
    <div>
      <div class="text-right mb-3">
        <b-button variant="secondary" block to="/conta/produtos">
          Produtos
        </b-button>
        <b-button variant="secondary" block to="/conta/pedidos">
          Pedidos
        </b-button>
      </div>
    </div>
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
        { text: title, active: true }
      ]
    }
  }
}
</script>
