<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <ProductForm />
  </div>
</template>
<script>
export default {
  layout: 'admin',
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'E-commerce', to: '/admin/ecommerce' },
        { text: 'Produtos', to: '/admin/ecommerce/products' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
