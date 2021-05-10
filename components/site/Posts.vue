<template>
  <div class="posts-component pt-4">
    <b-row>
      <b-col v-for="post in posts" :key="post._id" lg="6" class="mb-2">
        <b-card :img-src="post.picture ? post.picture.thumb : null" :img-alt="post.title">
          <b-card-text>
            <h5>{{ post.title }}</h5>
            <p class="text-secondary"><b-link :to="'/noticias/' + post.slug" class="stretched-link text-black">{{ (post.description || post.content) | truncate(60) }}</b-link></p>
            <tags :tags="post.tags" @click="filterbyTag" />
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    filterbyTag(tag) {
      this.$router.push('/noticias?tag=' + tag)
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
      height: 100%
      border: none
      color: #2A114B
      background-color: #E1846D
      margin-bottom: 15px
      .img
        max-height: 16vw
        overflow-y: hidden
        @media (max-width: 992px)
          max-height: 14vw
        @media (max-width: 768px)
          max-height: none
</style>
