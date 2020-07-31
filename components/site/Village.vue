<template>
  <b-modal :id="'modal-' + village._id" size="xl" hide-header ok-title="Fechar" ok-only>
    <b-modal-body class="village-component">
      <b-carousel :interval="60000" :indicators="village.pictures.length > 1" :controls="village.pictures.length > 1">
        <b-carousel-slide v-for="(picture, index) in village.pictures" :key="index" :caption="picture.title" :img-src="picture.url" />
      </b-carousel>
      <h3 class="mt-4 text-center">Aldeia {{ village.name }}</h3>
      <p v-if="village.description">{{ village.description }}</p>
    </b-modal-body>
  </b-modal>
</template>
<script>
export default {
  props: {
    village: {
      type: Object,
      default: null
    }
  },
  methods: {
    defaultPicture(pictures) {
      if (pictures) {
        return pictures.find(picture => picture.default) || pictures[0]
      }
      return {}
    }
  }
}
</script>
<style lang="sass">
  .village-component
    .carousel
      margin: -16px -16px 0 -16px
      .carousel-item
        img
          border-top-left-radius: 3px
          border-top-right-radius: 3px

</style>
