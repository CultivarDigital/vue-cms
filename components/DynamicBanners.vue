<template>
  <div :id="attrs.id" @click="$emit('click')">
    <Banners v-bind="attrs" />
  </div>
</template>

<script>
export default {
  props: {
    attrs: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
