<template>
  <div>
    <Breadcrumb
      :links="[['Loja', '/loja']]"
      active="Resumo do pedido"
    />
    <b-container class="py-4">
      <Cart />
      <div v-if="cart && cart.length" class="text-right">
        <b-button to="/loja" variant="primary">Continuar comprando</b-button>
        <b-button variant="secondary" size="lg" to="/loja/finalizar-pedido">Finalizar pedido</b-button>
      </div>
    </b-container>
  </div>
</template>
<script>
export default {
  computed: {
    cart() {
      return this.$store.state.cart
    }
  }
}
</script>
