<template>
  <div v-if="site" class="home-page">
    <divisor variant="white-down" />
    <banners :items="site.pictures" />
    <divisor variant="orange-up" />
    <section class="content">
      <b-container class="text-center">
        <b-img src="~assets/img/pilares-de-acao.png" class="subtitle mt-5" />
        <div class="text-center">
          <n-link class="btn btn-primary" to="/sobre">
            Saiba mais
          </n-link>
        </div>
      </b-container>
      <b-container fluid="lg">
        <h6 class="mt-5 mb-4 text-center">Conheça o Mapa de Restauração ecológica da Iniciativa Caminhos da Semente</h6>
        <Map />
        <b-row class="boxes">
          <b-col sm="6">
            <div class="box">
              <n-link to="/noticias">
                <b-img src="~assets/img/noticias.png" />
              </n-link>
              <div class="title">
                <div class="pattern" />
                <h3>Notícias</h3>
              </div>
            </div>
          </b-col>
          <b-col sm="6">
            <div class="box">
              <b-img src="~assets/img/imprensa.png" />
              <div class="title">
                <div class="pattern" />
                <h3>Biblioteca / Em breve</h3>
              </div>
            </div>
          </b-col>
        </b-row>
        <section class="partners text-center card">
          <h3>Coordenação e execução</h3>
          <b-row>
            <b-col md="4" offset-md="4">
              <div class="partner">
                <img src="~assets/img/parceiros/agroicone.png" alt="Coordenação e execução Agroicone">
              </div>
            </b-col>
          </b-row>
          <br>
          <h3>Parceria</h3>
          <b-row>
            <b-col md="2" offset-md="2">
              <div class="partner">
                <img src="~assets/img/parceiros/isa.png" alt="Parceria Instituto Socio Ambiental - ISA">
              </div>
            </b-col>
            <b-col md="2">
              <div class="partner">
                <img src="~assets/img/parceiros/embrapa.png" alt="Parceria Embrapa">
              </div>
            </b-col>
            <b-col md="2">
              <div class="partner">
                <img src="~assets/img/parceiros/wwf.png" alt="Parceria WWF" style="max-height: 10vh">
              </div>
            </b-col>
            <b-col md="2">
              <div class="partner">
                <img src="~assets/img/parceiros/iniciativa-verde.png" alt="Parceria Iniciativa Verde">
              </div>
            </b-col>
            <b-col md="2" offset-md="3">
              <div class="partner">
                <img src="~assets/img/parceiros/sima.png" alt="Parceria SIMA">
              </div>
            </b-col>
            <b-col md="2">
              <div class="partner">
                <img src="~assets/img/parceiros/amaggi.png" alt="Parceria Amaggi">
              </div>
            </b-col>
            <b-col md="2">
              <div class="partner">
                <img src="~assets/img/parceiros/AESTiete.png" alt="Parceria AESTiete">
              </div>
            </b-col>
          </b-row>
          <br>
          <h3>Apoio técnico e financeiro</h3>
          <b-row>
            <b-col md="2" offset-md="4">
              <div class="partner">
                <img src="~assets/img/parceiros/p4f.png" alt="Apoio técnico e financeiro P4F">
              </div>
            </b-col>
            <b-col md="2">
              <div class="partner">
                <img src="~assets/img/parceiros/p4f2.png" alt="Apoio técnico e financeiro P4F">
              </div>
            </b-col>
          </b-row>
          <br>
        </section>
      </b-container>
    </section>
  </div>
</template>

<script>
import Banners from '@/components/site/Banners'
import Map from '@/components/site/Map'
import mixinPage from '@/mixins/page'
export default {
  components: {
    Banners,
    Map
  },
  mixins: [mixinPage],
  data() {
    return {
      page_id: 'home'
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
      .boxes
        margin-top: 50px
        .box
          margin-bottom: 70px
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
          color: #384e3f
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
