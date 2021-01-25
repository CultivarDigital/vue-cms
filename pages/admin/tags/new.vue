<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <TagForm />
  </div>
</template>
<script>
import TagForm from '@/components/admin/TagForm'
export default {
  layout: 'admin',
  components: {
    TagForm
  },
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Tags', to: '/admin/tags' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
