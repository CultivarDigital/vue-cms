<template>
  <div>
    <b-breadcrumb v-if="order" :items="breadcrumb" />
    <div v-if="order">
      <h4 class="mb-3">Detalhes do pedido</h4>
      <table class="table b-table">
        <tbody>
          <tr v-if="$auth.user.role === 'admin'">
            <td>Pedido</td>
            <td>
              <b-badge size="lg" :class="order.status"><strong>#{{ order.code }}</strong> ({{ translateStatus(order.status) }})</b-badge>
            </td>
          </tr>
          <tr v-if="$auth.user.role === 'user'">
            <td>Pedido</td>
            <td>
              <b-badge size="lg" :class="order.status"><strong>#{{ order.code }}</strong> ({{ translateStatus(order.status) }})</b-badge>
              <v-select v-if="$auth.user.role === 'admin'" :class="order.status" :options="orderStatus" :reduce="item => item.code" @input="changeStatus" />
            </td>
          </tr>
          <tr v-if="order.name">
            <td>Comprador</td>
            <th><strong>{{ order.name }}</strong></th>
          </tr>
          <tr v-if="order.organization">
            <td>Organização</td>
            <th><strong>{{ order.organization }}</strong></th>
          </tr>
          <tr v-if="order.email">
            <td>Email</td>
            <th><strong>{{ order.email }}</strong></th>
          </tr>
          <tr v-if="order.phone">
            <td>Telefone</td>
            <th><strong>{{ order.phone }}</strong></th>
          </tr>
          <tr v-if="order.address">
            <td>Endereço de entrega</td>
            <th><strong>{{ order.address.description }}</strong></th>
          </tr>
          <tr v-if="$auth.user.role === 'admin'">
            <td>Status</td>
            <td>
              <v-select :value="order.status" :class="order.status" :options="orderStatus" :reduce="item => item.code" @input="changeStatus" />
            </td>
          </tr>
        </tbody>
      </table>
      <table class="table b-table b-table-stacked-lg">
        <thead>
          <tr>
            <th class="text-center" />
            <th>Oferta</th>
            <th>Valor</th>
            <th>Quantidade</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in order.items" :key="index">
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
          </tr>
        </tbody>
        <tfoot>
          <tr class="text-lg">
            <td colspan="3" />
            <td>
              <strong>Total</strong>
            </td>
            <td colspan="1">
              <h5 class="mb-0"><strong>{{ order.items.reduce((a, b) => a + b.total, 0) | moeda }}</strong></h5>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div v-else class="text-center">
      <b-spinner small label="Carregando..." />
    </div>
  </div>
</template>
<script>
import orderStatus from '@/data/order-status.json'
export default {
  layout: 'conta',
  data () {
    return {
      orderStatus,
      order: null,
      breadcrumb: [
        { text: this.$auth.user.role === 'user' ? 'Minha conta' : 'Painel', to: '/conta' },
        { text: 'Loja', to: this.$auth.user.role === 'user' ? '/loja' : '/conta/loja' },
        { text: this.$auth.user.role === 'user' ? 'Meus pedidos' : 'Pedidos', to: '/conta/pedidos' },
        { text: 'Pedido', active: true }
      ]
    }
  },
  async created () {
    this.order = await this.$axios.$get('/api/orders/' + this.$route.params.id)
    if (this.order) {
      this.breadcrumb.find(item => item.active).text = 'Pedido #' + this.order.code
    }
  },
  methods: {
    translateStatus(status) {
      if (status) {
        return orderStatus.find(s => s.code === status).label
      }
    },
    async changeStatus(status) {
      const order = await this.$axios.$put('/api/orders/' + this.order._id, { status })
      if (order) {
        this.order.status = order.status
        this.$toast.success('Status atualizado!')
      }
    }
  }
}
</script>
