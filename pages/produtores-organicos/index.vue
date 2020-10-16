<template>
  <div class="produtores-organicos-page">
    <section class="content pb-5">
      <div class="page-header">
        <b-container>
          <b-breadcrumb :items="breadcrumb" />
        </b-container>
      </div>
      <page-info :page="page" />
      <b-container>
        <SeedsNetworks :seeds-networks="seeds_networks" />
      </b-container>
    </section>
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
import mixinPage from '@/mixins/page'
export default {
  mixins: [mixinGlobal, mixinPage],
  data () {
    return {
      page_id: 'seeds_networks',
      page_title: 'Produtores orgânicos',
      breadcrumb: [
        { text: 'Mapa', to: '/mapa' },
        { text: 'Produtores orgânicos', active: true }
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
