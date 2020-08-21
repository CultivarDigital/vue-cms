<template>
  <div class="card map-component">
    <b-row no-gutters>
      <b-col md="4">
        <h3 class="mb-4">Mapa da Semeadura Direta</h3>
        <div v-for="(layer, index) in Object.keys(layers)" :key="layer">
          <div class="legend">
            <div class="pattern" />
            <h4><n-link :to="layers[layer].url">{{ layers[layer].title }}</n-link></h4>
            <p><n-link :to="layers[layer].url">{{ layers[layer].description }}</n-link></p>
          </div>
          <hr v-if="index != Object.keys(layers).length - 1">
        </div>
      </b-col>
      <b-col md="6">
        <div id="map-wrap">
          <client-only>
            <l-map v-if="site && layers" :zoom="4" :center="[-17,-55]" :options="{ scrollWheelZoom: false }">
              <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
              <template v-if="layers">
                <template v-for="layer in Object.keys(layers)">
                  <template v-if="site[layer] && layers[layer].status">
                    <template v-for="item in site[layer]">
                      <l-marker v-if="item.address && item.address.location && item.address.location.coordinates" :key="item._id" :lat-lng="item.address.location.coordinates">
                        <l-icon :icon-size="[13, 15]" :icon-url="require('~/assets/img/marker_' + layer + '.png')" />
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
              <l-marker v-for="state in states" :key="state.name" :lat-lng="state.location">
                <l-icon :icon-size="[13, 15]" :icon-url="require('~/assets/img/marker_seeds_networks.png')" />
                <l-popup>
                  <h6>{{ state.name }}</h6>
                  <p>{{ state.qtd }} plantios por Semeadura Direta</p>
                </l-popup>
              </l-marker>
            </l-map>
          </client-only>
        </div>
      </b-col>
      <b-col md="2">
        <div class="legend">
          <div class="pattern" />
          <h4>Legenda</h4>
          <br>
          <p v-for="layer in Object.keys(layers)" :key="layer" @click="toggleLayer(layer)">
            <b-img v-if="layers[layer].status" :src="require('~/assets/img/marker_' + layer + '.png')" />
            <b-img v-else :src="require('~/assets/img/marker_inactive.png')" />
            {{ layers[layer].title }}
          </p>
          <p>
            <b-img :src="require('~/assets/img/marker_seeds_networks.png')" />
            Plantios por Semeadura Direta
          </p>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import layers from '@/data/layers.json'
export default {
  data () {
    return {
      layers,
      states: [
        {
          name: 'Distrito Federal',
          location: [-15.791892, -47.965834],
          qtd: 3
        },
        {
          name: 'Espírito Santo',
          location: [-19.647419, -40.494222],
          qtd: 2
        },
        {
          name: 'Goiás',
          location: [-15.750669, -49.267045],
          qtd: 34
        },
        {
          name: 'Minas Gerais',
          location: [-18.275893, -44.388995],
          qtd: 52
        },
        {
          name: 'Mato Grosso do Sul',
          location: [-20.028867, -54.647905],
          qtd: 2
        },
        {
          name: 'Mato Grosso',
          location: [-13.018335, -55.342865],
          qtd: 438
        },
        {
          name: 'Pará',
          location: [-4.571791, -52.676406],
          qtd: 4
        },
        {
          name: 'Paraíba',
          location: [-7.188685, -36.658128],
          qtd: 1
        },
        {
          name: 'Pernambuco',
          location: [-8.441353, -37.694435],
          qtd: 4
        },
        {
          name: 'Rio de Janeiro',
          location: [-22.923746, -43.437720],
          qtd: 1
        },
        {
          name: 'Rondônia',
          location: [-10.877289, -62.927273],
          qtd: 10
        },
        {
          name: 'São Paulo',
          location: [-22.318868, -48.429556],
          qtd: 25
        },
        {
          name: 'Tocantins',
          location: [-10.240146, -48.183759],
          qtd: 23
        }
      ]
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
    .leaflet-popup-content
      img
        max-width: calc(100% + 40px)
        border-top-left-radius: 10px
        border-top-right-radius: 10px
        margin: -20px
        margin-bottom: 15px
      h6
        background: #384e3f
        color: #fff
        margin: -15px -20px 7px -20px
        padding: 10px
    .col-md-4
      padding: 50px
      h3
        font-weight: 700
        color: #f6a447
        font-size: 22px
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
        font-size: 11px
        cursor: pointer
        margin-left: -20px
        img
          margin-right: 6px
          margin-top: -7px
      .pattern
        width: 15px
        height: 25px
        background-color: #384e3f
        position: absolute
        left: 0
</style>
