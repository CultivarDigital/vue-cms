<template>
  <div v-if="page" class="posts-page">
    <div v-if="page.pictures.length">
      <divisor variant="white-down" />
      <b-carousel :interval="7000" :indicators="page.pictures.length > 1" class="banners">
        <b-carousel-slide v-for="(picture, index) in page.pictures" :key="index" :img-src="picture.url">
          <h2 v-if="picture.title">{{ picture.title }}</h2>
        </b-carousel-slide>
      </b-carousel>
      <divisor variant="orange-up" />
    </div>
    <section class="content pb-5">
      <b-container>
        <h1 v-if="page.title" class="title pt-5">{{ page.title }}</h1>
        <p v-if="page.description">{{ page.description }}</p>
        <div v-if="page.content" class="quill-content mt-4" v-html="page.content" />
        <div>
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
        </div>
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
<style lang="sass" scoped>
  .posts-page
    .content
      background-color: #f6a447
      .map
        h6
          font-weight: 700
        .card
          border-radius: 15px
          border: none
          h3
            font-weight: 700
            color: #f6a447
            font-size: 22px
            text-align: center
          .col
            padding: 50px
            h4
              font-weight: 700
              font-size: 18px
            .legend
              p
                font-size: 12px
                .btn
                  background-color: #f6a447
                  padding: 1px 3px
                  border: none
                  color: #384e3f
                  line-height: 10px
                  font-size: 10px
                  margin-left: 6px
              .pattern
                width: 15px
                height: 25px
                background-color: #384e3f
                position: absolute
                left: 0
            // padding: 30px
        .col-md-2
          padding: 30px
          h4
            margin-top: 30px
            font-weight: 700
            font-size: 16px
          .legend
            p
              font-size: 12px
              .btn
                background-color: #f6a447
                padding: 1px 3px
                border: none
                color: #384e3f
                line-height: 10px
                font-size: 10px
                margin-left: 6px
            .pattern
              width: 15px
              height: 25px
              background-color: #384e3f
              position: absolute
              left: 0
</style>
