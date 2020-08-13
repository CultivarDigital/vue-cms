<template>
  <div class="tags-component">
    <b-button v-if="$route.query.tag && allTags" :to="linkTo()" @click="clicked(null)">
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
      default: null
    },
    allTags: {
      type: Boolean,
      default: true
    }
  },
  created () {
    if (!this.tags) {
      this.tags = this.$store.state.site.tags
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
      background-color: #fff
      border-color: #fff
      color: #384e3f
      margin: 10px 0
      font-size: 12px
      padding: 7px 10px
      border-radius: 5px
      font-weight: bold
      width: 100%
      &.active
        background-color: #384e3f !important
        border-color: #384e3f !important
        color: #fff !important
</style>
