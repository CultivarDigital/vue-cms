<template>
  <div class="events">
    <b-breadcrumb :items="breadcrumb" />
    <div>
      <div class="text-right mb-3">
        <b-button variant="secondary" block to="/conta/ecommerce/products">
          Produtos
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'conta',

  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/conta' },
        { text: 'Loja', active: true }
      ]
    }
  }
}
</script>
