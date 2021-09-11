<template>
  <div v-if="event" class="event-page">
    <Breadcrumb
      :links="[['Agenda', '/agenda']]"
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
        <div v-if="event.content || event.docs.length || event.image" class="quill-content mt-4">
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
