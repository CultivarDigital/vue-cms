<template>
  <div v-if="page" class="prestadores-de-servico-page">
    <banners :items="page.pictures" />
    <section class="content pb-5">
      <b-container>
        <h1 v-if="page.title" class="title pt-5">{{ page.title }}</h1>
        <p v-if="page.description">{{ page.description }}</p>
        <div v-if="page.content" class="quill-content mt-4" v-html="page.content" />
        <div>
          <ServiceProviders :service-providers="service_providers" />
          <h3 v-if="service_providers.length === 0" class="text-center">Nenhum prestador de serviço encontrada</h3>
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
import mixinPage from '@/mixins/page'
import ServiceProviders from '@/components/site/ServiceProviders'
import Banners from '@/components/site/Banners'
export default {
  components: {
    ServiceProviders,
    Banners
  },
  mixins: [mixinGlobal, mixinPage],
  data () {
    return {
      page_id: 'service_providers'
    }
  },
  computed: {
    service_providers () {
      let learningUnits = this.site.service_providers
      if (this.$route.query.tag) {
        learningUnits = learningUnits.filter(learningUnit => {
          return learningUnit.tags.find(tag => tag.slug === this.$route.query.tag)
        })
      }
      return learningUnits
    }
  },
  head () {
    return {
      title: 'Prestadores de serviço - ' + this.site.name,
      meta: [
        { hid: 'description', name: 'description', content: this.page.description || this.site.description }
      ]
    }
  }
}
</script>
