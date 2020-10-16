<template>
  <div v-if="address && address.location && address.location.coordinates" class="item-map-component">
    <client-only>
      <l-map :zoom="5" :center="address.location.coordinates" :options="{ scrollWheelZoom: false }">
        <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        <l-marker :lat-lng="address.location.coordinates">
          <l-icon :icon-size="[20, 32]" :icon-url="require('~/assets/img/markers/' + type + '.png')" />
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
