<template>
  <div class="medias-component">
    <div>
      <ul class="list-unstyled">
        <b-media v-for="media in medias" :key="media._id" tag="li" class="border-top py-3">
          <template #aside>
            <b-img v-if="media.image || media.oembed_thumb" :src="media.image ? media.image.thumb : media.oembed_thumb" :alt="media.title" />
          </template>
          <b-badge v-if="media.type" class="mb-2">{{ media.type }}</b-badge>
          <p class="mb-0">
            <n-link :to="'/biblioteca/' + media._id"><strong>{{ media.title }}</strong></n-link>
          </p>
          <p class="mb-0">
            <small>{{ media.description | truncate(200) }}</small>
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
