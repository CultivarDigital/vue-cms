<template>
  <b-container class="posts-component pt-4">
    <h3 class="text-center mb-4 mt-4">NOTÍCIAS</h3>
    <b-row>
      <b-col v-for="(post, index) in posts" :key="post._id" md="4">
        <transition name="slide-fade">
          <nuxt-link v-if="index >= (page * 3) && index < ((page * 3) + 3)" :to="'/noticias/' + post.slug" tag="div" class="card">
            <div class="img">
              <b-img :src="post.picture ? post.picture.url : null" :alt="post.name" class="card-img-top" />
            </div>
            <div class="card-body">
              <div class="card-title">
                <h3>{{ post.title }}</h3>
              </div>
              <div class="card-text">
                {{ (post.description || stripHtml(post.content)) | truncate(1000) }}
              </div>
            </div>
          </nuxt-link>
        </transition>
      </b-col>
    </b-row>
    <arrows-left @click="prev()" />
    <arrows-right @click="next()" />
  </b-container>
</template>

<script>
import ArrowsLeft from '@/components/site/ArrowsLeft'
import ArrowsRight from '@/components/site/ArrowsRight'
export default {
  components: {
    ArrowsLeft,
    ArrowsRight
  },
  props: {
    posts: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      page: 0
    }
  },
  methods: {
    stripHtml: (html) => {
      return html ? html.replace(/<\/?[^>]+(>|$)/g, '') : ''
    },
    prev () {
      if (this.page > 0) {
        this.page -= 1
      } else {
        this.page = this.posts.length / 4
      }
      this.$scrollTo('.posts')
    },
    next () {
      if (this.page < this.posts.length / 4) {
        this.page += 1
      } else {
        this.page = 0
      }
      this.$scrollTo('.posts')
    }
  }

}
</script>
<style lang="sass">
  .posts-component
    .row
      margin-left: -5px
      margin-right: -5px
      .col-lg-3, .col-sm-6
        padding-left: 5px
        padding-right: 5px
    .card
      border: none
      color: #2A114B
      background-color: #edd5b5
      margin-bottom: 15px
      border-radius: 15px
      .img
        max-height: 16vw
        overflow-y: hidden
        @media (max-width: 992px)
          max-height: 14vw
        @media (max-width: 768px)
          max-height: none
      .card-img
        border-top-left-radius: 15px
        border-top-right-radius: 15px
      .card-title
        height: 48px
        background-color: #2A114B
        padding: 10px 20px
        margin: -20px
        margin-bottom: 20px
        h3
          font-size: 24px
          height: 24px
          overflow-y: hidden
      .card-text
        height: 60px
        overflow-y: hidden
        font-size: 14px
        font-family: 'Titillium Web', sans-serif
  .slide-fade-enter-active
    transition: all .3s ease
  .slide-fade-leave-active
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
  .slide-fade-enter, .slide-fade-leave-to
    transform: translateX(100%)
    opacity: 0
</style>
