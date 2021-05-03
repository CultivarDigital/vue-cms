<template>
  <div class="default-page">
    <div v-if="info">
      <section class="content pb-5">
        <page-info :info="info" show-content />
        <share />
      </section>
    </div>
    <div v-else class="m-5 text-center">
      <div>
        Página não encontrada
      </div>
      <b-button class="mt-3" @click="$router.go(-1)">Voltar</b-button>
    </div>
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
      info: null
    }
  },
  async created() {
    this.info = await this.$axios.$get('/api/pages/' + this.id)
  }
}
</script>
