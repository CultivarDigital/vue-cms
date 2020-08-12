<template>
  <div class="item-map-component" v-if="address && address.location && address.location.coordinates">
    <client-only>
      <l-map :zoom="5" :center="address.location.coordinates" :options="{ scrollWheelZoom: false }">
        <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        <l-marker :lat-lng="address.location.coordinates">
          <l-icon :icon-size="[13, 15]" :icon-url="require('~/assets/img/marker_' + type + '.png')" />
        </l-marker>
      </l-map>
    </client-only>
  </div>
</template>
<script>
export default {
  props: {
    address: {
      type: Object,
      default: null
    },
    type: {
      type: String,
      default: null
    }
  }
}
</script>
<style lang="sass" scoped>
  .item-map-component
    height: 14vw
</style>
