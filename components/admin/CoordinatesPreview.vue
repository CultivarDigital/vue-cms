<template>
  <div v-if="validCoordinates">
    <br>
    <l-map :zoom="16" :center="form.address.location.coordinates" :options="{ scrollWheelZoom: false }" style="height: 30vw">
      <l-tile-layer :url="url" :attribution="attribution" />
      <l-marker :lat-lng="form.address.location.coordinates" />
    </l-map>
    <p>
      <small>Coordenadas: {{ form.address.location.coordinates.join(',') }}</small>
      <span v-if="form.address && form.address.description"><br>Endereço: <strong>{{ form.address.description }}</strong></span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    form: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }
  },
  computed: {
    validCoordinates () {
      if (this.form.address && this.form.address.location && this.form.address.location.coordinates && this.form.address.location.coordinates.length > 1) {
        if (this.form.address.location.coordinates[0] > -90 && this.form.address.location.coordinates[0] < 90) {
          if (this.form.address.location.coordinates[1] > -180 && this.form.address.location.coordinates[1] < 180) {
            return true
          }
        }
      }
      return false
    }
  }
}
</script>
