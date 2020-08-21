<template>
  <b-row class="service-providers-component list-page">
    <b-col v-for="service_provider in serviceProviders" :key="service_provider._id" md="4">
      <n-link :to="'/prestadores-de-servico/' + service_provider.slug" tag="div" class="card">
        <div class="img">
          <b-img :src="service_provider.pictures && service_provider.pictures.length ? service_provider.pictures[0].average : null" :alt="service_provider.name" class="card-img-top" />
        </div>
        <div class="card-body">
          <div class="card-title">
            <h3>{{ service_provider.name }}</h3>
          </div>
          <div class="card-text">
            <p>{{ (service_provider.description || service_provider.content) | truncate(1000) }}<br><br></p>
            <p v-if="service_provider.address && (service_provider.address.city || service_provider.address.uf)">
              <strong>Local:</strong>
              {{ [service_provider.address.city, service_provider.address.uf].filter(i => i).join(' - ') }}
              <br>
              <br>
              </p>
            <n-link class="btn btn-primary" :to="'/prestadores-de-servico/' + service_provider.slug">
              Saiba mais
            </n-link>
            <n-link to="/mapa" class="btn btn-default">
              Voltar ao mapa
            </n-link>
          </div>
        </div>
      </n-link>
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
  }
}
</script>
