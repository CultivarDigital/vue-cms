<template>
  <b-row class="service-providers-component list-page">
    <b-col v-for="service_provider in serviceProviders" :key="service_provider._id" md="4">
      <nuxt-link :to="'/prestadores-de-servico/' + service_provider.slug" tag="div" class="card">
        <div class="img">
          <b-img :src="service_provider.pictures && service_provider.pictures.length ? service_provider.pictures[0].average : null" :alt="service_provider.name" class="card-img-top" />
        </div>
        <div class="card-body">
          <div class="card-title">
            <h3>{{ service_provider.name }}</h3>
          </div>
          <div class="card-text">
            <p>{{ (service_provider.description || stripHtml(service_provider.content)) | truncate(1000) }}<br><br></p>
            <n-link class="btn btn-primary" :to="'/prestadores-de-servico/' + service_provider.slug">
              Saiba mais
            </n-link>
          </div>
        </div>
      </nuxt-link>
    </b-col>
  </b-row>
</template>

<script>
export default {
  props: {
    serviceProviders: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    stripHtml: (html) => {
      return html ? html.replace(/<\/?[^>]+(>|$)/g, '') : ''
    }
  }
}
</script>
