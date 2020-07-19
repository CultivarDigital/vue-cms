<template>
  <div class="dashboard">
    <b-breadcrumb :items="breadcrumb" />
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', active: true }
      ]
    }
  }
}
</script>
