<template>
  <div class="card map-component">
    <b-row no-gutters>
      <b-col md="4">
        <h3 class="mb-4">Mapa da Agroecologia</h3>
        <div v-for="layer in Object.keys(layers)" :key="layer">
          <div class="legend">
            <div class="pattern" :style="'background-color: ' + layers[layer].color" />
            <h4>
              <n-link :to="layers[layer].url">{{ layers[layer].title }}</n-link>
            </h4>
            <p>
              <n-link :to="layers[layer].url">{{ layers[layer].description }}</n-link>
            </p>
          </div>
          <hr>
        </div>
        <div class="legend">
          <div class="pattern" />
          <h4>Membros da Rede</h4>
          <p>Todos os membros que participam da {{ $store.state.site.name }}</p>
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
                        <l-icon :icon-size="[20, 32]" :icon-url="require('~/assets/img/markers/' + layer + '.png')" />
                        <l-popup>
                          <n-link :to="layers[layer].url + '/' + item.slug" class="text-center">
                            <b-img v-if="item.pictures && item.pictures.length" :src="item.pictures[0].thumb" />
                            <h6 :class="{nopicture: (!item.pictures || !item.pictures.length)}">{{ item.name }}</h6>
                            <b-badge :class="layer" pills>{{ layers[layer].title }}</b-badge>
                            <p>{{ item.description }}</p>
                          </n-link>
                        </l-popup>
                      </l-marker>
                    </template>
                  </template>
                </template>
              </template>
              <template v-if="show_users">
                <template v-for="user in site.users">
                  <l-marker v-if="user.address && user.address.location && user.address.location.coordinates && user.address.location.coordinates.length > 0" :key="user._id" :lat-lng="user.address.location.coordinates">
                    <l-icon :icon-size="[20, 32]" :icon-url="require('~/assets/img/markers/default.png')" />
                    <l-popup>
                      <b-img v-if="user.picture" :src="user.picture.thumb" />
                      <h6 :class="{nopicture: !user.picture}">{{ user.name }}</h6>
                      <b-badge class="members" pills>Membro da rede</b-badge>
                      <p v-if="user.organization"><strong>{{ user.organization }}</strong></p>
                      <p>{{ user.address.city }} - {{ user.address.uf }}</p>
                    </l-popup>
                  </l-marker>
                </template>
              </template>
            </l-map>
          </client-only>
        </div>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import layers from '@/data/layers.json'
export default {
  data() {
    return {
      layers,
      show_users: true
    }
  },
  computed: {
    site() {
      return this.$store.state.site
    }
  },
  methods: {
    toggleLayer(layer) {
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
        &.nopicture
          border-top-left-radius: 10px
          border-top-right-radius: 10px
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
        h4
          color: #00794e
        p
          font-size: 12px
          color: #00794e
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
