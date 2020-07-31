<template>
  <div class="tags-component">
    <b-button v-if="$route.query.tag" @click="clicked(null)">
      Todas as tags
    </b-button>
    <b-button v-for="tag in tags" :key="tag._id" size="sm" @click="clicked(tag)" :class="{ active: ($route.query.tag === tag.slug)}">
      {{ tag.name }}
    </b-button>
  </div>
</template>
<script>
export default {
  props: {
    tags: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    clicked (tag) {
      this.$emit('click', tag)
    }
  }
}
</script>
<style lang="sass">
  .tags-component
    .btn
      background-color: transparent
      border-color: #eed6b6
      color: #eed6b6
      margin: 10px
      font-size: 12px
      padding: 10px 30px
      border-radius: 7px
      font-family: 'Titillium Web', sans-serif
      text-transform: uppercase
</style>
