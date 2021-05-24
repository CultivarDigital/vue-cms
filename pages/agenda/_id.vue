<template>
  <div v-if="event" class="event-page">
    <section class="content pb-5">
      <b-container>
        <h1 class="title pt-5">{{ event.title }}</h1>
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
        <div v-if="event.content || event.documents.length || event.picture" class="quill-content mt-4">
          <banners :items="[event.picture]" />
          <div v-if="event.content" v-html="event.content" />
          <Documents :documents="event.documents" />
          <share />
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      event: null
    }
  },
  async created () {
    this.event = await this.$axios.$get('/api/events/' + this.$route.params.id)
  }
}
</script>
