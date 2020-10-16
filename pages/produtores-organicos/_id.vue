<template>
  <div v-if="seeds_network" class="seeds-network-page">
    <section class="content pb-5">
      <div class="page-header">
        <b-container>
          <b-breadcrumb :items="breadcrumb" />
        </b-container>
      </div>
      <b-container>
        <h1 class="title pt-5">{{ seeds_network.name }}</h1>
        <p v-if="seeds_network.description">{{ seeds_network.description }}</p>
        <b-row>
          <b-col md="9">
            <div class="quill-content mt-4">
              <banners :items="seeds_network.pictures" />
              <div>
                <b-tabs content-class="mt-3" card pills>
                  <b-tab title="Informações gerais" active>
                    <div v-if="seeds_network.notes" v-html="seeds_network.notes" />
                    <p v-if="seeds_network.headquarters"> <strong>Sede:</strong> {{ seeds_network.headquarters }}</p>
                    <p v-if="seeds_network.phones && seeds_network.phones.length"> <strong>Telefone:</strong> {{ seeds_network.phones.join(', ') }}</p>
                    <p v-if="seeds_network.email"> <strong>Email:</strong> {{ seeds_network.email }}</p>
                    <p v-if="seeds_network.site_url"> <strong>Site:</strong> <a :href="seeds_network.site_url" target="_blank">{{ seeds_network.site_url }}</a></p>
                    <br>
                    <div class="text-center">
                      <n-link to="/mapa" class="btn btn-primary">
                        Voltar ao mapa
                      </n-link>
                    </div>
                    <share />
                  </b-tab>
                </b-tabs>
              </div>
            </div>
          </b-col>
          <b-col md="3">
            <div v-if="seeds_network.address && seeds_network.address.location && seeds_network.address.location.coordinates" class="mt-3">
              <h3>Localização</h3>
              <div>
                <ItemMap type="seeds_networks" :address="seeds_network.address" />
                <p class="text-center">
                  {{ [seeds_network.address.city, seeds_network.address.uf].filter(i => i).join(' - ') }}
                </p>
              </div>
            </div>
          </b-col>
        </b-row>
      </b-container>
    </section>
  </div>
</template>

<script>
import mixinGlobal from '@/mixins/global'
import mixinPage from '@/mixins/page'
import Banners from '@/components/site/Banners'
import ItemMap from '@/components/site/ItemMap'
export default {
  components: {
    Banners,
    ItemMap
  },
  mixins: [mixinGlobal, mixinPage],
  data() {
    return {
      page_id: 'seeds_networks',
      page_title: this.seeds_network ? this.seeds_network.name + ' - Produtores orgânicos' : null,
      page_description: this.seeds_network ? this.seeds_network.description : null,
      page_image: (this.seeds_network && this.seeds_network.pictures && this.seeds_network.pictures.length > 0 ? this.seeds_network.pictures[0].url : null)
    }
  },
  computed: {
    breadcrumb () {
      return [
        { text: 'Mapa', to: '/mapa' },
        { text: 'Produtores orgânicos', to: '/produtores-organicos' },
        { text: this.seeds_network ? this.seeds_network.name : '', active: true }
      ]
    },
    seeds_network () {
      return this.site.seeds_networks.find(seedsNetwork => seedsNetwork.slug === this.$route.params.id)
    }
  },
  methods: {
    filled(fields) {
      return fields.find(field => this.seeds_network[field])
    }
  }
}
</script>
<style lang="sass">
  .seeds-network-page
    .babdge
      padding: 10px 20px
    .tabs
      margin: -30px -50px 0 -50px
      .card-header
        background-color: #00794e
        border: none
        border-radius: 0
        .nav-pills .nav-link
          color: #fff
          padding: 10px 10px
          font-size: 16px
          &.active
            color: #00794e
            background-color: #fff
      .table
        tr:first-child
          th, td
            border: none
</style>
