<template>
  <div class="medias-component">
    <b-row>
      <b-col v-for="media in medias" :key="media._id" lg="6">
        <n-link :to="'/biblioteca/' + media._id" tag="div" class="card">
          <div class="img">
            <div v-if="media.category === 'Vídeos' && media.oembed" class="card-img-top" v-html="media.oembed" />
            <b-img v-else :src="media.picture ? media.picture.average : null" :alt="media.title" class="card-img-top" />
          </div>
          <div class="card-body">
            <div class="pattern" />
            <div class="card-title">
              <h3>{{ media.title }}</h3>
            </div>
            <div class="card-text">
              <p>{{ media.description | truncate(200) }}</p>
              <div class="tags-component">
                <b-button v-for="tag in media.tags" :key="tag._id" :to="'/biblioteca?tag=' + tag" size="sm">
                  {{ tag }}
                </b-button>
              </div>
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
    medias: {
      type: Array,
      default: () => []
    }
  }
}
</script>
