<template>
  <div v-if="page" class="about-page">
    <div v-if="page.pictures.length">
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
    </div>
    <section class="content pb-5">
      <b-container>
        <h1 v-if="page.title" class="title pt-5">{{ page.title }}</h1>
        <p v-if="page.description">{{ page.description }}</p>
        <div class="quill-content mt-4" v-html="page.content" />
      </b-container>
    </section>
  </div>
</template>

<script>
import mixinPage from '@/mixins/page'
export default {
  mixins: [mixinPage],
  data () {
    return {
      page_id: 'about'
    }
  },
  head () {
    return {
      title: 'Quem somos - ' + this.site.name,
      meta: [
        { hid: 'description', name: 'description', content: this.page.description || this.site.description }
      ]
    }
  }
}
</script>
<style lang="sass" scoped>
  .about-page
    .content
      background-color: #f6a447

</style>
