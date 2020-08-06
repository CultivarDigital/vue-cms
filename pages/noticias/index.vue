<template>
  <div v-if="page" class="posts-page">
    <b-carousel :interval="7000" :indicators="page.pictures.length > 1">
      <b-carousel-slide v-for="(picture, index) in page.pictures" :key="index" :caption="picture.title" :img-src="picture.url" />
    </b-carousel>
    <div class="page-title">
      <b-container>
        <h3>Notícias</h3>
      </b-container>
    </div>
    <section class="content pb-5">
      <b-container>
        <b-row>
          <b-col md="9">
            <posts-large :posts="posts" />
            <h3 v-if="posts.length === 0" class="text-center">Nenhuma notícia encontrada</h3>
          </b-col>
          <b-col md="3">
            <h3 class="mt-3">Tags</h3>
            <tags :tags="site.tags" :to="$route.path" />
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
import mixinPage from '@/mixins/page'
import PostsLarge from '@/components/site/PostsLarge'
import Tags from '@/components/site/Tags'
export default {
  components: {
    PostsLarge,
    Tags
  },
  mixins: [mixinGlobal, mixinPage],
  data () {
    return {
      page_id: 'posts'
    }
  },
  computed: {
    posts () {
      let posts = this.site.posts
      if (this.$route.query.tag) {
        posts = posts.filter(post => {
          return post.tags.find(tag => tag.slug === this.$route.query.tag)
        })
      }
      return posts
    }
  },
  head () {
    return {
      title: 'Notícias - ' + this.site.name,
      meta: [
        { hid: 'description', name: 'description', content: this.page.description || this.site.description }
      ]
    }
  }
}
</script>
<style lang="sass">
  .posts-page
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
        span
          font-weight: 400
          font-size: 20px
          margin-top: 5px
          float: right
          position: relative
          @media (max-width: 576px)
            display: none
    .content
      background-position-x: center
      position: relative
      background-size: 1300px
      color: #2A114B
      h1
        font-family: 'Amatic SC', cursive
        font-weight: 700
        font-size: 46px
        a
          text-decoration: none
          color: #2A114B
      h3
        color: #2A114B
        font-size: 40px
      .categories
        margin-top: 40px
        margin-bottom: 40px
        text-align: center
        img
          width: 70px
        h3
          font-size: 20px
          color: #2A114B
        .col-lg-4
          @media (min-width: 992px)
            border-right: 2px solid #2A114B
      .posts
        > h3
          font-family: 'Amatic SC', cursive
          font-weight: 700
          font-size: 46px
          margin-top: 40px
          text-align: left
        .card
          background-color: #ECDAB2
      .tags-component
        .btn
          width: 100%
          color: #722b1d
          border-color: #f5e7c5
          background-color: #f5e7c5
          margin: 10px 0
          &:hover, &.active
            color: #f5e7c5
            border-color: #722b1d
            background-color: #722b1d
</style>
