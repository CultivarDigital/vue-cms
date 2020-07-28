<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <SiteForm />
  </div>
</template>
<script>
import SiteForm from '@/components/admin/SiteForm'
export default {
  layout: 'admin',
  components: {
    SiteForm
  },
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Sites', to: '/admin/sites' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
