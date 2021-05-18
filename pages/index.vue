<template>
  <div>
    <div v-if="settings" class="home-page">
      <div v-if="settings.pictures && settings.pictures.length">
        <b-carousel :interval="7000" :indicators="settings.pictures.length > 1" class="home-banners">
          <template v-for="(item, index) in settings.pictures">
            <b-carousel-slide v-if="item" :key="index" :img-src="item.url" :img-alt="item.title">
              <h3 class="title">{{ item.title }}</h3>
              <h2 v-if="item.description" class="title">{{ (item.description) | truncate(250) }}</h2>
              <b-btn variant="primary" class="mt-md-4 btn-home">CONHEÇA AS SEMENTES</b-btn>
              <div class="divisor">
                <img src="~/assets/img/paisagem-cinza.png" class="w-100">
              </div>
            </b-carousel-slide>
          </template>
        </b-carousel>
      </div>
      <section class="content bg-default pb-0">
        <b-container fluid="lg">
          <div class="text-center px-5">
            <img src="~/assets/img/logo-laranja.svg" alt="Sobre">
            <div class="title mt-3">
              <h4 class="title">Sobre</h4>
              <hr>
            </div>
            <h5 class="text-center">Promovemos trocas de saberes sobre uso e recuperação das florestas e cerrados do Mato Grosso</h5>
            <b-button to="/sobre" variant="primary" class="mt-3 btn-home">
              Saiba mais
            </b-button>
          </div>
          <b-row class="mt-5">
            <b-col md="6" class="mb-3">
              <b-card img-src="~/assets/img/noticias.png" img-alt="Notícias" img-left class="bg-white">
                <b-card-text>
                  <h5>Notícias</h5>
                  <div class="text-secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                  <n-link to="/noticias" class="stretched-link hidden" />
                </b-card-text>
              </b-card>
            </b-col>
            <b-col>
              <b-card to img-src="~/assets/img/acervo.png" img-alt="Acervo" img-left class="bg-white">
                <b-card-text>
                  <h5>Acervo</h5>
                  <div class="text-secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</div>
                  <n-link to="/biblioteca" class="stretched-link hidden" />
                </b-card-text>
              </b-card>
            </b-col>
          </b-row>
        </b-container>
        <div class="divisor mt-5">
          <img src="~/assets/img/paisagem-marrom.svg" class="w-100">
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    settings () {
      return this.$store.state.settings
    }
  }
}
</script>
