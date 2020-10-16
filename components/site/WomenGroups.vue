<template>
  <div>
    <div v-if="womenGroups">
      <div v-if="womenGroups.length > 0">
        <b-row class="women_groups-component list-page">
          <b-col v-for="women_group in womenGroups.filter(womenGroup => womenGroup.status === 'approved')" :key="women_group._id" md="4">
            <n-link :to="'/grupos-de-mulheres/' + women_group.slug" tag="div" class="card">
              <div class="img">
                <b-img :src="women_group.pictures && women_group.pictures.length ? women_group.pictures[0].average : null" :alt="women_group.name" class="card-img-top" />
              </div>
              <div class="card-body">
                <div class="card-title">
                  <h3>{{ women_group.name }}</h3>
                </div>
                <div class="card-text">
                  <p>{{ (women_group.description || women_group.content) | truncate(1000) }}<br><br></p>
                  <p v-if="women_group.address && (women_group.address.city || women_group.address.uf)">
                    <strong>Local:</strong>
                    {{ [women_group.address.city, women_group.address.uf].filter(i => i).join(' - ') }}
                    <br>
                    <br>
                  </p>
                  <n-link class="btn btn-primary" :to="'/grupos-de-mulheres/' + women_group.slug">
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
      </div>
      <p v-else class="subtitle">Nenhum grupo de mulheres encontrado</p>
    </div>
    <p v-else class="subtitle"><b-spinner small /> Carregando...</p>
  </div>
</template>

<script>
export default {
  props: {
    womenGroups: {
      type: Array,
      default: () => []
    }
  }
}
</script>
