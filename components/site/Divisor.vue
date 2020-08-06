<template>
  <div :class="'divisor ' + variant">
    <b-img :src="require('~/assets/img/divisor-' + variant + '-line.svg')" />
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
    background-size: 100% 100px
    position: absolute
    z-index: 1
    img
      width: 100%
    &.white-down
      background-image: url('~assets/img/divisor-white-down.png')
      background-position: bottom
    &.orange-up
      background-image: url('~assets/img/divisor-orange-up.png')
      background-position: top
      margin-top: -24px
    @media (max-width: 576px)
      display: none
</style>
