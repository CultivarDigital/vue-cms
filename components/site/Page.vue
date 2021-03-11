<template>
  <div v-if="page" class="default-page">
    <section class="content pb-5">
      <page-info :page="page" show-content />
      <share />
    </section>
  </div>
</template>

<script>
import mixinPage from '@/mixins/page'
export default {
  mixins: [mixinPage],
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      page: null
    }
  },
  async created() {
    this.page = await this.$axios.$get('/api/pages/' + this.id)
  }
}
</script>
