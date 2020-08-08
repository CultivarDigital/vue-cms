<template>
  <div v-if="items.length" class="banners-component">
    <divisor variant="white-down" />
    <b-carousel :interval="7000" :indicators="items.length > 1" class="banners">
      <b-carousel-slide v-for="(item, index) in items" :key="index" :img-src="item.url">
        <h2 v-if="item.title">{{ item.title }}</h2>
      </b-carousel-slide>
    </b-carousel>
    <divisor variant="orange-up" />
  </div>
</template>
<script>
import Divisor from '@/components/site/Divisor'
export default {
  components: {
    Divisor
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>
<style lang="sass">
  .banners-component
    .carousel-caption
      height: 100%
      display: flex
      align-content: center
      align-items: center
      justify-content: center
      flex-flow: column
      margin-bottom: -20px
      h2
        font-weight: 700
        font-size: 26px
        @media (max-width: 768px)
          font-size: 18px
        @media (max-width: 576px)
          font-size: 14px
      p
        @media (max-width: 768px)
          display: none
    .carousel-indicators
      bottom: 10px
      li
        width: 6px
        height: 6px
        background-color: transparent
        border: 1px solid #fff
        border-radius: 100%

</style>
