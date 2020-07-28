<template>
  <div v-if="page" class="about-page">
    <b-carousel :interval="60000" :indicators="page.pictures.length > 1">
      <b-carousel-slide v-for="(picture, index) in page.pictures" :key="index" :caption="picture.title" :img-src="picture.url" />
    </b-carousel>
    <div class="page-title">
      <b-container>
        <h3>Quem somos</h3>
      </b-container>
    </div>
    <section class="content">
      <b-container v-html="page.content" />
    </section>
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
import mixinPage from '@/mixins/page'
export default {
  mixins: [mixinGlobal, mixinPage],
  data () {
    return {
      page_id: 'about'
    }
  },
  head () {
    return {
      title: this.site.name + ' - Quem somos',
      meta: [
        { hid: 'description', name: 'description', content: this.site.description }
      ]
    }
  }
}
</script>
<style lang="sass" scoped>
  .about-page
    background-color: #ECDAB2
    .page-title
      background-color: #2A114B
      color: #fff
      padding: 5px 20px
      h3
        font-size: 28px
        margin: 0
    .content
      background: transparent url('~assets/img/pattern1.svg')
      background-position-x: center
      position: relative
      img
        max-width: 100%
</style>
