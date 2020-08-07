<template>
  <div :class="'divisor ' + variant">
    <b-img :src="require('~/assets/img/divisor-' + variant + '.png')" />
  </div>
</template>
<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'white-down'
    }
  }
}
</script>
<style lang="sass">
  .divisor
    background: transparent
    width: 100%
    position: absolute
    z-index: 1
    text-align: center
    img
      width: 100%
      vertical-align: inherit
    &.white-down
      @media (max-width: 992px)
        margin-top: -5px
    &.orange-up
      margin-top: -20px
      @media (max-width: 992px)
        margin-top: -16px

    @media (max-width: 576px)
      display: none
</style>
