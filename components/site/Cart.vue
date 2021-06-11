<template>
  <div class="mb-5">
    <div v-if="cart && cart.length">
      <table class="table b-table b-table-stacked-lg">
        <thead>
          <tr>
            <th class="text-center" />
            <th>Oferta</th>
            <th>Valor</th>
            <th>Quantidade</th>
            <th>Total</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cart" :key="index">
            <td>
              <b-img v-if="item.product.pictures && item.product.pictures.length" :src="item.product.pictures[0].thumb" width="100" alt="placeholder" />
              <b-img v-else blank blank-color="#E1846D" width="100" alt="placeholder" />
            </td>
            <td>
              <router-link :to="'/loja/'+item.product._id" class="text-dark">
                <strong>{{ item.product.name }}</strong>
              </router-link>
            </td>
            <td>
              {{ item.product.price | moeda }}
            </td>
            <td>
              {{ item.qtd }}
            </td>
            <td>
              <strong>{{ item.product.price * item.qtd | moeda }}</strong>
            </td>
            <td class="text-center">
              <b-button size="sm" variant="light" rel="tooltip" data-placement="left" title="Remover do carrinho" @click="removeFromCart(index)">
                <b-icon-trash />
              </b-button>
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr class="text-lg">
            <td colspan="3" />
            <td>
              <strong>Total</strong>
            </td>
            <td colspan="1">
              <h5 class="mb-0"><strong>{{ total | moeda }}</strong></h5>
            </td>
            <td colspan="1" />
          </tr>
        </tfoot>
      </table>
    </div>
    <div v-else class="text-center my-5">
      <h4>Seu carrinho está vazio</h4>
      <b-btn to="/loja" variant="light">
        Voltar para a loja
      </b-btn>
      <b-btn to="/loja/meus-pedidos" variant="primary">
        Ver meus pedidos
      </b-btn>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    cart() {
      return this.$store.state.cart
    },
    total() {
      return this.cart.reduce(function(a, item) {
        return a + (Number(item.qtd) * Number(item.product.price))
      }, 0)
    }
  },
  methods: {
    removeFromCart(index) {
      this.$store.commit('removeFromCart', index)
    },
    clearCart() {
      this.$store.commit('clearCart')
      this.notify('Carrinho limpo!')
      this.$router.replace('/loja')
    }
  }
}
</script>
