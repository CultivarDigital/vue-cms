<template>
  <div class="posts-large-component pt-4">
    <div v-for="post in posts" :key="post._id" md="4">
      <nuxt-link :to="'/noticias/' + post.slug" tag="div" class="card">
        <div class="img">
          <b-img :src="post.picture ? post.picture.average : null" :alt="post.title" class="card-img-top" />
        </div>
        <div class="card-body">
          <div class="card-title">
            <h3>{{ post.title }}</h3>
          </div>
          <div class="card-text">
            <p>{{ (post.description || stripHtml(post.content)) | truncate(1000) }}</p>
            <br>
            <tags :tags="post.tags" :to="'/noticias/' + post.slug" />
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Tags from '@/components/site/Tags'
export default {
  components: {
    Tags
  },
  props: {
    posts: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    stripHtml: (html) => {
      return html ? html.replace(/<\/?[^>]+(>|$)/g, '') : ''
    },
    filter(tag) {
      this.$router.push(this.$route.path + '?tag=' + tag.slug)
    }
  }
}
</script>
<style lang="sass">
  .posts-large-component
    .card
      border: none
      color: #722b1d
      background-color: #f5e7c5
      margin-bottom: 15px
      border-radius: 15px
      .img
        overflow-y: hidden
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
          color: #fff
          font-size: 24px
          height: 24px
          overflow-y: hidden
      .card-text
        font-size: 14px
        font-family: 'Titillium Web', sans-serif
        .tags-component
          .btn
            background-color: #722b1d
            border-color: #722b1d
            color: #f5e7c5
            width: auto
            margin: 5px 5px 0 0

</style>
