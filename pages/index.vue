<template>
  <div v-if="site" class="home-page">
    <b-carousel :interval="7000" :indicators="site.pictures.length > 1">
      <b-carousel-slide v-for="(picture, index) in site.pictures" :key="index" :caption="picture.title" :img-src="picture.url" />
      <arrows />
    </b-carousel>
    <div class="divisor" />
    <section class="content pb-4">
      <h3 class="text-center mb-4">LINHAS DE AÇÃO</h3>
      <categories :categories="site.categories" />
      <posts :posts="site.posts" />
      <b-container class="pt-4 pb-4 text-center">
        <!-- <tags :tags="site.tags" to="/projetos" /> -->
      </b-container>
    </section>
  </div>
</template>

<script>
import Arrows from '@/components/site/Arrows'
import Categories from '@/components/site/Categories'
import Posts from '@/components/site/Posts'
// import Tags from '@/components/site/Tags'
import mixinPage from '@/mixins/page'
export default {
  components: {
    Arrows,
    Categories,
    Posts
    // Tags
  },
  mixins: [mixinPage],
  data () {
    return {
      page_id: 'home'
    }
  },
  methods: {
    openTag (tag) {
      this.$router.push('/projetos?tag=' + tag.slug)
    }
  },
  head () {
    return {
      title: this.site.name,
      meta: [
        { hid: 'description', name: 'description', content: this.site.description }
      ]
    }
  }
}
</script>
<style lang="sass" scoped>
  .home-page
    .divisor
      background: transparent url('~assets/img/degrade.png')
      height: 240px
      width: 100%
      margin-top: -240px
      position: relative
    .content
      background: transparent url('~assets/img/pattern1.png')
      background-position-x: center
      margin-top: -60px
      padding-top: 60px
      position: relative
</style>
