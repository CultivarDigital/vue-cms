<template>
  <div v-if="site" class="home-page">
    <divisor variant="white-down" />
    <b-carousel :interval="7000" :indicators="site.pictures.length > 1" class="banners">
      <b-carousel-slide img-src="~assets/img/banner1.png">
        <h2>Quem Somos</h2>
        <p>Somos uma rede de pessoas e organizações que querem dar escala à restauração ecológica no Brasil com foco no método da semeadura direta</p>
      </b-carousel-slide>
      <b-carousel-slide img-src="~assets/img/banner2.png">
        <h2>Mapa</h2>
        <p>Você sabe onde tem projetos de restauração com semeadura direta no Brasil? Conheça o Mapa de Restauração ecológica da Iniciativa Caminhos da Semente</p>
      </b-carousel-slide>
    </b-carousel>
    <divisor variant="orange-up" />
    <section class="content pb-4">
      <b-container class="text-center">
        <b-img src="~assets/img/pilares-de-acao.png" class="subtitle mt-5" />
      </b-container>
      <b-container fluid="lg" class="map">
        <h6 class="mt-5 mb-4 text-center">Conheça o Mapa de Restauração ecológica da Iniciativa Caminhos da Semente</h6>
        <div class="card">
          <b-row no-gutters>
            <b-col md="4">
              <h3 class="mb-4">Semeadura Direta</h3>
              <div class="legend">
                <div class="pattern" />
                <h4>Unidades de Aprendizagem</h4>
                <p>Recuperar vegetação nativa com alta eficácia e baixo custo <b-button>+</b-button></p>
              </div>
              <hr>
              <div class="legend">
                <div class="pattern" />
                <h4>Prestadores de serviço</h4>
                <p>Recuperar vegetação nativa com alta eficácia e baixo custo <b-button>+</b-button></p>
              </div>
              <hr>
              <div class="legend">
                <div class="pattern" />
                <h4>Redes de sementes</h4>
                <p>Recuperar vegetação nativa com alta eficácia e baixo custo <b-button>+</b-button></p>
              </div>
            </b-col>
            <b-col md="6">
              <div id="map-wrap" style="height: 100%">
                <client-only>
                  <l-map :zoom="4" :center="[-17,-55]">
                    <l-tile-layer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
                    <template v-for="learning_unit in site.learning_units">
                      <l-marker v-if="learning_unit.address && learning_unit.address.location && learning_unit.address.location.coordinates" :lat-lng="learning_unit.address.location.coordinates" :key="learning_unit._id">
                        <l-popup>{{ learning_unit.name }}</l-popup>
                      </l-marker>
                    </template>
                  </l-map>
                </client-only>
              </div>
            </b-col>
            <b-col md="2">
              <div class="legend">
                <div class="pattern" />
                <h4>Legenda</h4>
                <p>teste</p>
              </div>
            </b-col>
          </b-row>
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
import Divisor from '@/components/site/Divisor'
import mixinPage from '@/mixins/page'
export default {
  components: {
    Divisor
  },
  mixins: [mixinPage],
  data() {
    return {
      page_id: 'home'
    }
  },
  head() {
    return {
      title: this.site.name,
      meta: [{
        hid: 'description',
        name: 'description',
        content: this.site.description
      }]
    }
  }
}
</script>
<style lang="sass" scoped>
  .home-page
    .content
      background-color: #f6a447
      .subtitle
        width: 100%
        max-width: 700px
      .map
        h6
          font-weight: 700
        .card
          border-radius: 15px
          border: none
          .col-md-4
            padding: 50px
            h3
              font-weight: 700
              color: #f6a447
              font-size: 22px
            h4
              font-weight: 700
              font-size: 18px
            .legend
              p
                font-size: 12px
                .btn
                  background-color: #f6a447
                  padding: 1px 3px
                  border: none
                  color: #384e3f
                  line-height: 10px
                  font-size: 10px
                  margin-left: 6px
              .pattern
                width: 15px
                height: 25px
                background-color: #384e3f
                position: absolute
                left: 0
            // padding: 30px
        .col-md-2
          padding: 30px
          h4
            margin-top: 30px
            font-weight: 700
            font-size: 16px
          .legend
            p
              font-size: 12px
              .btn
                background-color: #f6a447
                padding: 1px 3px
                border: none
                color: #384e3f
                line-height: 10px
                font-size: 10px
                margin-left: 6px
            .pattern
              width: 15px
              height: 25px
              background-color: #384e3f
              position: absolute
              left: 0

</style>
