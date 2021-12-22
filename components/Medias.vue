<template>
  <div class="medias-component">
    <div>
      <ul class="list-unstyled">
        <b-media v-for="media in medias" :key="media._id" tag="li" class="border-top py-3">
          <template #aside>
            <b-img v-if="media.image || media.oembed_thumb" :src="media.image ? media.image.thumb : media.oembed_thumb" :alt="media.title" />
            <b-img v-else blank blank-color="#abc" width="64" alt="placeholder" />
          </template>
          <h5 class="mt-0 mb-1">
            <n-link :to="'/biblioteca/' + media._id">{{ media.title }}</n-link>
          </h5>
          <p class="mb-0">
            {{ media.description | truncate(100) }}
          </p>
        </b-media>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    medias: {
      type: Array,
      default: () => []
    }
  }
}
</script>
