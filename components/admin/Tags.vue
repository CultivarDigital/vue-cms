<template>
  <div>
    <b-badge v-for="tag in tags" :key="tag" pill variant="secondary" class="pointer mr-1" @click="$emit('clicked', tag)">{{ tag }}</b-badge>
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
