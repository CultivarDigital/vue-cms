<template>
  <div v-if="learning_unit" class="learning-unit-page">
    <section class="content pb-5">
      <div class="page-header">
        <b-container>
          <b-breadcrumb :items="breadcrumb" />
        </b-container>
      </div>
      <b-container>
        <h1 class="title pt-5">{{ learning_unit.name }}</h1>
        <p v-if="learning_unit.description">{{ learning_unit.description }}</p>
        <b-row>
          <b-col md="8">
            <div class="quill-content mt-4">
              <banners :items="learning_unit.pictures" />
              <div>
                <div class="tabs">
                  <div class="card-header">
                    <ul class="nav nav-pills card-header-pills">
                      <li class="nav-item">
                        <n-link :to="'/unidades-de-aprendizagem/' + learning_unit.slug" :class="current_item ? 'nav-link' : 'nav-link active'">
                          Informações gerais
                        </n-link>
                      </li>
                      <li v-if="current_item" class="nav-item">
                        <n-link :to="'/unidades-de-aprendizagem/' + learning_unit.slug" class="nav-link active">
                          {{ types[current_item.type] }}
                        </n-link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div v-if="current_item" class="mt-5">
                  <h3>{{ current_item.name }}</h3>
                  <p>{{ $moment(current_item.createdAt).format("DD/MM/YYYY") }}</p>
                  <p v-if="current_item.description">{{ current_item.description }}</p>
                  <h5>{{ types[current_item.description] }}</h5>
                  <br>
                  <div v-if="current_item.type == 'diagnosis'">
                    <div v-if="filled(['biome', 'original_vegetation', 'year_of_deforestation', 'previous_use_type', 'duration_of_previous_use'])">
                      <h5>Histórico de Ocupação</h5>
                      <br>
                      <table class="table">
                        <tbody>
                          <tr v-if="current_item.biome">
                            <td>Bioma</td>
                            <th>{{ current_item.biome }}</th>
                          </tr>
                          <tr v-if="current_item.original_vegetation && current_item.original_vegetation.length > 0">
                            <td>Vegetação original</td>
                            <th>{{ current_item.original_vegetation.join(', ') }}</th>
                          </tr>
                          <tr v-if="current_item.year_of_deforestation && current_item.year_of_deforestation.length > 0">
                            <td>Ano do desmatamento</td>
                            <th>{{ current_item.year_of_deforestation.join(', ') }}</th>
                          </tr>
                          <tr v-if="current_item.previous_use_type && current_item.previous_use_type.length > 0">
                            <td>Tipo de uso anterior</td>
                            <th>{{ current_item.previous_use_type.join(', ') }}</th>
                          </tr>
                          <tr v-if="current_item.duration_of_previous_use && current_item.duration_of_previous_use.length > 0">
                            <td>Duração do uso anterior (último uso)</td>
                            <th>{{ current_item.duration_of_previous_use.join(', ') }}</th>
                          </tr>
                        </tbody>
                      </table>
                      <br>
                    </div>
                    <div v-if="filled(['soil_type', 'soil_moisture', 'declivity', 'soil_compaction', 'soil_conservation'])">
                      <h5>Análise da área</h5>
                      <br>
                      <table class="table">
                        <tbody>
                          <tr v-if="current_item.soil_type && current_item.soil_type.length > 0">
                            <td>Tipo de Solo</td>
                            <th>{{ current_item.soil_type.join(', ') }}</th>
                          </tr>
                          <tr v-if="current_item.soil_moisture && current_item.soil_moisture.length > 0">
                            <td>Umidade do Solo</td>
                            <th>{{ current_item.soil_moisture.join(', ') }}</th>
                          </tr>
                          <tr v-if="current_item.declivity && current_item.declivity.length > 0">
                            <td>Declividade (a mais acentuada dentro da área do plantio)</td>
                            <th>{{ current_item.declivity.join(', ') }}</th>
                          </tr>
                          <tr v-if="current_item.soil_compaction && current_item.soil_compaction.length > 0">
                            <td>Compactação do solo</td>
                            <th>{{ current_item.soil_compaction.join(', ') }}</th>
                          </tr>
                          <tr v-if="current_item.soil_conservation">
                            <td>Conservação do solo</td>
                            <th v-if="current_item.soil_conservation.includes('Outros')">{{ current_item.soil_conservation.map(item => (item == 'Outros' ? current_item.soil_conservation_other : item)).join(',') }}</th>
                            <th v-else>{{ current_item.soil_conservation.join(', ') }}</th>
                          </tr>
                        </tbody>
                      </table>
                      <br>
                    </div>
                    <div v-if="filled(['nearest_forest', 'nearest_forest_vegetation', 'fragment_size', 'natural_regeneration'])">
                      <h5>Análise da paisagem</h5>
                      <br>
                      <table class="table">
                        <tbody>
                          <tr v-if="current_item.nearest_forest">
                            <td>Mata nativa mais próxima (km)</td>
                            <th>{{ current_item.nearest_forest }}</th>
                          </tr>
                          <tr v-if="current_item.nearest_forest_vegetation && current_item.nearest_forest_vegetation.length > 0">
                            <td>Vegetação da mata mais próxima</td>
                            <th>{{ current_item.nearest_forest_vegetation.join(', ') }}</th>
                          </tr>
                          <tr v-if="current_item.fragment_size && current_item.fragment_size.length > 0">
                            <td>Tamanho do fragmento</td>
                            <th>{{ current_item.fragment_size.join(', ') }}</th>
                          </tr>
                          <tr v-if="current_item.natural_regeneration && current_item.natural_regeneration.length > 0">
                            <td>Regeneração Natural da área do plantio</td>
                            <th>{{ current_item.natural_regeneration.join(', ') }}</th>
                          </tr>
                        </tbody>
                      </table>
                      <br>
                    </div>
                    <div v-if="filled(['presence_of_other_animals', 'firing_frequency', 'last_fire'])">
                      <h5>Fatores de pertubação</h5>
                      <br>
                      <table class="table">
                        <tbody>
                          <tr v-if="current_item.presence_of_other_animals">
                            <td>Presença de gado e/ou outros animais</td>
                            <th>{{ current_item.presence_of_other_animals }}</th>
                          </tr>
                          <tr v-if="current_item.firing_frequency && current_item.firing_frequency.length > 0">
                            <td>Frequência de queimadas</td>
                            <th v-if="current_item.firing_frequency.includes('Outros')">{{ current_item.firing_frequency.map(item => (item == 'Outros' ? current_item.firing_frequency_other : item)).join(',') }}</th>
                            <th v-else>{{ current_item.firing_frequency.join(', ') }}</th>
                          </tr>
                          <tr v-if="current_item.last_fire && current_item.last_fire.length > 0">
                            <td>Data do último fogo</td>
                            <th>{{ current_item.last_fire.join(', ') }}</th>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div v-if="current_item.type == 'preparation'">
                    <table class="table">
                      <tbody>
                        <tr v-if="current_item.herbicide_use">
                          <td>Uso de herbicida</td>
                          <th>{{ current_item.herbicide_use }}</th>
                        </tr>
                        <tr v-if="current_item.herbicide_use === 'Sim'">
                          <td>Qual herbicida?</td>
                          <th>{{ current_item.herbicide }}</th>
                        </tr>
                        <tr v-if="current_item.herbicide_use === 'Sim'">
                          <td>Qual frequência da aplicação de herbicida?</td>
                          <th>{{ current_item.herbicide_frequency }}</th>
                        </tr>
                        <tr v-if="current_item.overgrazing">
                          <td>Sobrepastejo</td>
                          <th>{{ current_item.overgrazing }}</th>
                        </tr>
                        <tr v-if="current_item.overgrazing === 'Sim'">
                          <td>Quantas cabeças e por quanto tempo?</td>
                          <th>{{ current_item.overgrazing_frequency }}</th>
                        </tr>
                        <tr v-if="current_item.soil_preparation && current_item.soil_preparation.length > 0">
                          <td>Preparo do solo mecanizado ou manual?</td>
                          <th>{{ current_item.soil_preparation.join(', ') }}</th>
                        </tr>
                        <tr v-if="current_item.screenings_number">
                          <td>Número de gradagens</td>
                          <th>{{ current_item.screenings_number }}</th>
                        </tr>
                        <tr v-if="current_item.levels_number">
                          <td>Número de nivelamentos</td>
                          <th>{{ current_item.levels_number }}</th>
                        </tr>
                        <tr v-if="current_item.screenings_frequency">
                          <td>Frequência das gradagens</td>
                          <th>{{ current_item.screenings_frequency }}</th>
                        </tr>
                        <tr v-if="current_item.semi_mechanized_mowing_number">
                          <td>Número de roçadas semi-mecanizadas</td>
                          <th>{{ current_item.semi_mechanized_mowing_number }}</th>
                        </tr>
                        <tr v-if="current_item.manual_mowing_number">
                          <td>Número de roçadas manuais</td>
                          <th>{{ current_item.manual_mowing_number }}</th>
                        </tr>
                        <tr v-if="current_item.mowing_frequency">
                          <td>Frequência das roçadas</td>
                          <th>{{ current_item.mowing_frequency }}</th>
                        </tr>
                        <tr v-if="current_item.fertilizing && current_item.fertilizing.length > 0">
                          <td>Adubação</td>
                          <th v-if="learning_unit.fertilizing.includes('NA')">{{ current_item.fertilizing.map(item => (item == 'NA' ? current_item.fertilizing_other : item)).join(',') }}</th>
                          <th v-else>{{ current_item.fertilizing.join(', ') }}</th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div v-if="current_item.type == 'planting'">
                    <table class="table">
                      <tbody>
                        <tr v-if="current_item.vegetation_type && current_item.vegetation_type.length > 0">
                          <td>Fitofisionomia</td>
                          <th>{{ current_item.vegetation_type.join(', ') }}</th>
                        </tr>
                        <tr v-if="current_item.property_features">
                          <td>Características da propriedade</td>
                          <th>{{ current_item.property_features }}</th>
                        </tr>
                        <tr v-if="current_item.restoration_system && current_item.restoration_system.length > 0">
                          <td>Sistema de restauração/técnica utilizada</td>
                          <th v-if="current_item.restoration_system.includes('Outros')">{{ current_item.restoration_system.map(item => (item == 'Outros' ? current_item.restoration_system_other : item)).join(',') }}</th>
                          <th v-else>{{ current_item.restoration_system.join(', ') }}</th>
                        </tr>
                        <tr v-if="current_item.restoration_system_implement">
                          <td>Implemento utilizado?</td>
                          <th>{{ current_item.restoration_system_implement }}</th>
                        </tr>
                        <tr v-if="current_item.native_seeds_planted">
                          <td>Quantidade de sementes nativas plantadas por hectare</td>
                          <th>{{ current_item.native_seeds_planted }} Kg</th>
                        </tr>
                        <tr v-if="current_item.native_seeds_investment">
                          <td>R$ investido em sementes nativas plantadas por hectare</td>
                          <th>{{ current_item.native_seeds_investment | moeda }}</th>
                        </tr>
                        <tr v-if="current_item.native_seeds_source">
                          <td>De onde adquiriu as sementes nativas?</td>
                          <th>{{ current_item.native_seeds_source }}</th>
                        </tr>
                        <tr v-if="current_item.green_adubation_planted">
                          <td>Quantidade (Kg) de sementes de adubação verde plantadas por hectare</td>
                          <th>{{ current_item.green_adubation_planted }}</th>
                        </tr>
                        <tr v-if="current_item.green_adubation_investment">
                          <td>R$ investido em sementes de adubação verde plantadas por hectare</td>
                          <th>{{ current_item.green_adubation_investment | moeda }}</th>
                        </tr>
                        <tr v-if="current_item.seedlings_planted">
                          <td>Quantidade de mudas plantadas por hectare</td>
                          <th>{{ current_item.seedlings_planted }} Kg</th>
                        </tr>
                        <tr v-if="current_item.seedlings_investment">
                          <td>R$ investido em mudas plantadas por hectare</td>
                          <th>{{ current_item.seedlings_investment | moeda }}</th>
                        </tr>
                        <tr v-if="current_item.total_planting_cost">
                          <td>Custo total da implementação do plantio (se calculado)" description="Indicar quais etapas e serviços estão sendo considerados (custos operacionais, AT, entre outros)</td>
                          <th>{{ current_item.total_planting_cost }}</th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div v-if="current_item.type == 'monitoring'">
                    <table class="table">
                      <tbody>
                        <tr v-if="current_item.trees_established_per_hectare">
                          <td>Quantidade de árvores estabelecidas por hectare</td>
                          <th>{{ current_item.trees_established_per_hectare }}</th>
                        </tr>
                        <tr v-if="current_item.species_established_in_total_area">
                          <td>Número de espécies estabelecidas na área total</td>
                          <th>{{ current_item.species_established_in_total_area }}</th>
                        </tr>
                        <tr v-if="current_item.percentage_of_canopy_coverage">
                          <td>% de cobertura de copa da área (formações florestais)</td>
                          <th>{{ current_item.percentage_of_canopy_coverage }} %</th>
                        </tr>
                        <tr v-if="current_item.percentage_of_soil_coverage">
                          <td>% de cobertura de solo (formações savânicas e campestres)</td>
                          <th>{{ current_item.percentage_of_soil_coverage }} %</th>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div v-if="current_item.notes && current_item.notes.length > 0">
                    <h5>Observações</h5>
                    <span v-html="current_item.notes" />
                    <br>
                  </div>
                  <div v-if="current_item.pictures && current_item.pictures.length > 0" class="gallery">
                    <h5>Fotos</h5>
                    <b-row>
                      <b-col v-for="(picture, index) in current_item.pictures" :key="index" md="4">
                        <a :href="picture.url" target="_blank">
                          <b-img :src="picture.url" />
                        </a>
                      </b-col>
                    </b-row>
                    <br>
                  </div>
                  <div v-if="current_item.pdfs && current_item.pdfs.length > 0" class="gallery">
                    <h5>Documentos</h5>
                    <b-row>
                      <b-col v-for="(pdf, index) in current_item.pdfs" :key="index" md="4">
                        <a :href="pdf.url" target="_blank">
                          <b-img :src="pdf.thumb" class="thumbnail" />
                          <p v-if="pdf.title" class="text-center">{{ pdf.title }}</p>
                        </a>
                      </b-col>
                    </b-row>
                    <br>
                  </div>
                </div>
                <div v-else class="mt-5">
                  <div v-if="learning_unit.address && learning_unit.address.location && learning_unit.address.location.coordinates">
                    <ItemMap type="learning_units" :address="learning_unit.address" />
                    <p class="text-center">
                      {{ [learning_unit.address.city, learning_unit.address.uf].filter(i => i).join(' - ') }}
                    </p>
                    <br>
                  </div>
                  <table class="table">
                    <tbody>
                      <tr v-if="learning_unit.planting_time">
                        <td>Data do plantio</td>
                        <th>{{ learning_unit.planting_time }}</th>
                      </tr>
                      <tr v-if="learning_unit.area_size">
                        <td>Tamanho da área</td>
                        <th>{{ learning_unit.area_size }} hectares</th>
                      </tr>
                      <tr v-if="learning_unit.receive_technical_visits">
                        <td>Área disponível para visitas técnicas?</td>
                        <th>{{ learning_unit.receive_technical_visits ? 'Sim' : 'Não' }}</th>
                      </tr>
                      <tr v-if="learning_unit.availability_for_technical_visits">
                        <td>Periodicidade disponível para visitas</td>
                        <th>{{ learning_unit.availability_for_technical_visits }}</th>
                      </tr>
                      <tr v-if="learning_unit.responsible_for_technical_visits">
                        <td>Responsável pelo agendamento das visitas</td>
                        <th>{{ learning_unit.responsible_for_technical_visits }}</th>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="text-center">
                  <n-link to="/mapa" class="btn btn-primary">
                    Voltar ao mapa
                  </n-link>
                </div>
              </div>
            </div>
          </b-col>
          <b-col md="4">
            <div class="timeline">
              <h3 class="mt-4 mb-4"> Linha do tempo </h3>
              <b-row no-gutters>
                <b-col class="line">
                  <div />
                </b-col>
                <b-col class="cards">
                  <div v-for="item in timeline" :key="item._id" @click="$scrollTo('.tabs')">
                    <n-link :to="'/unidades-de-aprendizagem/' + learning_unit.slug + '?item=' + item._id" tag="div" class="card">
                      <b-img :src="item.pictures && item.pictures.length ? item.pictures[0].average : null" :alt="item.title" class="card-img-top" />
                      <div class="card-body">
                        <div class="date">
                          <b-img src="~assets/img/green.png" />
                          <div class="">
                            {{ $moment(item.createdAt).format("DD MMM YY") }}
                          </div>
                        </div>
                        <div class="card-title">
                          <h3>{{ item.name }}</h3>
                          <b-badge pill :class="item.type">{{ types[item.type] }}</b-badge>
                        </div>
                        <div class="card-text">
                          <p>{{ (item.description || item.content) | truncate(1000) }}</p>
                        </div>
                      </div>
                    </n-link>
                  </div>
                </b-col>
              </b-row>
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
      page_id: 'learning_units',
      page_title: this.learning_unit ? this.learning_unit.name + ' - Unidades de aprendizagem' : null,
      page_description: this.learning_unit ? this.learning_unit.description : null,
      page_image: (this.learning_unit && this.learning_unit.pictures && this.learning_unit.pictures.length > 0 ? this.learning_unit.pictures[0].url : null),
      types: {
        diagnosis: 'Diagnóstico',
        preparation: 'Preparo',
        planting: 'Plantio',
        monitoring: 'Monitoramento',
        maintenance: 'Manutenção',
        harvest: 'Colheita'
      }
    }
  },
  computed: {
    breadcrumb () {
      return [
        { text: 'Mapa', to: '/mapa' },
        { text: 'Unidades de aprendizagem', to: '/unidades-de-aprendizagem' },
        { text: this.learning_unit ? this.learning_unit.name : '', active: true }
      ]
    },
    learning_unit () {
      return this.site.learning_units.find(learningUnit => learningUnit.slug === this.$route.params.id)
    },
    current_item () {
      if (this.$route.query.item) {
        return this.timeline.find(item => item._id.toString() === this.$route.query.item)
      }
      return null
    },
    timeline () {
      const timeline = []
      this.learning_unit.diagnostics.forEach(item => {
        item.type = 'diagnosis'
        timeline.push(item)
      })
      this.learning_unit.preparations.forEach(item => {
        item.type = 'preparation'
        timeline.push(item)
      })
      this.learning_unit.plantings.forEach(item => {
        item.type = 'planting'
        timeline.push(item)
      })
      this.learning_unit.monitorings.forEach(item => {
        item.type = 'monitoring'
        timeline.push(item)
      })
      this.learning_unit.maintenances.forEach(item => {
        item.type = 'maintenance'
        timeline.push(item)
      })
      this.learning_unit.harvests.forEach(item => {
        item.type = 'harvest'
        timeline.push(item)
      })
      return timeline.sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      })
    }
  },
  methods: {
    filled(fields) {
      if (fields.find(field => this.current_item[field] && this.current_item[field].length > 0)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style lang="sass">
  .learning-unit-page
    .timeline
      display: unset
      .line
        float: left
        max-width: 70px
        > div
          height: 100%
          width: 2px
          background-color: #394e3f
          border-radius: 2px
          float: right
          margin-right: 15px

      .cards
        float: right
        width: calc(100% - 70px)
        .card
          margin-bottom: 20px
          cursor: pointer
          .card-img-top
            border-top-right-radius: 15px
            border-top-left-radius: 15px
          .card-body
            padding: 15px
            .card-title
              h3
                font-size: 20px
            .date
              img
                position: absolute
                margin-left: -36px
                border-radius: 10px
                margin-top: 5px
              > div
                position: absolute
                margin-left: -78px
                margin-top: -27px
                width: 40px
                font-size: 16px
                text-transform: capitalize
            .badge
              font-weight: 100
              padding: 5px 10px
              border-radius: 5px
              &.diagnosis
                background-color: #e0a15d
              &.preparation
                background-color: #dbb89f
              &.planting
                background-color: #394e3f
              &.monitoring
                background-color: #4d526a
              &.maintenance
                background-color: #f6a447
              &.harvest
                background-color: #e85e40

    .quill-content p:last-child img
      width: auto
      max-width: 100%
    .babdge
      padding: 10px 20px
    .tabs
      margin: -30px -50px 0 -50px
      img
        max-width: 100% !important
        margin: 0 !important
      .card-header
        background-color: #394e3f
        border: none
        border-radius: 0
        .nav-pills .nav-link
          color: #fff
          padding: 10px 10px
          font-size: 16px
          &.active
            color: #394e3f
            background-color: #fff
    .gallery
      img
        border-radius: 5px
    .table
      tr
        th, td
          border: none
          padding: 10px 0
    .vue2leaflet-map
      border-radius: 10px
</style>
