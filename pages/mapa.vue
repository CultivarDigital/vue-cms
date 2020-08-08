<template>
  <div class="mapa-page">
    <banners :items="[{ url: require('~/assets/img/banner_biblioteca.png'), title: 'Mapa da Semeadura Direta' }]" />
    <section class="content pb-5">
      <b-container fluid>
        <br>
        <p class="mt-1 mb-4 text-center">
          Você sabe onde tem projetos de restauração com semeadura direta no Brasil?
          <br>
          <strong>Conheça o Mapa de Restauração ecológica da Iniciativa Caminhos da Semente</strong>
        </p>
        <Map variant="vertical" />
      </b-container>
    </section>
  </div>
</template>
<script>
import mixinPage from '@/mixins/page'
import Map from '@/components/site/Map'
export default {
  components: {
    Map
  },
  mixins: [mixinPage],
  head () {
    return {
      title: 'Mapa da Semeadura Direta - ' + this.site.name,
      meta: [
        { hid: 'description', name: 'description', content: 'Você sabe onde tem projetos de restauração com semeadura direta no Brasil? Conheça o Mapa de Restauração ecológica da Iniciativa Caminhos da Semente' }
      ]
    }
  }
}
</script>
<style lang="sass" scoped>
  .mapa-page
    .content
      background-color: #f6a447
</style>
