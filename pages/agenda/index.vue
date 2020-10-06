<template>
  <div class="events-page">
    <section class="content pb-5">
      <page-info id="events" />
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
import estados from '@/data/estados.json'
export default {
  mixins: [mixinGlobal],
  data() {
    return {
      estados,
      events: null
    }
  },
  created() {
    this.events = this.$store.state.site.events
  }
}
</script>
