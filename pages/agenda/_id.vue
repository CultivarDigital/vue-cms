<template>
  <div v-if="event" class="event-page">
    <Breadcrumb
      :links="[[title, '/agenda']]"
      :active="event.title"
      :description="event.description"
    />
    <section class="content">
      <b-container>
        <h1 class="title">{{ event.title }}</h1>
        <p v-if="event.description" class="subtitle">{{ event.description }}</p>
        <p v-if="event.end_at" class="subtitle">
          {{ event.start_at.endsWith('00:00:00.000Z') ? $moment(event.start_at).format("DD/MM/YYYY") : $moment(event.start_at).format("DD/MM/YYYY HH:mm") }}
          -
          {{ event.end_at.endsWith('00:00:00.000Z') ? $moment(event.end_at).format("DD/MM/YYYY") : $moment(event.end_at).format("DD/MM/YYYY HH:mm") }}
        </p>
        <p v-else class="subtitle">
          {{ event.start_at.endsWith('00:00:00.000Z') ? $moment(event.start_at).format("DD/MM/YYYY") : $moment(event.start_at).format("DD/MM/YYYY HH:mm") }}
        </p>
        <tags :tags="event.tags" />
        <div v-if="event.content || event.docs.length || event.image" class="dynamic-content mt-4">
          <Banners v-if="event.image" :items="[event.image]" />
          <div v-if="event.content" class="mt-4" v-html="event.content" />
          <Documents :documents="event.docs" />
          <share />
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
import features from '@/data/features'
export default {
  data () {
    return {
      event: null
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
  async created () {
    this.event = await this.$axios.$get('/api/events/' + this.$route.params.id)
  }
}
</script>
