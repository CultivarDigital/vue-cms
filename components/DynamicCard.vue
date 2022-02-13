<template>
  <b-card v-bind="attrs" class="mb-3" @click="$emit('click')">
    <b-card-text v-if="attrs.text" class="pre-wrap">{{ attrs.text }}</b-card-text>
    <b-link v-for="(link, index) in attrs.links" :key="'card-link-' + index" v-bind="link" class="card-link">{{ link.title }}</b-link>
  </b-card>
</template>

<script>
export default {
  props: {
    attrs: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings
    }
  }
}
</script>
<style scoped>
.card .card-link {
  color: #007bff;
}
</style>
