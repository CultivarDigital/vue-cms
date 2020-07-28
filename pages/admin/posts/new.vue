<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <PostForm />
  </div>
</template>
<script>
import PostForm from '@/components/admin/PostForm'
export default {
  layout: 'admin',
  components: {
    PostForm
  },
  data () {
    return {
      breadcrumb: [
        { text: 'Painel', to: '/admin' },
        { text: 'Notícias', to: '/admin/posts' },
        { text: 'Cadastrar', active: true }
      ]
    }
  }
}
</script>
