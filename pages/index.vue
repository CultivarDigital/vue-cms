<template>
  <div>
    <div v-if="site" class="home-page">
      <div v-if="site.pictures && site.pictures.length">
        <b-carousel :interval="7000" :indicators="site.pictures.length > 1" class="home-banners">
          <template v-for="(item, index) in site.pictures">
            <b-carousel-slide v-if="item" :key="index" :img-src="item.url" :img-alt="item.title">
              <h3>{{ item.title }}</h3>
              <h2 v-if="item.description">{{ (item.description) | truncate(250) }}</h2>
              <b-btn variant="primary" class="mt-md-4">CONHEÇA AS SEMENTES</b-btn>
              <div class="divisor">
                <img src="~/assets/img/paisagem-cinza.png" class="w-100">
              </div>
            </b-carousel-slide>
          </template>
        </b-carousel>
      </div>
      <section class="content bg-default">
        <b-container fluid="lg">
          <div class="text-center px-5">
            <img src="~/assets/img/logo-laranja.svg" alt="Sobre">
            <div class="title mt-3">
              <h4>Sobre</h4>
              <hr>
            </div>
            <h6 class="text-center">Promovemos trocas de saberes sobre uso e recuperação das florestas e cerrados do Mato Grosso</h6>
            <b-button variant="primary" class="mt-3">
              Saiba mais
            </b-button>
          </div>
          <b-row class="mt-5">
            <b-col>
              <b-card img-src="~/assets/img/noticias.png" img-alt="Notícias" img-left>
                <b-card-text>
                  <h5>Notícias</h5>
                  <p class="text-secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </b-card-text>
              </b-card>
            </b-col>
            <b-col>
              <b-card img-src="~/assets/img/noticias.png" img-alt="Acervo" img-left>
                <b-card-text>
                  <h5>Acervo</h5>
                  <p class="text-secondary">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </b-card-text>
              </b-card>
            </b-col>
          </b-row>
        </b-container>
      </section>
    </div>
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
