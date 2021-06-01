<template>
  <span>
    <b-btn :to="'/conta'" class="btn-cart" variant="primary" size="lg" title="Minha conta">
      <b-icon-person /> {{ $auth.loggedIn ? 'Minha conta' : 'Entrar' }}
    </b-btn>
  </span>
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
