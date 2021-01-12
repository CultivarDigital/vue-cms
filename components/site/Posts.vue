<template>
  <div class="posts-component pt-4">
    <b-row>
      <b-col v-for="post in posts" :key="post._id" lg="6">
        <n-link :to="'/noticias/' + post.slug" tag="div" class="card">
          <div class="img">
            <b-img :src="post.picture ? post.picture.average : null" :alt="post.title" class="card-img-top" />
          </div>
          <div class="card-body">
            <div class="pattern" />
            <div class="card-title">
              <h3>{{ post.title }}</h3>
            </div>
            <div class="card-text">
              <p>{{ (post.description || post.content) | truncate(1000) }}</p>
              <tags :tags="post.tags" />
            </div>
          </div>
        </n-link>
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
  }
}
</script>
