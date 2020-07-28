<template>
  <b-container class="posts pt-4">
    <h3 class="text-center mb-4 mt-4">NOTÍCIAS</h3>
    <b-row>
      <b-col v-for="(post, index) in posts" :key="post._id" md="4">
        <transition name="slide-fade">
          <b-card v-if="index >= (page * 3) && index < ((page * 3) + 3)" no-body :img-src="post.picture ? post.picture.url : null" img-alt="Image" img-top>
            <template v-slot:header>
              <h3 class="mb-0">{{ post.title }}</h3>
            </template>
            <b-card-body>
              <b-card-text>
                {{ post.description }}
              </b-card-text>
            </b-card-body>
          </b-card>
        </transition>
      </b-col>
    </b-row>
    <arrows-left @click="prev()" />
    <arrows-right @click="next()" />
  </b-container>
</template>

<script>
import ArrowsLeft from '@/components/ArrowsLeft'
import ArrowsRight from '@/components/ArrowsRight'
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
  .posts
    .row
      margin-left: -5px
      margin-right: -5px
      .col-lg-3, .col-sm-6
        padding-left: 5px
        padding-right: 5px
    .card
      border: none
      color: #1e2048
      background-color: #edd5b5
      margin-bottom: 15px
      border-radius: 15px
      .card-img-top
        border-top-left-radius: 15px
        border-top-right-radius: 15px
      .card-header
        height: 48px
        background-color: #1e2048
        padding: 10px 20px
        h3
          font-size: 24px
          height: 24px
          overflow-y: hidden
      .card-text
        height: 60px
        overflow-y: hidden
        font-size: 13px
        font-family: 'Titillium Web', sans-serif
  .slide-fade-enter-active
    transition: all .3s ease
  .slide-fade-leave-active
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0)
  .slide-fade-enter, .slide-fade-leave-to
    transform: translateX(100%)
    opacity: 0
</style>
