<template>
  <div v-if="page" class="about-page">
    <div v-if="page.pictures.length">
      <divisor variant="white-down" />
      <b-carousel :interval="7000" :indicators="page.pictures.length > 1" class="banners">
        <b-carousel-slide v-for="(picture, index) in page.pictures" :key="index" :img-src="picture.url">
          <h2 v-if="picture.title">{{ picture.title }}</h2>
        </b-carousel-slide>
      </b-carousel>
      <divisor variant="orange-up" />
    </div>
    <section class="content pb-5">
      <b-container>
        <h1 v-if="page.title" class="title pt-5">{{ page.title }}</h1>
        <p v-if="page.description">{{ page.description }}</p>
        <div class="quill-content mt-4" v-html="page.content" />
      </b-container>
    </section>
  </div>
</template>

<script>
import mixinPage from '@/mixins/page'
export default {
  mixins: [mixinPage],
  data () {
    return {
      page_id: 'about'
    }
  },
  head () {
    return {
      title: 'Quem somos - ' + this.site.name,
      meta: [
        { hid: 'description', name: 'description', content: this.page.description || this.site.description }
      ]
    }
  }
}
</script>
<style lang="sass" scoped>
  .about-page
    .content
      background-color: #f6a447

</style>
