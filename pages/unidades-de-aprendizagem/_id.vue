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
          <b-col md="9">
            <div class="quill-content mt-4">
              <banners :items="learning_unit.pictures" />
              <div>
                <b-tabs content-class="mt-3" card pills>
                  <b-tab title="Informações gerais" active>
                    <table class="table">
                      <tbody>
                        <tr v-if="learning_unit.planting_time">
                          <th>Data do plantio</th>
                          <td>{{ learning_unit.planting_time }}</td>
                        </tr>
                        <tr v-if="learning_unit.area_size">
                          <th>Tamanho da área</th>
                          <td>{{ learning_unit.area_size }} hectares</td>
                        </tr>
                        <tr v-if="learning_unit.receive_technical_visits">
                          <th>Área disponível para visitas técnicas?</th>
                          <td>{{ learning_unit.receive_technical_visits ? 'Sim' : 'Não' }}</td>
                        </tr>
                        <tr v-if="learning_unit.availability_for_technical_visits">
                          <th>Periodicidade disponível para visitas</th>
                          <td>{{ learning_unit.availability_for_technical_visits }}</td>
                        </tr>
                        <tr v-if="learning_unit.responsible_for_technical_visits">
                          <th>Responsável pelo agendamento das visitas</th>
                          <td>{{ learning_unit.responsible_for_technical_visits }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </b-tab>
                  <b-tab v-if="learning_unit.diagnostics && learning_unit.diagnostics.length > 0" title="Diagnóstico" lazy>
                    <div v-for="diagnosis in learning_unit.diagnostics" :key="diagnosis._id">
                      <h3>{{ diagnosis.name }}</h3>
                      <p>{{ $moment(diagnosis.createdAt).format("DD/MM/YYYY") }}</p>
                      <hr>
                      <p v-if="diagnosis.description">{{ diagnosis.description }}<br><br></p>
                      <div v-if="filled('diagnostics', ['biome', 'original_vegetation', 'year_of_deforestation', 'previous_use_type', 'duration_of_previous_use'])">
                        <h5>Histórico de Ocupação</h5>
                        <br>
                        <table class="table">
                          <tbody>
                            <tr v-if="diagnosis.biome">
                              <th>Bioma</th>
                              <td>{{ diagnosis.biome }}</td>
                            </tr>
                            <tr v-if="diagnosis.original_vegetation && diagnosis.original_vegetation.length > 0">
                              <th>Vegetação original</th>
                              <td>{{ diagnosis.original_vegetation.join(', ') }}</td>
                            </tr>
                            <tr v-if="diagnosis.year_of_deforestation && diagnosis.year_of_deforestation.length > 0">
                              <th>Ano do desmatamento</th>
                              <td>{{ diagnosis.year_of_deforestation.join(', ') }}</td>
                            </tr>
                            <tr v-if="diagnosis.previous_use_type && diagnosis.previous_use_type.length > 0">
                              <th>Tipo de uso anterior</th>
                              <td>{{ diagnosis.previous_use_type.join(', ') }}</td>
                            </tr>
                            <tr v-if="diagnosis.duration_of_previous_use && diagnosis.duration_of_previous_use.length > 0">
                              <th>Duração do uso anterior (último uso)</th>
                              <td>{{ diagnosis.duration_of_previous_use.join(', ') }}</td>
                            </tr>
                          </tbody>
                        </table>
                        <br>
                      </div>
                      <div v-if="filled('diagnostics', ['soil_type', 'soil_moisture', 'declivity', 'soil_compaction', 'soil_conservation'])">
                        <h5>Análise da área</h5>
                        <br>
                        <table class="table">
                          <tbody>
                            <tr v-if="diagnosis.soil_type && diagnosis.soil_type.length > 0">
                              <th>Tipo de Solo</th>
                              <td>{{ diagnosis.soil_type.join(', ') }}</td>
                            </tr>
                            <tr v-if="diagnosis.soil_moisture && diagnosis.soil_moisture.length > 0">
                              <th>Umidade do Solo</th>
                              <td>{{ diagnosis.soil_moisture.join(', ') }}</td>
                            </tr>
                            <tr v-if="diagnosis.declivity && diagnosis.declivity.length > 0">
                              <th>Declividade (a mais acentuada dentro da área do plantio)</th>
                              <td>{{ diagnosis.declivity.join(', ') }}</td>
                            </tr>
                            <tr v-if="diagnosis.soil_compaction && diagnosis.soil_compaction.length > 0">
                              <th>Compactação do solo</th>
                              <td>{{ diagnosis.soil_compaction.join(', ') }}</td>
                            </tr>
                            <tr v-if="diagnosis.soil_conservation">
                              <th>Conservação do solo</th>
                              <td v-if="diagnosis.soil_conservation.includes('Outros')">{{ diagnosis.soil_conservation.map(item => (item == 'Outros' ? diagnosis.soil_conservation_other : item)).join(',') }}</td>
                              <td v-else>{{ diagnosis.soil_conservation.join(', ') }}</td>
                            </tr>
                          </tbody>
                        </table>
                        <br>
                      </div>
                      <div v-if="filled('diagnostics', ['nearest_forest', 'nearest_forest_vegetation', 'fragment_size', 'natural_regeneration'])">
                        <h5>Análise da paisagem</h5>
                        <br>
                        <table class="table">
                          <tbody>
                            <tr v-if="diagnosis.nearest_forest">
                              <th>Mata nativa mais próxima (km)</th>
                              <td>{{ diagnosis.nearest_forest }}</td>
                            </tr>
                            <tr v-if="diagnosis.nearest_forest_vegetation && diagnosis.nearest_forest_vegetation.length > 0">
                              <th>Vegetação da mata mais próxima</th>
                              <td>{{ diagnosis.nearest_forest_vegetation.join(', ') }}</td>
                            </tr>
                            <tr v-if="diagnosis.fragment_size && diagnosis.fragment_size.length > 0">
                              <th>Tamanho do fragmento</th>
                              <td>{{ diagnosis.fragment_size.join(', ') }}</td>
                            </tr>
                            <tr v-if="diagnosis.natural_regeneration && diagnosis.natural_regeneration.length > 0">
                              <th>Regeneração Natural da área do plantio</th>
                              <td>{{ diagnosis.natural_regeneration.join(', ') }}</td>
                            </tr>
                          </tbody>
                        </table>
                        <br>
                      </div>
                      <div v-if="filled('diagnostics', ['presence_of_other_animals', 'firing_frequency', 'last_fire'])">
                        <h5>Fatores de pertubação</h5>
                        <br>
                        <table class="table">
                          <tbody>
                            <tr v-if="diagnosis.presence_of_other_animals">
                              <th>Presença de gado e/ou outros animais</th>
                              <td>{{ diagnosis.presence_of_other_animals }}</td>
                            </tr>
                            <tr v-if="diagnosis.firing_frequency && diagnosis.firing_frequency.length > 0">
                              <th>Frequência de queimadas</th>
                              <td v-if="diagnosis.firing_frequency.includes('Outros')">{{ diagnosis.firing_frequency.map(item => (item == 'Outros' ? diagnosis.firing_frequency_other : item)).join(',') }}</td>
                              <td v-else>{{ diagnosis.firing_frequency.join(', ') }}</td>
                            </tr>
                            <tr v-if="diagnosis.last_fire && diagnosis.last_fire.length > 0">
                              <th>Data do último fogo</th>
                              <td>{{ diagnosis.last_fire.join(', ') }}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <p v-if="diagnosis.notes"><span v-html="diagnosis.notes" /><br><br></p>
                      <p v-if="diagnosis.pictures && diagnosis.pictures">
                        <a v-for="(picture, index) in diagnosis.pictures" :key="index" :href="picture.url" target="_blank">
                          <b-img :src="picture.url" />
                        </a>
                      </p>
                      <p v-if="diagnosis.pdfs && diagnosis.pdfs">
                        <a v-for="(pdf, index) in diagnosis.pdfs" :key="index" :href="pdf.url" target="_blank">
                          <b-img :src="pdf.thumb" />
                        </a>
                      </p>
                      <br>
                      <br>
                    </div>
                  </b-tab>
                  <b-tab v-if="learning_unit.preparations && learning_unit.preparations.length > 0" title="Preparo da área" lazy>
                    <div v-for="preparation in learning_unit.preparations" :key="preparation._id">
                      <h3>{{ preparation.name }}</h3>
                      <p>{{ $moment(preparation.createdAt).format("DD/MM/YYYY") }}</p>
                      <hr>
                      <p v-if="preparation.description">{{ preparation.description }}<br><br></p>
                      <h5>Preparo da área</h5>
                      <br>
                      <table class="table">
                        <tbody>
                          <tr v-if="preparation.herbicide_use">
                            <th>Uso de herbicida</th>
                            <td>{{ preparation.herbicide_use }}</td>
                          </tr>
                          <tr v-if="preparation.herbicide_use === 'Sim'">
                            <th>Qual herbicida?</th>
                            <td>{{ preparation.herbicide }}</td>
                          </tr>
                          <tr v-if="preparation.herbicide_use === 'Sim'">
                            <th>Qual frequência da aplicação de herbicida?</th>
                            <td>{{ preparation.herbicide_frequency }}</td>
                          </tr>
                          <tr v-if="preparation.overgrazing">
                            <th>Sobrepastejo</th>
                            <td>{{ preparation.overgrazing }}</td>
                          </tr>
                          <tr v-if="preparation.overgrazing === 'Sim'">
                            <th>Quantas cabeças e por quanto tempo?</th>
                            <td>{{ preparation.overgrazing_frequency }}</td>
                          </tr>
                          <tr v-if="preparation.soil_preparation && preparation.soil_preparation.length > 0">
                            <th>Preparo do solo mecanizado ou manual?</th>
                            <td>{{ preparation.soil_preparation.join(', ') }}</td>
                          </tr>
                          <tr v-if="preparation.screenings_number">
                            <th>Número de gradagens</th>
                            <td>{{ preparation.screenings_number }}</td>
                          </tr>
                          <tr v-if="preparation.levels_number">
                            <th>Número de nivelamentos</th>
                            <td>{{ preparation.levels_number }}</td>
                          </tr>
                          <tr v-if="preparation.screenings_frequency">
                            <th>Frequência das gradagens</th>
                            <td>{{ preparation.screenings_frequency }}</td>
                          </tr>
                          <tr v-if="preparation.semi_mechanized_mowing_number">
                            <th>Número de roçadas semi-mecanizadas</th>
                            <td>{{ preparation.semi_mechanized_mowing_number }}</td>
                          </tr>
                          <tr v-if="preparation.manual_mowing_number">
                            <th>Número de roçadas manuais</th>
                            <td>{{ preparation.manual_mowing_number }}</td>
                          </tr>
                          <tr v-if="preparation.mowing_frequency">
                            <th>Frequência das roçadas</th>
                            <td>{{ preparation.mowing_frequency }}</td>
                          </tr>
                          <tr v-if="preparation.fertilizing && preparation.fertilizing.length > 0">
                            <th>Adubação</th>
                            <td v-if="learning_unit.fertilizing.includes('NA')">{{ preparation.fertilizing.map(item => (item == 'NA' ? preparation.fertilizing_other : item)).join(',') }}</td>
                            <td v-else>{{ preparation.fertilizing.join(', ') }}</td>
                          </tr>
                        </tbody>
                      </table>
                      <p v-if="preparation.notes"><span v-html="preparation.notes" /><br><br></p>
                      <p v-if="preparation.pictures && preparation.pictures">
                        <a v-for="(picture, index) in preparation.pictures" :key="index" :href="picture.url" target="_blank">
                          <b-img :src="picture.url" />
                        </a>
                      </p>
                      <p v-if="preparation.pdfs && preparation.pdfs">
                        <a v-for="(pdf, index) in preparation.pdfs" :key="index" :href="pdf.url" target="_blank">
                          <b-img :src="pdf.thumb" />
                        </a>
                      </p>
                      <br>
                      <br>
                    </div>
                  </b-tab>
                  <b-tab v-if="learning_unit.plantings && learning_unit.plantings.length > 0" title="Plantio" lazy>
                    <div v-for="planting in learning_unit.plantings" :key="planting._id">
                      <h3>{{ planting.name }}</h3>
                      <p>{{ $moment(planting.createdAt).format("DD/MM/YYYY") }}</p>
                      <hr>
                      <p v-if="planting.description">{{ planting.description }}<br><br></p>
                      <table class="table">
                        <tbody>
                          <tr v-if="planting.vegetation_type && planting.vegetation_type.length > 0">
                            <th>Fitofisionomia</th>
                            <td>{{ planting.vegetation_type.join(', ') }}</td>
                          </tr>
                          <tr v-if="planting.property_features">
                            <th>Características da propriedade</th>
                            <td>{{ planting.property_features }}</td>
                          </tr>
                          <tr v-if="planting.restoration_system && planting.restoration_system.length > 0">
                            <th>Sistema de restauração/técnica utilizada</th>
                            <td v-if="planting.restoration_system.includes('Outros')">{{ planting.restoration_system.map(item => (item == 'Outros' ? planting.restoration_system_other : item)).join(',') }}</td>
                            <td v-else>{{ planting.restoration_system.join(', ') }}</td>
                          </tr>
                          <tr v-if="planting.restoration_system_implement">
                            <th>Implemento utilizado?</th>
                            <td>{{ planting.restoration_system_implement }}</td>
                          </tr>
                          <tr v-if="planting.native_seeds_planted">
                            <th>Quantidade de sementes nativas plantadas por hectare</th>
                            <td>{{ planting.native_seeds_planted }} Kg</td>
                          </tr>
                          <tr v-if="planting.native_seeds_investment">
                            <th>R$ investido em sementes nativas plantadas por hectare</th>
                            <td>{{ planting.native_seeds_investment | moeda }}</td>
                          </tr>
                          <tr v-if="planting.native_seeds_source">
                            <th>De onde adquiriu as sementes nativas?</th>
                            <td>{{ planting.native_seeds_source }}</td>
                          </tr>
                          <tr v-if="planting.green_adubation_planted">
                            <th>Quantidade (Kg) de sementes de adubação verde plantadas por hectare</th>
                            <td>{{ planting.green_adubation_planted }}</td>
                          </tr>
                          <tr v-if="planting.green_adubation_investment">
                            <th>R$ investido em sementes de adubação verde plantadas por hectare</th>
                            <td>{{ planting.green_adubation_investment | moeda }}</td>
                          </tr>
                          <tr v-if="planting.seedlings_planted">
                            <th>Quantidade de mudas plantadas por hectare</th>
                            <td>{{ planting.seedlings_planted }} Kg</td>
                          </tr>
                          <tr v-if="planting.seedlings_investment">
                            <th>R$ investido em mudas plantadas por hectare</th>
                            <td>{{ planting.seedlings_investment | moeda }}</td>
                          </tr>
                          <tr v-if="planting.total_planting_cost">
                            <th>Custo total da implementação do plantio (se calculado)" description="Indicar quais etapas e serviços estão sendo considerados (custos operacionais, AT, entre outros)</th>
                            <td>{{ planting.total_planting_cost }}</td>
                          </tr>
                        </tbody>
                      </table>
                      <p v-if="planting.notes"><span v-html="planting.notes" /><br><br></p>
                      <p v-if="planting.pictures && planting.pictures">
                        <a v-for="(picture, index) in planting.pictures" :key="index" :href="picture.url" target="_blank">
                          <b-img :src="picture.url" />
                        </a>
                      </p>
                      <p v-if="planting.pdfs && planting.pdfs">
                        <a v-for="(pdf, index) in planting.pdfs" :key="index" :href="pdf.url" target="_blank">
                          <b-img :src="pdf.thumb" />
                        </a>
                      </p>
                      <br>
                      <br>
                    </div>
                  </b-tab>
                  <b-tab v-if="learning_unit.monitorings && learning_unit.monitorings.length > 0" title="Monitoramento" lazy>
                    <div v-for="monitoring in learning_unit.monitorings" :key="monitoring._id">
                      <h3>{{ monitoring.name }}</h3>
                      <p>{{ $moment(monitoring.createdAt).format("DD/MM/YYYY") }}</p>
                      <hr>
                      <p v-if="monitoring.description">{{ monitoring.description }}<br><br></p>
                      <table class="table">
                        <tbody>
                          <tr v-if="monitoring.trees_established_per_hectare">
                            <th>Quantidade de árvores estabelecidas por hectare</th>
                            <td>{{ monitoring.trees_established_per_hectare }}</td>
                          </tr>
                          <tr v-if="monitoring.species_established_in_total_area">
                            <th>Número de espécies estabelecidas na área total</th>
                            <td>{{ monitoring.species_established_in_total_area }}</td>
                          </tr>
                          <tr v-if="monitoring.percentage_of_canopy_coverage">
                            <th>% de cobertura de copa da área (formações florestais)</th>
                            <td>{{ monitoring.percentage_of_canopy_coverage }} %</td>
                          </tr>
                          <tr v-if="monitoring.percentage_of_soil_coverage">
                            <th>% de cobertura de solo (formações savânicas e campestres)</th>
                            <td>{{ monitoring.percentage_of_soil_coverage }} %</td>
                          </tr>
                        </tbody>
                      </table>
                      <p v-if="monitoring.notes"><span v-html="monitoring.notes" /><br><br></p>
                      <p v-if="monitoring.pictures && monitoring.pictures">
                        <a v-for="(picture, index) in monitoring.pictures" :key="index" :href="picture.url" target="_blank">
                          <b-img :src="picture.url" />
                        </a>
                      </p>
                      <p v-if="monitoring.pdfs && monitoring.pdfs">
                        <a v-for="(pdf, index) in monitoring.pdfs" :key="index" :href="pdf.url" target="_blank">
                          <b-img :src="pdf.thumb" />
                        </a>
                      </p>
                      <br>
                      <br>
                    </div>
                  </b-tab>
                  <b-tab v-if="learning_unit.maintenances && learning_unit.maintenances.length > 0" title="Manejo/Manutenção" lazy>
                    <div v-for="maintenance in learning_unit.maintenances" :key="maintenance._id">
                      <h3>{{ maintenance.name }}</h3>
                      <p>{{ $moment(maintenance.createdAt).format("DD/MM/YYYY") }}</p>
                      <hr>
                      <p v-if="maintenance.description">{{ maintenance.description }}<br><br></p>
                      <p v-if="maintenance.notes"><span v-html="maintenance.notes" /><br><br></p>
                      <p v-if="maintenance.pictures && maintenance.pictures">
                        <a v-for="(picture, index) in maintenance.pictures" :key="index" :href="picture.url" target="_blank">
                          <b-img :src="picture.url" />
                        </a>
                      </p>
                      <p v-if="maintenance.pdfs && maintenance.pdfs">
                        <a v-for="(pdf, index) in maintenance.pdfs" :key="index" :href="pdf.url" target="_blank">
                          <b-img :src="pdf.thumb" />
                        </a>
                      </p>
                      <br>
                      <br>
                    </div>
                  </b-tab>
                  <b-tab v-if="learning_unit.harvests && learning_unit.harvests.length > 0" title="Colheita" lazy>
                    <div v-for="harvest in learning_unit.harvests" :key="harvest._id">
                      <h3>{{ harvest.name }}</h3>
                      <p>{{ $moment(harvest.createdAt).format("DD/MM/YYYY") }}</p>
                      <hr>
                      <p v-if="harvest.description">{{ harvest.description }}<br><br></p>
                      <p v-if="harvest.notes"><span v-html="harvest.notes" /><br><br></p>
                      <p v-if="harvest.pictures && harvest.pictures">
                        <a v-for="(picture, index) in harvest.pictures" :key="index" :href="picture.url" target="_blank">
                          <b-img :src="picture.url" />
                        </a>
                      </p>
                      <p v-if="harvest.pdfs && harvest.pdfs">
                        <a v-for="(pdf, index) in harvest.pdfs" :key="index" :href="pdf.url" target="_blank">
                          <b-img :src="pdf.thumb" />
                        </a>
                      </p>
                      <br>
                      <br>
                    </div>
                  </b-tab>
                </b-tabs>
              </div>
            </div>
          </b-col>
          <b-col md="3">
            <div v-if="learning_unit.address && learning_unit.address.location && learning_unit.address.location.coordinates" class="mt-3">
              <h3>Localização</h3>
              <div>
                <ItemMap type="learning_units" :address="learning_unit.address" />
                <br>
                <p class="text-center">
                  {{ [learning_unit.city, learning_unit.state].filter(i => i).join(' - ') }}
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
      page_id: 'learning_units'
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
    learning_unit() {
      return this.site.learning_units.find(learningUnit => learningUnit.slug === this.$route.params.id)
    }
  },
  methods: {
    filled(type, fields) {
      if (this.learning_unit[type] && fields.find(field => this.learning_unit[type].find(t => t[field]))) {
        return true
      } else {
        return false
      }
    }
  },
  head() {
    return {
      title: this.learning_unit.name + ' - Unidades de aprendizado - ' + this.site.name,
      meta: [{
        hid: 'description',
        name: 'description',
        content: this.learning_unit.description || this.site.description
      }]
    }
  }
}
</script>
<style lang="sass">
  .learning-unit-page
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
      .table
        tr:first-child
          th, td
            border: none
    .vue2leaflet-map
      border-radius: 10px
</style>
