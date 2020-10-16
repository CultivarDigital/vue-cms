<template>
  <div v-if="women_group" class="women-group-page">
    <section class="content pb-5">
      <div class="page-header">
        <b-container>
          <b-breadcrumb :items="breadcrumb" />
        </b-container>
      </div>
      <b-container>
        <h1 class="title pt-5">{{ women_group.name }}</h1>
        <p v-if="women_group.description">{{ women_group.description }}</p>
        <b-row>
          <b-col md="9">
            <div class="quill-content mt-4">
              <banners :items="women_group.pictures" />
              <div>
                <b-tabs content-class="mt-3" card pills>
                  <b-tab title="Informações gerais" active>
                    <div v-if="women_group.content" v-html="women_group.content" />
                    <div v-if="women_group.contact" class="pre-line" v-html="women_group.contact" />
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
            <div v-if="women_group.address && women_group.address.location && women_group.address.location.coordinates" class="mt-3">
              <h3>Localização</h3>
              <div>
                <ItemMap type="women_groups" :address="women_group.address" />
                <p class="text-center">
                  {{ [women_group.address.city, women_group.address.uf].filter(i => i).join(' - ') }}
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
      page_id: 'women_groups',
      page_title: this.women_group ? this.women_group.name + ' - Grupos de mulheres' : null,
      page_description: this.women_group ? this.women_group.description : null,
      page_image: (this.women_group && this.women_group.pictures && this.women_group.pictures.length > 0 ? this.women_group.pictures[0].url : null)
    }
  },
  computed: {
    breadcrumb () {
      return [
        { text: 'Mapa', to: '/mapa' },
        { text: 'Grupos de mulheres', to: '/grupos-de-mulheres' },
        { text: this.women_group ? this.women_group.name : '', active: true }
      ]
    },
    women_group () {
      return this.site.women_groups.find(womenGroup => womenGroup.slug === this.$route.params.id)
    }
  },
  methods: {
    filled(fields) {
      return fields.find(field => this.women_group[field])
    }
  }
}
</script>
<style lang="sass">
  .women-group-page
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
