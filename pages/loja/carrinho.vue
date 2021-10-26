<template>
  <div>
    <Breadcrumb
      :links="[[title, '/loja']]"
      active="Resumo do pedido"
    />
    <b-container class="pt-4 pb-5">
      <Cart />
      <div v-if="cart && cart.length" class="text-right">
        <b-button to="/loja" variant="secondary">Continuar comprando</b-button>
        <b-button variant="primary" size="lg" to="/loja/finalizar-pedido">Finalizar pedido</b-button>
      </div>
    </b-container>
  </div>
</template>
<script>
import features from '@/data/features'
export default {
  computed: {
    cart() {
      return this.$store.state.cart
    },
    settings() {
      return this.$store.state.settings
    },
    title() {
      if (this.settings && this.settings.features && this.settings.features.shop && this.settings.features.shop.title) {
        return this.settings.features.shop.title
      }
      return features.shop.title
    }
  }

}
</script>
