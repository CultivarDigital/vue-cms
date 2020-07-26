<template>
  <div v-if="site">
    <b-carousel :interval="60000" indicators>
      <b-carousel-slide caption="FLORESTA EM PÉ PARA GARANTIA DA VIDA DO POVO MẼBÊNGÔKRE" img-src="~/assets/img/banner-cultura.png" />
      <b-carousel-slide caption="MONITORAMENTO AMBIENTAL E TERRITORIAL" img-src="~/assets/img/banner-monitoramento.png" />
      <b-carousel-slide caption="ATIVIDADES PRODUTIVAS E GERAÇÃO DE RENDA" img-src="~/assets/img/banner-atividades.png" />
      <b-carousel-slide caption="FORTALECIMENTO INSTITUCIONAL E POLÍTICO" img-src="~/assets/img/banner-politica.png" />
      <arrows />
    </b-carousel>
    <section class="content">
      <div class="divisor" />
      <categories :categories="site.categories" />
      <posts :posts="site.posts" />
      <tags :tags="site.tags" />
    </section>
  </div>
</template>

<script>
import Arrows from '@/components/Arrows'
import Categories from '@/components/Categories'
import Posts from '@/components/Posts'
import Tags from '@/components/Tags'
export default {
  components: {
    Arrows,
    Categories,
    Posts,
    Tags
  },
  computed: {
    site () {
      return this.$store.state.site
    }
  },
  data () {
    return {
      page: 0
    }
  },
  methods: {
    prev () {
      console.log(this.page)
      if (this.page > 0) {
        this.page -= 1
      } else {
        this.page = this.site.categories.length / 4
      }
      this.$scrollTo('.posts')
    }
  }
}
</script>
<style lang="sass">
  @import "@/assets/css/_vars.scss"
  .carousel-caption
    font-family: 'Amatic SC', cursive
    h3
      font-size: 18px
    @media (min-width: 768px)
      bottom: 18%
      h3
        font-size: 28px
    @media (min-width: 992px)
      h3
        font-size: 32px 0% 0% no-repeat padding-box
  .carousel-indicators
    @media (min-width: 768px)
      bottom: 16%
    li
      width: 6px
      height: 6px
      background-color: transparent
      border: 1px solid $white
      border-radius: 100%
  .content
    // background: transparent url('~assets/img/bg1.png')
    margin-top: -120px
    .divisor
      background: transparent url('~assets/img/degrade.png')
      height: 241px
      width: 100%
      position: relative
      margin-top: -241px
  .categories
    .row
      margin-left: -5px
      margin-right: -5px
      .col-lg-3, .col-sm-6
        padding-left: 5px
        padding-right: 5px
    .card
      border: none
      color: #1e2048
      text-align: center
      background-color: #edd5b5
      margin-bottom: 15px
      border-radius: 15px
      .card-img-top
        border-top-left-radius: 15px
        border-top-right-radius: 15px
      .card-text
        height: 150px
        overflow-y: hidden
        font-size: 12px
        .icon
          background-color: #1e2048
          border-radius: 100%
          width: 80px
          height: 80px
          display: flex
          align-items: center
          justify-content: center
          position: absolute
          left: 0
          right: 0
          margin: auto
          margin-top: -60px
          img
            width: 65px
        h3
          font-size: 24px
          height: 60px
          color: #1e2048
</style>
