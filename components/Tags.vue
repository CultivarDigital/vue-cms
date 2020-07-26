<template>
  <b-container class="tags pt-4 mb-4 text-center">
    <b-button v-for="tag in tags" :key="tag._id" size="sm">
      {{ tag.name }}
    </b-button>
  </b-container>
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
      padding: 5px 15px
      border-radius: 7px
      font-family: 'Titillium Web', sans-serif
      text-transform: uppercase
</style>
