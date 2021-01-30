<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <TagForm v-if="tag" :tag="tag" />
    <div v-else class="text-center">
      <b-spinner label="Carregando..." />
    </div>
  </div>
</template>
<script>
import TagForm from '@/components/admin/TagForm'
import mixinGlobal from '@/mixins/global'

export default {
  layout: 'admin',
  components: {
    TagForm
  },
  mixins: [mixinGlobal],
  data () {
    return {
      tag: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Tags', to: '/admin/tags' },
        { text: 'Editar', active: true }
      ]
    }
  },
  async created () {
    this.tag = await this.$axios.$get('/api/tags/' + this.$route.params.id).catch(this.showError)
  }
}
</script>
