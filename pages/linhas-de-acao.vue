<template>
  <div v-if="page" class="categories-page">
    <b-carousel :interval="7000" :indicators="page.pictures.length > 1">
      <b-carousel-slide v-for="(picture, index) in page.pictures" :key="index" :caption="picture.title" :img-src="picture.url" />
    </b-carousel>
    <div class="page-title">
      <b-container>
        <h3>Linhas de ação</h3>
      </b-container>
    </div>
    <section class="content pb-5">
      <b-container>
        <img src="~assets/img/pattern-left.png" class="pattern-left">
        <h1 v-if="page.title" class="title">{{ page.title }}</h1>
        <p v-if="page.description">{{ page.description }}<br><br></p>
        <div v-if="page.content" class="quill-content mt-4" v-html="page.content" />
      </b-container>
      <categories :categories="site.categories" />
      <b-container class="pt-4 pb-4 text-center">
        <tags :tags="site.tags" />
      </b-container>
    </section>
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
import mixinPage from '@/mixins/page'
import Categories from '@/components/site/Categories'
import Tags from '@/components/site/Tags'
export default {
  components: {
    Categories,
    Tags
  },
  mixins: [mixinGlobal, mixinPage],
  data () {
    return {
      page_id: 'categories'
    }
  },
  head () {
    return {
      title: 'Linhas de ação - ' + this.site.name,
      meta: [
        { hid: 'description', name: 'description', content: this.page.description || this.site.description }
      ]
    }
  }
}
</script>
<style lang="sass">
  .categories-page
    background-color: #ECDAB2
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
      h1
        font-family: 'Amatic SC', cursive
        font-weight: 700
        font-size: 46px
        margin-top: 40px
      .categories-component
        > h3
          font-family: 'Amatic SC', cursive
          font-weight: 700
          font-size: 46px
          margin-top: 40px
          text-align: left
        .card
          background-color: #f5e7c5
      .tags-component
        .btn
          color: #722b1d
          border-color: #f5e7c5
          background-color: #f5e7c5

      .pattern-left
        width: 100px
        margin-left: -120px
        margin-bottom: -159px
      iframe
        width: 100%
        border: none
        min-height: 600px
</style>
