<template>
  <div v-if="site" class="home-page">
    asdf
  </div>
</template>

<script>
import mixinPage from '@/mixins/page'
export default {
  mixins: [mixinPage],
  data () {
    return {
      page_id: 'home'
    }
  },
  head () {
    return {
      title: this.site.name,
      meta: [
        { hid: 'description', name: 'description', content: this.site.description }
      ]
    }
  }
}
</script>
<style lang="sass" scoped>
</style>
