<template>
  <div class="medias-component">
    <div>
      <b-card-group columns>
        <b-card v-for="media in medias" :key="media._id" no-body>
          <div class="img">
            <div v-if="media.category === 'Vídeos' && media.oembed" class="card-img-top" v-html="media.oembed" />
            <b-img v-else :src="media.picture ? media.picture.thumb : null" :alt="media.title" class="card-img-top" />
          </div>
          <div class="card-body">
            <div class="card-text">
              <h5>{{ media.title }}</h5>
              <p class="text-secondary">{{ media.description | truncate(200) }}</p>
              <div>
                <b-button v-for="tag in media.tags" :key="tag._id" :to="'/biblioteca?tag=' + tag" size="sm" class="mb-1 mr-1">
                  {{ tag }}
                </b-button>
              </div>
            </div>
            <n-link :to="'/biblioteca/' + media._id" class="stretched-link hidden" />
          </div>
        </b-card>
      </b-card-group>
      </b-row>
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
