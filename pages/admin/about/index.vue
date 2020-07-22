<template>
  <div class="villages">
    <b-breadcrumb :items="breadcrumb" />
    <PageForm slug="about" />
  </div>
</template>

<script>
import PageForm from '@/components/PageForm'
export default {
  layout: 'admin',
  components: {
    PageForm
  },
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
