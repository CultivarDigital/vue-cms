<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <ProductForm />
  </div>
</template>
<script>
export default {
  layout: 'conta',
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/conta' },
        { text: 'Loja', to: '/conta/ecommerce' },
        { text: 'Produtos', to: '/conta/ecommerce/products' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
