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
              Frete
            </td>
            <td colspan="1">
              {{ shipping | moeda }}
            </td>
            <td colspan="1" />
          </tr>
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
      <b-btn to="/conta/pedidos" variant="primary">
        Ver meus pedidos
      </b-btn>
    </div>
  </div>
</template>

<script>
import { calcularPrecoPrazo } from 'correios-brasil'
export default {
  data () {
    return {
      postal_code: null,
      shipping: 0
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
    console.log(this.$auth.user.address)
    if (this.$auth.user && this.$auth.user.address && this.$auth.user.address.postal_code) {
      this.calcShipping(this.$auth.user.address.postal_code)
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
    calcShipping() {
      const args = {
        // Não se preocupe com a formatação dos valores de entrada do cep, qualquer uma será válida (ex: 21770-200, 21770 200, 21asa!770@###200 e etc),
        sCepOrigem: '73770000',
        sCepDestino: this.$auth.user.address.postal_code,
        nVlPeso: '1',
        nCdFormato: '1',
        nVlComprimento: '20',
        nVlAltura: '20',
        nVlLargura: '20',
        nCdServico: ['04014', '04510'], // Array com os códigos de serviço
        nVlDiametro: '0'
      }

      calcularPrecoPrazo(args).then((response) => {
        console.log(response)
        this.shipping = response.Valor
      })
    }
  }
}
</script>
