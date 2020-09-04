<template>
  <div class="medias-component pt-4">
    <b-row>
      <b-col v-for="media in medias" :key="media._id" lg="6">
        <n-link :to="'/biblioteca/' + media._id" tag="div" class="card">
          <div class="img">
            <div v-if="media.category === 'Filmes/Vídeos' && media.oembed" class="card-img-top" v-html="media.oembed" />
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
<style lang="sass">
  .medias-component
    .card
      cursor: pointer
      border: none
      color: #757575
      background-color: #fff
      margin-bottom: 15px
      border-radius: 15px
      min-height: calc(100% - 15px)
      .img
        overflow-y: hidden
        max-height: 30vw
        @media (max-width: 768px)
          max-height: 100%
      .card-img-top
        border-top-left-radius: 15px
        border-top-right-radius: 15px
        iframe
          border-top-left-radius: 15px
          border-top-right-radius: 15px
      .card-body
        padding: 50px
        .pattern
          width: 15px
          height: 25px
          background-color: #384e3f
          position: absolute
          left: 0
        .card-title
          padding: 10px 20px
          margin: -20px
          margin-bottom: 20px
          h3
            color: #394e3f
            font-size: 24px
            font-weight: 700
        .card-text
          font-size: 14px
          font-family: 'Titillium Web', sans-serif
          .tags-component
            .btn
              background-color: #384e3f
              border-color: #384e3f
              color: #fff
              width: auto
              margin: 5px 5px 0 0
              text-transform: none

</style>
