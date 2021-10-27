<template>
  <div class="medias-component">
    <div>
      <b-card-group columns>
        <b-card v-for="media in medias" :key="media._id" no-body>
          <div v-if="media.image || media.oembed_thumb" class="img">
            <b-img :src="media.image ? media.image.thumb : media.oembed_thumb" :alt="media.title" class="card-img-top" />
          </div>
          <div class="card-body">
            <div class="card-text">
              {{ media.title }}
            </div>
            <n-link :to="'/biblioteca/' + media._id" class="stretched-link hidden" />
          </div>
        </b-card>
      </b-card-group>
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
