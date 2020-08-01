<template>
  <div v-if="page" class="about-page">
    <b-carousel :interval="7000" :indicators="page.pictures.length > 1">
      <b-carousel-slide v-for="(picture, index) in page.pictures" :key="index" :caption="picture.title" :img-src="picture.url" />
    </b-carousel>
    <div class="page-title">
      <b-container>
        <h3>Quem somos</h3>
      </b-container>
    </div>
    <section class="content pb-5">
      <b-container>
        <img src="~assets/img/pattern-left.png" class="pattern-left">
        <h1 v-if="page.title" class="title">{{ page.title }}</h1>
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
    background-color: #ECDAB2
    .carousel-item
      max-height: 38vw
    .page-title
      background-color: #2A114B
      color: #fff
      padding: 5px 20px
      h3
        font-size: 28px
        margin: 0
    .content
      background: transparent url('~assets/img/pattern2.png')
      background-position-x: center
      position: relative
      background-size: 1300px
      color: #2A114B
      .title
        font-family: 'Amatic SC', cursive
        font-weight: 700
        font-size: 46px
        margin-top: 40px
      .pattern-left
        width: 100px
        margin-left: -120px
        margin-bottom: -159px
</style>
