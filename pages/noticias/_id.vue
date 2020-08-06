<template>
  <div v-if="post" class="post-page">
    <b-carousel>
      <b-carousel-slide :key="index" :caption="post.picture.title" :img-src="post.picture.url" />
    </b-carousel>
    <div class="page-title">
      <b-container>
        <h3>Notícia</h3>
      </b-container>
    </div>
    <section class="content pb-5">
      <b-container>
        <h1 class="title">{{ post.name }}</h1>
        <p v-if="post.description">{{ post.description }}</p>
        <b-row>
          <b-col md="9">
            <div class="quill-content mt-4">
              <div v-if="post.content" v-html="post.content" />
            </div>
          </b-col>
          <b-col md="3">
            <h3 class="mt-3">Tags</h3>
            <tags :tags="post.tags.length > 0 ? post.tags : site.tags" to="/projetos" />
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
import mixinPage from '@/mixins/page'
import Tags from '@/components/site/Tags'
export default {
  components: {
    Tags
  },
  mixins: [mixinGlobal, mixinPage],
  data () {
    return {
      page_id: 'posts'
    }
  },
  computed: {
    post () {
      return this.site.posts.find(post => post.slug === this.$route.params.id)
    }
  },
  methods: {
    categories (post) {
      return this.site.categories.filter(category => post.categories.includes(category._id))
    }
  },
  head () {
    return {
      title: (this.currentCategory ? this.currentCategory.name + ' - ' : 'Linhas de ação - ') + 'Projetos - ' + this.site.name,
      meta: [
        { hid: 'description', name: 'description', content: this.post.description || this.site.description }
      ]
    }
  }
}
</script>
<style lang="sass">
  .post-page
    background-color: #ECDAB2
    a:hover
      text-decoration: none
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
