<template>
  <div class="arrow" @click="scroll">
    <span class="animate" />
    <span class="animate" />
    <span class="animate" />
  </div>
</template>

<script>
export default {
  props: {
    target: {
      type: String,
      default: '.content'
    }
  },
  methods: {
    scroll () {
      this.$scrollTo(this.target || '.categories')
    }
  }
}
</script>
<style lang="sass">
  .arrow
    @media (max-width: 768px)
      display: none
    position: absolute
    bottom: 8%
    left: 50%
    transform: translate(-50%, -50%)
    cursor: pointer
    z-index: 15
  .arrow span
    margin-top: -40px
    position: relative
    display: block
    width: 35px
    height: 35px
    border-bottom: 2px solid #fff
    border-right: 2px solid #fff
    transform: rotate(90deg)
  .arrow span:nth-of-type(1)
    left: 0
  .arrow span:nth-of-type(2)
    left: 0
  .arrow span:nth-of-type(3)
    left: 0
  .animate
    animation: animate 2s infinite
  .arrow span:nth-child(2)
    animation-delay: -0.2s
  .arrow span:nth-child(3)
    animation-delay: -0.4s
  @keyframes animate
    0%
      opacity: 0
      transform: rotate(45deg) translate(-20px, -20px)
    50%
      opacity: 1
    100%
      opacity: 0
      transform: rotate(45deg) translate(20px, 20px)
</style>
