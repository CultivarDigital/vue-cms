<template>
  <div>
    <b-badge v-for="tag in tags" :key="tag" pill variant="primary">{{ tag }}</b-badge>
  </div>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      default: () => []
    }
  }
}
</script>
