<template>
  <div class="arrow-left" @click="$emit('click')">
    <span />
    <span />
    <span />
  </div>
</template>

<style lang="sass">
  .arrow-left
    position: absolute
    left: 30px
    transform: translate(-50%, -50%)
    cursor: pointer
    z-index: 15
    margin-top: -150px
  .arrow-left span
    position: relative
    display: block
    margin-top: -35px
    width: 35px
    height: 35px
    border-bottom: 2px solid #fff
    border-right: 2px solid #fff
    transform: rotate(135deg)
  .arrow-left span:nth-of-type(1)
    left: 0
  .arrow-left span:nth-of-type(2)
    left: 5px
  .arrow-left span:nth-of-type(3)
    left: 10px
  .arrow-left span:nth-child(2)
    animation-delay: -0.2s
  .arrow-left span:nth-child(3)
    animation-delay: -0.4s
  @media (max-width: 768px)
    .arrow-left
      left: 15px
    .arrow-left span
      margin-top: -15px
      width: 15px
      height: 15px
      border-bottom: 1px solid #fff
      border-right: 1px solid #fff
    .arrow-left span:nth-of-type(1)
      left: 0
    .arrow-left span:nth-of-type(2)
      left: 3px
    .arrow-left span:nth-of-type(3)
      left: 6px

</style>
