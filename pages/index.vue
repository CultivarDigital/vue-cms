<template>
  <div>
    <div v-if="site" class="home-page">
      <div v-if="site.pictures && site.pictures.length">
        <b-carousel :interval="7000" :indicators="site.pictures.length > 1" class="home-banners">
          <template v-for="(item, index) in site.pictures">
            <b-carousel-slide v-if="item" :key="index" :img-src="item.url" :img-alt="item.title">
              <h3>{{ item.title }}</h3>
              <h2 v-if="item.description">{{ (item.description) | truncate(250) }}</h2>
              <b-btn variant="primary" class="mt-4">CONHEÇA AS SEMENTES</b-btn>
            </b-carousel-slide>
          </template>
        </b-carousel>
      </div>

      <section class="content">
        <b-container fluid="lg">
          <h6 class="text-center">Página inicial do site</h6>
          <h2 v-if="site.name" class="text-center title">{{ site.name }}</h2>
          <h6 v-if="site.description" class="text-center subtitle">{{ site.description }}</h6>
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
