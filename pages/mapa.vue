<template>
  <div class="mapa-page">
    <section class="content pb-5">
      <page-info :page="page" />
      <b-container fluid>
        <Map variant="vertical" />
      </b-container>
    </section>
  </div>
</template>
<script>
import mixinPage from '@/mixins/page'
export default {
  mixins: [mixinPage],
  data () {
    return {
      page_id: 'mapa',
      page_title: 'Mapa da Agroecologia'
    }
  }
}
</script>
