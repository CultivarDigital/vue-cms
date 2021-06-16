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
            <th>Frete</th>
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
              <div v-if="loading_shipping">
                <b-spinner small /> Calculando frete...
              </div>
              <div v-else-if="shipping[item.product._id] && shipping[item.product._id].length">
                <b-form-radio v-for="option in shipping[item.product._id]" :key="option.code" class="mb-2" :name="item.product._id" :value="option.code">
                  <small>
                    <strong>{{ option.description }}</strong>
                    <span v-if="option.delivery_saturday">(Entrega sábado)</span>
                    <br>
                    Até <strong>{{ option.delivery_time }} dias</strong> por <strong>{{ option.price * item.qtd | moeda }}</strong>
                  </small>
                </b-form-radio>
              </div>
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
          <tr>
            <td colspan="4" class="text-right">
              Frete
            </td>
            <td>
              <b-form-input v-model="postal_code" v-mask="'#####-###'" style="max-width: 130px" @input="calcShipping()" />
            </td>
            <td><strong>{{ 0 | moeda }}</strong></td>
            <td />
          </tr>
          <tr>
            <td colspan="5" class="text-right">
              <strong>Total da compra</strong>
            </td>
            <td>
              <strong>{{ total | moeda }}</strong>
            </td>
            <td />
          </tr>
        </tfoot>
      </table>
    </div>
    <div v-else class="text-center my-5">
      <h4>Seu carrinho está vazio</h4>
      <b-btn to="/loja" variant="light">
        Voltar para a loja
      </b-btn>
      <b-btn to="/conta/pedidos" variant="primary">
        Ver meus pedidos
      </b-btn>
    </div>
    <pre>{{ postal_code }}</pre>
    <pre>{{ shipping }}</pre>
  </div>
</template>

<script>
import { optionText } from '@/utils'
export default {
  data () {
    return {
      optionText,
      postal_code: null,
      shipping: {},
      loading_shipping: false
    }
  },
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
  created() {
    if (this.$auth.user && this.$auth.user.address && this.$auth.user.address.postal_code) {
      this.postal_code = this.$auth.user.address.postal_code
      this.calcShipping()
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
    },
    async calcShipping() {
      if (this.postal_code && this.postal_code.length === 9) {
        const shipping = {}
        this.loading_shipping = true
        for (const item of this.cart) {
          shipping[item.product._id] = 'loading'
          shipping[item.product._id] = await this.$axios.$post('/api/shop/calc_shipping', {
            source: '74550000',
            destination: this.postal_code,
            product: item.product._id
          })
        }
        this.shipping = shipping
        this.loading_shipping = false
      }
    }
  }
}
</script>
