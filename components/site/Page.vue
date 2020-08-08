<template>
  <div v-if="page" class="default-page">
    <banners :items="page.pictures" />
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
import Banners from '@/components/site/Banners'
import mixinPage from '@/mixins/page'
export default {
  components: {
    Banners
  },
  mixins: [mixinPage],
  props: {
    id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      page_id: this.id
    }
  },
  head () {
    return {
      title: this.page.title + ' - ' + this.site.name,
      meta: [
        { hid: 'description', name: 'description', content: this.page.description || this.site.description }
      ]
    }
  }
}
</script>
