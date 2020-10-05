<template>
  <div class="card map-component">
    <b-row no-gutters>
      <b-col md="4">
        <h3 class="mb-4">Mapa da Agroecologia</h3>
        <div v-for="layer in Object.keys(layers)" :key="layer">
          <div class="legend">
            <div class="pattern" />
            <h4><n-link :to="layers[layer].url">{{ layers[layer].title }}</n-link></h4>
            <p><n-link :to="layers[layer].url">{{ layers[layer].description }}</n-link></p>
          </div>
          <hr>
        </div>
        <div class="legend">
          <div class="pattern" />
          <h4 style="color: #606060">Plantios com semeadura direta</h4>
          <p>Mapeamento das áreas de plantios com semeadura direta por município. Esse mapeamento é o primeiro passo para engajar os proprietários a se cadastrarem como Unidades de Aprendizagem (UAs)</p>
        </div>
      </b-col>
      <b-col md="8">
        <div id="map-wrap">
          <client-only>
            <l-map v-if="site && layers" :zoom="4" :center="[-17,-55]" :options="{ scrollWheelZoom: false }">
              <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
              <template v-if="layers">
                <template v-for="layer in Object.keys(layers)">
                  <template v-if="site[layer] && layers[layer].status">
                    <template v-for="item in site[layer]">
                      <l-marker v-if="item.status === 'approved' && item.address && item.address.location && item.address.location.coordinates" :key="item._id" :lat-lng="item.address.location.coordinates">
                        <l-icon :icon-size="[16, 16]" :icon-url="require('~/assets/img/marker_' + layer + '.png')" />
                        <l-popup>
                          <n-link :to="layers[layer].url + '/' + item.slug" class="text-center">
                            <b-img v-if="item.pictures && item.pictures.length" :src="item.pictures[0].thumb" />
                            <h6>{{ item.name }}</h6>
                            <b-badge :class="layer" pills>{{ layers[layer].title }}</b-badge>
                            <p>{{ item.description }}</p>
                          </n-link>
                        </l-popup>
                      </l-marker>
                    </template>
                  </template>
                </template>
              </template>
              <template v-if="show_planting_areas">
                <l-marker v-for="planting_area in site.planting_areas" :key="planting_area._id" :lat-lng="planting_area.address.location.coordinates">
                  <l-icon :icon-size="[16, 16]" :icon-url="require('~/assets/img/marker_planting_areas.png')" />
                  <l-popup>
                    <h6>{{ planting_area.address.city }} - {{ planting_area.address.uf }}</h6>
                    <p>{{ planting_area.qtd }} plantios por Agroecologia</p>
                  </l-popup>
                </l-marker>
              </template>
            </l-map>
          </client-only>
        </div>
      </b-col>
      <!-- <b-col md="2">
        <div class="legend">
          <div class="pattern" />
          <h4>Legendas</h4>
          <br>
          <p>Clique para navegar no mapa</p>
          <br>
          <p v-for="layer in Object.keys(layers)" :key="layer" @click="toggleLayer(layer)">
            <b-img v-if="layers[layer].status" :src="require('~/assets/img/marker_' + layer + '.png')" />
            <b-img v-else :src="require('~/assets/img/marker_inactive.png')" />
            {{ layers[layer].title }}
          </p>
          <p class="pointer" @click="show_planting_areas = !show_planting_areas">
            <b-img :src="require('~/assets/img/' + (show_planting_areas ? 'marker_planting_areas' : 'marker_inactive') + '.png')" />
            Plantios por Agroecologia
          </p>
        </div>
      </b-col> -->
    </b-row>
  </div>
</template>
<script>
import layers from '@/data/layers.json'
export default {
  data () {
    return {
      layers,
      show_planting_areas: true
    }
  },
  computed: {
    site () {
      return this.$store.state.site
    }
  },
  methods: {
    toggleLayer (layer) {
      this.layers[layer].status = !this.layers[layer].status
    }
  }
}
</script>
<style lang="sass" scoped>
  #map-wrap
    height: 100%
    @media(max-width: 768px)
      height: 70vw
  .map-component
    border-radius: 15px
    border: none
    .vue2leaflet-map
      border-top-right-radius: 15px
      border-bottom-right-radius: 15px
    .leaflet-popup-content
      img
        max-width: calc(100% + 40px)
        border-top-left-radius: 10px
        border-top-right-radius: 10px
        margin: -20px
        margin-bottom: 15px
      h6
        background: #00794e
        color: #fff
        margin: -15px -20px 7px -20px
        padding: 10px
    .col-md-4
      padding: 50px
      h3
        font-weight: 700
        color: #51009c
        font-size: 22px
      h4
        font-weight: 700
        font-size: 18px
      .legend
        p
          font-size: 12px
          .btn
            background-color: #51009c
            padding: 1px 3px
            border: none
            color: #00794e
            line-height: 10px
            font-size: 10px
            margin-left: 6px
        .pattern
          width: 15px
          height: 25px
          background-color: #00794e
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
        font-size: 11px
        cursor: pointer
        margin-left: -20px
        img
          margin-right: 6px
          margin-top: -7px
          max-width: 22px
      .pattern
        width: 15px
        height: 25px
        background-color: #00794e
        position: absolute
        left: 0
</style>
