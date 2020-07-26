<template>
  <div class="arrow-right" @click="$emit('click')">
    <span />
    <span />
    <span />
  </div>
</template>

<style lang="sass">
  .arrow-right
    position: absolute
    right: 0
    transform: translate(-50%, -50%)
    cursor: pointer
    z-index: 15
    margin-top: -150px
  .arrow-right span
    margin-top: -35px
    position: relative
    display: block
    width: 35px
    height: 35px
    border-bottom: 2px solid #fff
    border-right: 2px solid #fff
    transform: rotate(-45deg)
  .arrow-right span:nth-of-type(1)
    right: 0
  .arrow-right span:nth-of-type(2)
    right: 5px
  .arrow-right span:nth-of-type(3)
    right: 10px
  .arrow-right span:nth-child(2)
    animation-delay: -0.2s
  .arrow-right span:nth-child(3)
    animation-delay: -0.4s
</style>
