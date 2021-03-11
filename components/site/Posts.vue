<template>
  <div class="posts-component pt-4">
    <b-row>
      <b-col v-for="post in posts" :key="post._id" lg="6" class="mb-2">
        <b-card :img-src="post.picture ? post.picture.thumb : null" :img-alt="post.title" img-left>
          <b-card-text>
            <h5>{{ post.title }}</h5>
            <p class="text-secondary">{{ (post.description || post.content) | truncate(60) }}</p>
            <tags :tags="post.tags" @clicked="filterbyTag" />
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
