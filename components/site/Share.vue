<template>
  <div class="share-component text-center mt-5">
    <h6>Compartilhar</h6>
    <client-only>
      <vue-goodshare />
    </client-only>
  </div>
</template>

<script>
export default {}
</script>
<style lang="sass">
  .share-component
    .button-social
      padding: 3px 10px
      &:hover
        color: #fff
      span[class^="counter-"]
        display: none
</style>
