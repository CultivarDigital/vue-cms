<template>
  <div class="posts-component pt-4">
    <b-row>
      <b-col v-for="post in posts" :key="post._id" lg="4" md="6" class="mb-4">
        <b-card :img-src="post.picture ? post.picture.thumb : null" :img-alt="post.title">
          <b-card-text>
            <h5 class="mb-0">
              <b-link :to="'/noticias/' + post.slug" class="stretched-link">{{ post.title }}</b-link>
            </h5>
            <p v-if="post.description" class="mt-2 mb-0">{{ post.description | truncate(60) }}</p>
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
