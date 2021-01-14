<template>
  <div>
    <div v-if="site" class="home-page bg-default">
      <banners :items="site.pictures" />
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
