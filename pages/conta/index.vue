<template>
  <div class="dashboard">
    <b-breadcrumb :items="breadcrumb" />
    <b-list-group>
      <b-list-group-item to="/conta/unidades-de-aprendizagem">Unidades de aprendizagem</b-list-group-item>
      <b-list-group-item to="/conta/prestadores-de-servico">Prestadores de serviço</b-list-group-item>
      <b-list-group-item to="/conta/redes-de-sementes">Redes de sementes</b-list-group-item>
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
