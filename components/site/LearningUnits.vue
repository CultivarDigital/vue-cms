<template>
  <div class="learning-units-component pt-4">
    <div v-for="learning_unit in learningUnits" :key="learning_unit._id" md="4">
      <nuxt-link :to="'/unidades-de-aprendizagem/' + learning_unit.slug" tag="div" class="card">
        <div class="img">
          <b-img :src="learning_unit.picture ? learning_unit.picture.average : null" :alt="learning_unit.title" class="card-img-top" />
        </div>
        <div class="card-body">
          <div class="pattern" />
          <div class="card-title">
            <h3>{{ learning_unit.title }}</h3>
          </div>
          <div class="card-text">
            <p>{{ (learning_unit.description || stripHtml(learning_unit.content)) | truncate(1000) }}</p>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    learningUnits: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    stripHtml: (html) => {
      return html ? html.replace(/<\/?[^>]+(>|$)/g, '') : ''
    },
    filter(tag) {
      this.$router.push(this.$route.path + '?tag=' + tag.slug)
    }
  }
}
</script>
<style lang="sass">
  .learning-units-component
    .card
      cursor: pointer
      border: none
      color: #757575
      background-color: #fff
      margin-bottom: 15px
      border-radius: 15px
      .img
        overflow-y: hidden
      .card-img-top
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
