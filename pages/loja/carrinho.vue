<template>
  <b-container class="shop py-4">
    <div v-if="cart && cart.length">
      <div class="card-title navigation">
        <router-link to="/loja" class="text-secondary">
          Loja
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
              <th class="text-center">Valor</th>
              <th class="text-center">Qtd</th>
              <th class="text-left">Total</th>
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
                <router-link :to="'/loja/'+item.product._id">
                  {{ item.product.name }}
                </router-link>
              </td>
              <td class="text-center">
                {{ item.product.price | moeda }}
              </td>
              <td class="text-center">
                {{ item.qtd }}
              </td>
              <td>
                {{ item.product.price * item.qtd | moeda }}
              </td>
              <td class="td-actions">
                <button type="button" size="sm" rel="tooltip" data-placement="left" title="Remover do carrinho" class="btn" @click="removeFromCart(index)">
                  <i class="fa fa-close" />
                </button>
              </td>
            </tr>
            <tr>
              <td colspan="3" />
              <td>
                Total
              </td>
              <td colspan="1">
                <strong>{{ total | moeda }}</strong>
              </td>
              <td colspan="1" />
            </tr>
          </tbody>
        </table>
      </div>
      <br>
      <div v-if="client && isClient">
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
              <div v-if="isEditing()" class="text-right">
                <a class="pointer" @click="changePassword">Alterar senha</a>
              </div>
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
      <button :disabled="isLink && form.assignedClient == null" type="button" class="btn btn-success pull-right" @click="saveOrder">Finalizar pedido <i class="fa fa-arrow-right" /></button>
      <router-link :to="'/loja'">
        <button type="button" class="btn btn-primary pull-right"><i class="fa fa-arrow-left" /> Continuar comprando</button>&nbsp;&nbsp;
      </router-link>

      <!-- <a @click="clearCart" class="btn btn-warning pull-right">Limpar carrinho</a> -->
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
export default {
  data() {
    const form = {
      name: '',
      email: '',
      address: null,
      phone: ''
    }
    return {
      form
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
      this.form.assignedClient = user.id
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
