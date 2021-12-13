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
  },
  computed: {
    settings() {
      return this.$store.state.settings
    }
  },
  methods: {
    menuUrl(menu) {
      const props = {}
      if (menu.page) {
        props.to = '/' + menu.page.slug
      } else if (menu.url.startsWith('http')) {
        props.href = menu.url
        props.target = '_blank'
      } else {
        props.to = menu.url
      }
      return props
    }
  }
}
</script>
