<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <ProjectForm v-if="project" :project="project" />
    <div v-else class="text-center">
      <b-spinner small label="Carregando..." />
    </div>
  </div>
</template>
<script>
import ProjectForm from '@/components/admin/ProjectForm'
import mixinGlobal from '@/mixins/global'

export default {
  layout: 'admin',
  components: {
    ProjectForm
  },
  mixins: [mixinGlobal],
  data () {
    return {
      project: null,
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Projetos', to: '/admin/projects' },
        { text: 'Editar', active: true }
      ]
    }
  },
  async created () {
    this.project = await this.$axios.$get('/api/projects/' + this.$route.params.id).catch(this.showError)
  }
}
</script>
