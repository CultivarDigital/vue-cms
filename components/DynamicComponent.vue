<template>
  <component :is="type" v-bind="attrs" @click="$emit('click')">
    <slot />
  </component>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: null,
      required: true
    },
    attrs: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
