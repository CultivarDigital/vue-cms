<template>
  <div class="events">
    <b-breadcrumb :items="breadcrumb" />
    <div>
      <div class="text-right mb-3">
        <b-button variant="primary" block to="/admin/ecommerce/products">
          Produtos
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'admin',

  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Loja', active: true }
      ]
    }
  }
}
</script>
