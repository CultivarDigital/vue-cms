<template>
  <div class="tags">
    <b-button v-for="tag in tags" :key="tag._id" size="sm">
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
  }
}
</script>
<style lang="sass">
  .tags
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
