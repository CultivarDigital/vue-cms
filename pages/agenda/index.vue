<template>
  <div class="events-page">
    <Breadcrumb
      :active="title"
    />
    <section class="content pb-5">
      <Page slug="agenda" :breadcrumb="false" />
      <b-container>
        <br>
        <div v-if="events">
          <calendar :events="events" />
        </div>
      </b-container>
      <share />
    </section>
  </div>
</template>

<script>
import features from '@/data/features'
export default {
  data() {
    return {
      events: null
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings
    },
    title() {
      if (this.settings && this.settings.features && this.settings.features.events && this.settings.features.events.title) {
        return this.settings.features.events.title
      }
      return features.events.title
    }
  },
  async created() {
    this.events = await this.$axios.$get('/api/events')
  }

}
</script>
