<template>
  <div v-if="site" class="home-page">
    <banners :items="site.pictures" />
    <section class="content">
      <b-container fluid="lg">
        <h2 class="pt-5 mb-4 text-center title">{{ site.name }}</h2>
        <h6 class="mb-5 text-center subtitle">{{ site.description }}</h6>
        <Map />
      </b-container>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    site () {
      return this.$store.state.site
    }
  }
}
</script>
<style lang="sass" scoped>
  .home-page
    .content
      background-color: #51009c
      .banners
        a
          color: #fff
      .boxes
        margin-top: 50px
        .box
          margin-bottom: 50px
          background: #fff
          border-radius: 15px
          padding-bottom: 20px
          .title
            margin-top: -50px
            margin-left: 35px
            .pattern
              width: 15px
              height: 25px
              background-color: #fff
              position: absolute
              left: 19px
            h3
              font-size: 22px
              font-weight: 700
              color: #fff
          img
            width: 100%
      .partners
        padding: 50px
        img
          max-width: 100%
          max-height: 8vh
        h3
          color: #00794e
          font-weight: 700
          font-size: 16px
          margin-top: 20px
          margin-bottom: 20px
        .row > div
          margin-bottom: 30px
          .partner
            display: flex
            align-items: center
            justify-content: center
            width: 100%
            height: 100%

</style>
