<template>
  <div>
    <b-btn :to="'/loja/carrinho'" class="btn-cart" variant="secondary" size="lg">
      <img src="~assets/img/icon-cart.svg" alt="Carrinho"> {{ cart.length > 0 ? cart.length + " itens no carrinho" : "Carrinho vazio" }}
    </b-btn>
  </div>
</template>

<script>
export default {
  computed: {
    cart () {
      return this.$store.state.cart
    }
  }
}
</script>
