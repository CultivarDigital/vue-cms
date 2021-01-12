<template>
  <div>
    <div v-if="site" class="home-page bg-primary">
      <banners :items="site.pictures" />
      <section class="content">
        <b-container fluid="lg">
          <h2 class="pt-5 mb-4 text-center title">{{ site.name }}</h2>
          <h6 class="mb-5 text-center subtitle">{{ site.description }}</h6>
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
