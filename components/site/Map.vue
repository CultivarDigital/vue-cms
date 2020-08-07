<template>
  <client-only>
    <l-map v-if="site && layers" :zoom="4" :center="[-17,-55]" :options="{ scrollWheelZoom: false }">
      <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
      <template v-if="layers">
        <template v-for="layer in Object.keys(layers)">
          <template v-if="site[layer]">
            <template v-for="item in site[layer]">
              <l-marker v-if="item.address && item.address.location && item.address.location.coordinates" :key="item._id" :lat-lng="item.address.location.coordinates">
                <l-icon :icon-size="[13, 15]" :icon-url="require('~/assets/img/marker-' + layer + '.png')" />
                <l-popup>{{ item.name }}</l-popup>
              </l-marker>
            </template>
          </template>
        </template>
      </template>
    </l-map>
  </client-only>
</template>

<script>
import mixinPage from '@/mixins/page'
export default {
  mixins: [mixinPage],
  props: {
    layers: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      Object
    }
  },
  created () {
  }
}
</script>
