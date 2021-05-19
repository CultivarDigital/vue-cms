<template>
  <b-container class="shop py-4">
    <div v-if="cart && cart.length">
      <div>
        <router-link to="/loja" class="text-secondary">
          <strong>Loja</strong>
        </router-link>
        <i class="fa fa-angle-right" />
        <b-icon-chevron-right />
        Resumo do pedido
      </div>
      <br>
      <div>
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
                <router-link :to="'/loja/'+item.product._id" class="text-black">
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
                <h4 class="mb-0">{{ total | moeda }}</h4>
              </td>
              <td colspan="1" />
            </tr>
          </tfoot>
        </table>
      </div>
      <br>
      <div>
        <h4 class="text-center">Finalize pedido</h4>
        <br>
        <h6 class="text-center">Confirme os dados abaixo para finalizar o pedido</h6>
        <br>
        <div class="row">
          <div class="col-sm-6">
            <b-form-group label="Nome *">
              <b-form-input v-model="form.name" v-validate="'required'" name="name" />
              <field-error :msg="veeErrors" field="name" />
            </b-form-group>
          </div>
          <div class="col-sm-6">
            <b-form-group label="CPF/CNPJ *">
              <b-form-input v-model="form.cpf" v-validate="'required'" v-mask="['###.###.###-##', '##.###.###/####-##']" name="cpf" />
              <field-error :msg="veeErrors" field="cpf" />
            </b-form-group>
          </div>
          <div class="col-sm-6">
            <b-form-group label="Telefone *">
              <b-form-input v-model="form.phone" v-validate="'required'" v-mask="['(##) ####-####', '(##) #####-####']" name="phone" placeholder="(99) 99999-9999" />
              <field-error :msg="veeErrors" field="phone" />
            </b-form-group>
          </div>
          <div class="col-sm-6">
            <b-form-group label="Email *">
              <b-form-input v-model="form.email" v-validate="'email|required'" name="email" />
              <field-error :msg="veeErrors" field="email" />
            </b-form-group>
          </div>
          <div class="col-sm-12">
            <b-form-group label="Endereço *">
              <span v-if="form.address" class="text-black">{{ form.address.description }}</span>
              <location :cb="setAddress" :current_address="form.address" :autoload="false" />
            </b-form-group>
          </div>
        </div>
      </div>
      <br>
      <div class="text-right">
        <b-button :to="'/loja'" variant="primary">Continuar comprando</b-button>
        <b-button variant="secondary" size="lg" @click="saveOrder">Finalizar pedido</b-button>
      </div>
    </div>
    <div v-else class="text-center">
      <h4>Seu carrinho está vazio</h4>
      <router-link :to="'/loja'" class="btn btn-default">
        Voltar para a loja
      </router-link>
      <router-link :to="'/pedidos'" class="btn btn-default" if="isClient">
        Ver meus pedidos
      </router-link>
    </div>
  </b-container>
</template>
<script>
import mixinPage from '@/mixins/page'
export default {
  mixins: [mixinPage],
  data() {
    const form = {
      name: '',
      email: '',
      address: null,
      phone: ''
    }
    return {
      form,
      page_title: 'Carrinho de compras'
    }
  },
  computed: {
    cart() {
      return this.$store.state.cart
    },
    total() {
      return this.$store.state.cart.reduce(function(a, item) {
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
    },
    saveAssignedClient(user) {
      this.form.assignedClient = user._id
      this.setClient(user, this.form)
    },
    setClient(client, form) {
      form.name = client.name
      form.cpf = client.cpf
      form.email = client.email
      form.address = client.address
      form.phone = client.phone
      form.main_activity = client.main_activity
      form.state_registration = client.state_registration
      form.supplier = client.supplier
      form.organization = client.organization
    },
    saveOrder() {
      this.$validator.validate().then(isValid => {
        if (isValid) {
          this.isSending = true
          this.form.cart = this.cart
          this.$axios.$post('shop/order', this.form).then(order => {
            if (order && order._id) {
              this.notify('Seu pedido de compra foi realizado com o sucesso! Em breve entraremos em contato.')
              this.$store.commit('clearCart')
              this.$router.replace('/pedido/' + order._id)
            }
            this.isSending = false
          }).catch(() => {
            this.$router.replace('/entrar')
          })
        }
      })
    },
    setAddress(address) {
      this.form.address = address
    }

  }
}
</script>
