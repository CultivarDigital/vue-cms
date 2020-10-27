<template>
  <div class="about">
    <b-breadcrumb :items="breadcrumb" />
    <PageForm slug="sobre" />
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Quem somos', active: true }
      ]
    }
  }
}
</script>
