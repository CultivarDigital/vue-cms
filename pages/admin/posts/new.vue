<template>
  <div class="create">
    <b-breadcrumb :items="breadcrumb" />
    <PostForm />
  </div>
</template>
<script>
export default {
  layout: 'admin',
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
