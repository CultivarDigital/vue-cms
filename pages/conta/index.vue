<template>
  <div class="dashboard">
    <b-breadcrumb :items="breadcrumb" />
    <b-list-group>
      <b-list-group-item to="/conta/unidades-de-referencia">Unidades de referência</b-list-group-item>
      <b-list-group-item to="/conta/prestadores-de-servico">Prestadores de serviço</b-list-group-item>
      <b-list-group-item to="/conta/produtores-organicos">Produtores orgânicos</b-list-group-item>
    </b-list-group>
  </div>
</template>

<script>
export default {
  layout: 'conta',
  data () {
    return {
      breadcrumb: [
        { text: 'Minha conta', active: true }
      ]
    }
  }
}
</script>
