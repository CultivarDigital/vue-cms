<template>
  <div class="tags-component">
    <b-button v-if="$route.query.tag" :to="linkTo()" @click="clicked(null)">
      Todas as tags
    </b-button>
    <b-button v-for="tag in tags" :key="tag._id" :to="linkTo(tag)" size="sm" :class="{ active: ($route.query.tag === tag.slug)}" @click="clicked(tag)">
      {{ tag.name }}
    </b-button>
  </div>
</template>
<script>
export default {
  props: {
    to: {
      type: String,
      default: null
    },
    tags: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    linkTo (tag) {
      if (this.to) {
        if (tag) {
          return this.to + '?tag=' + tag.slug
        } else {
          return this.to
        }
      }
      return null
    },
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
