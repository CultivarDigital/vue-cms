<template>
  <div v-if="page" class="redes-de-semente-page">
    <banners :items="page.pictures" />
    <section class="content pb-5">
      <div class="page-header">
        <b-container>
          <b-breadcrumb :items="breadcrumb" />
        </b-container>
      </div>
      <b-container>
        <h1 v-if="page.title" class="title pt-5">{{ page.title }}</h1>
        <p v-if="page.description">{{ page.description }}</p>
        <div v-if="page.content" class="quill-content mt-4" v-html="page.content" />
        <div>
          <SeedsNetworks :seeds-networks="seeds_networks" />
          <p v-if="seeds_networks.length === 0" class="text-center">Nenhuma rede de sementes encontrada</p>
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
import mixinPage from '@/mixins/page'
import SeedsNetworks from '@/components/site/SeedsNetworks'
import Banners from '@/components/site/Banners'
export default {
  components: {
    SeedsNetworks,
    Banners
  },
  mixins: [mixinGlobal, mixinPage],
  data () {
    return {
      page_id: 'seeds_networks',
      breadcrumb: [
        { text: 'Mapa', to: '/mapa' },
        { text: 'Redes de sementes', active: true }
      ]
    }
  },
  computed: {
    seeds_networks () {
      let seedsNetworks = this.site.seeds_networks
      if (this.$route.query.tag) {
        seedsNetworks = seedsNetworks.filter(seedsNetwork => {
          return seedsNetwork.tags.find(tag => tag.slug === this.$route.query.tag)
        })
      }
      return seedsNetworks
    }
  }
}
</script>
