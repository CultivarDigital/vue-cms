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
        <div v-if="event.content || event.pdfs.length || event.picture" class="quill-content mt-4">
          <banners :items="[event.picture]" />
          <div v-if="event.content" v-html="event.content" />
          <div v-if="event.pdfs && event.pdfs.length > 0" class="pdfs">
            <h3>Documentos</h3>
            <b-row class="text-center">
              <b-col v-for="pdf in event.pdfs" :key="pdf._id" md="4">
                <a :href="pdf.url" target="_blank">
                  <div class="img">
                    <b-img :src="pdf.thumb" />
                  </div>
                  <p>{{ pdf.title || 'Baixar arquivo' }}</p>
                  <br>
                </a>
              </b-col>
            </b-row>
          </div>
          <share />
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
import mixinPage from '@/mixins/page'
import Banners from '@/components/site/Banners'
export default {
  components: {
    Banners
  },
  mixins: [mixinGlobal, mixinPage],
  data () {
    return {
      page_id: 'events'
    }
  },
  computed: {
    event () {
      return this.site.events.find(event => event._id === this.$route.params.id)
    }
  },
  head () {
    return {
      title: this.event.name + ' - Eventos - ' + this.site.name,
      meta: [
        { hid: 'description', name: 'description', content: this.event.description || this.site.description }
      ]
    }
  }
}
</script>
