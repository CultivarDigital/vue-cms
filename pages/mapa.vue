<template>
  <div v-if="page" class="about-page">
    <section class="content pb-5">
      <b-container fluid="lg" class="map">
        <h6 class="pt-5 mb-4 text-center">Conheça o Mapa de Restauração ecológica da Iniciativa Caminhos da Semente</h6>
        <div class="card">
          <h3 class="mt-4">Mapa da Semeadura Direta</h3>
          <b-row no-gutters>
            <b-col>
              <div class="legend" @click="toggleLayer('learning_units')">
                <div class="pattern" />
                <h4>Unidades de Aprendizagem</h4>
                <p>
                  Recuperar vegetação nativa com alta eficácia e baixo custo
                  <!-- <b-button>{{ map_layers['learning_units'] ? '-' : '+' }}</b-button> -->
                </p>
              </div>
            </b-col>
            <b-col>
              <div class="legend" @click="toggleLayer('service_providers')">
                <div class="pattern" />
                <h4>Prestadores de serviço</h4>
                <p>
                  Recuperar vegetação nativa com alta eficácia e baixo custo
                  <!-- <b-button>{{ map_layers['service_providers'] ? '-' : '+' }}</b-button> -->
                </p>
              </div>
            </b-col>
            <b-col>
              <div class="legend" @click="toggleLayer('seeds_networks')">
                <div class="pattern" />
                <h4>Redes de sementes</h4>
                <p>
                  Recuperar vegetação nativa com alta eficácia e baixo custo
                  <!-- <b-button>{{ map_layers['seeds_networks'] ? '-' : '+' }}</b-button> -->
                </p>
              </div>
            </b-col>
          </b-row>
          <div id="map-wrap" style="height: 100vh">
            <Map :layers="map_layers" />
          </div>
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
import mixinPage from '@/mixins/page'
import Map from '@/components/site/Map'
export default {
  components: {
    Map
  },
  mixins: [mixinPage],
  data () {
    return {
      page_id: 'about',
      map_layers: {
        learning_units: true,
        service_providers: true,
        seeds_networks: true
      }
    }
  },
  methods: {
    toggleLayer (layer) {
      this.map_layers[layer] = !this.map_layers[layer]
    }
  },
  head () {
    return {
      title: 'Mapa da Semeadura Direta - ' + this.site.name,
      meta: [
        { hid: 'description', name: 'description', content: this.page.description || this.site.description }
      ]
    }
  }
}
</script>
<style lang="sass" scoped>
  .about-page
    .content
      background-color: #f6a447
      .map
        h6
          font-weight: 700
        .card
          border-radius: 15px
          border: none
          h3
            font-weight: 700
            color: #f6a447
            font-size: 22px
            text-align: center
          .col
            padding: 50px
            h4
              font-weight: 700
              font-size: 18px
            .legend
              p
                font-size: 12px
                .btn
                  background-color: #f6a447
                  padding: 1px 3px
                  border: none
                  color: #384e3f
                  line-height: 10px
                  font-size: 10px
                  margin-left: 6px
              .pattern
                width: 15px
                height: 25px
                background-color: #384e3f
                position: absolute
                left: 0
            // padding: 30px
        .col-md-2
          padding: 30px
          h4
            margin-top: 30px
            font-weight: 700
            font-size: 16px
          .legend
            p
              font-size: 12px
              .btn
                background-color: #f6a447
                padding: 1px 3px
                border: none
                color: #384e3f
                line-height: 10px
                font-size: 10px
                margin-left: 6px
            .pattern
              width: 15px
              height: 25px
              background-color: #384e3f
              position: absolute
              left: 0
</style>
