<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <ProjectForm />
  </div>
</template>
<script>
import ProjectForm from '@/components/admin/ProjectForm'
export default {
  layout: 'admin',
  components: {
    ProjectForm
  },
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Projetos', to: '/admin/projects' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
