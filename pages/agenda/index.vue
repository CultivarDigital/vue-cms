<template>
  <div class="events-page">
    <section class="content pb-5">
      <page-info :page="page" />
      <b-container>
        <br>
        <div v-if="events">
          <calendar :events="events" />
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
import mixinPage from '@/mixins/page'
export default {
  mixins: [mixinGlobal, mixinPage],
  data() {
    return {
      page_id: 'agenda',
      page_title: 'Agenda',
      events: null
    }
  },
  created() {
    this.events = this.$store.state.site.events
  }
}
</script>
