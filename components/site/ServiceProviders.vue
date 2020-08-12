<template>
  <b-row class="service-providers-component list-page">
    <b-col v-for="service_provider in serviceProviders" :key="service_provider._id" md="4">
      <nuxt-link :to="'/prestadores-de-servico/' + service_provider.slug" tag="div" class="card">
        <div class="img">
          <b-img :src="service_provider.pictures && service_provider.pictures.length ? service_provider.pictures[0].average : null" :alt="service_provider.name" class="card-img-top" />
        </div>
        <div class="card-body">
          <div class="card-title">
            <h3>Plantio</h3>
          </div>
          <div class="card-text">
            <p v-if="service_provider.planting_time"><strong>Data:</strong>{{ service_provider.planting_time }}</p>
            <p vplanting_timeif="service_provider.area_size"><strong>Área:</strong> {{ service_provider.area_size }} hectares</p>
            <p v-if="service_provider.address && service_provider.address.location && service_provider.address.location.coordinates">
              <strong>Local:</strong>
              {{ service_provider.address.location.coordinates[0] }}, {{ service_provider.address.location.coordinates[1] }}
            </p>
            <h4>{{ service_provider.name }}</h4>
            <p>{{ (service_provider.description || stripHtml(service_provider.content)) | truncate(1000) }}</p>
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
