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
        <p><n-link to="/unidades-de-aprendizagem" class="badge learning_units">Unidades de aprendizagem</n-link></p>
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
                  <b-tab
                    v-if="filled(['original_vegetation', 'year_of_deforestation', 'previous_use_type', 'duration_of_previous_use', 'soil_type', 'soil_moisture', 'declivity', 'soil_compaction', 'soil_conservation', 'nearest_forest', 'nearest_forest_vegetation', 'fragment_size', 'natural_regeneration', 'presence_of_other_animals', 'firing_frequency', 'last_fire', 'herbicide_use', 'herbicide', 'herbicide_frequency', 'overgrazing', 'overgrazing_frequency', 'soil_preparation', 'screenings_number', 'levels_number', 'screenings_frequency', 'semi_mechanized_mowing_number', 'manual_mowing_number', 'mowing_frequency', 'fertilizing', 'diagnosis_notes'])"
                    title="Diagnóstico e preparo" lazy>
                    <div v-if="filled(['original_vegetation', 'year_of_deforestation', 'previous_use_type', 'duration_of_previous_use'])">
                      <h5>Histórico de Ocupação</h5>
                      <br>
                      <table class="table">
                        <tbody>
                          <tr v-if="learning_unit.original_vegetation">
                            <th>Vegetação original</th>
                            <td>{{ learning_unit.original_vegetation }}</td>
                          </tr>
                          <tr v-if="learning_unit.year_of_deforestation">
                            <th>Ano do desmatamento</th>
                            <td>{{ learning_unit.year_of_deforestation }}</td>
                          </tr>
                          <tr v-if="learning_unit.previous_use_type">
                            <th>Tipo de uso anterior</th>
                            <td>{{ learning_unit.previous_use_type }}</td>
                          </tr>
                          <tr v-if="learning_unit.duration_of_previous_use">
                            <th>Duração do uso anterior (último uso)</th>
                            <td>{{ learning_unit.duration_of_previous_use }}</td>
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
                          <tr v-if="learning_unit.soil_type">
                            <th>Tipo de Solo</th>
                            <td>{{ learning_unit.soil_type }}</td>
                          </tr>
                          <tr v-if="learning_unit.soil_moisture">
                            <th>Umidade do Solo</th>
                            <td>{{ learning_unit.soil_moisture }}</td>
                          </tr>
                          <tr v-if="learning_unit.declivity">
                            <th>Declividade (a mais acentuada dentro da área do plantio)</th>
                            <td>{{ learning_unit.declivity }}</td>
                          </tr>
                          <tr v-if="learning_unit.soil_compaction">
                            <th>Compactação do solo</th>
                            <td>{{ learning_unit.soil_compaction }}</td>
                          </tr>
                          <tr v-if="learning_unit.soil_conservation">
                            <th>Conservação do solo</th>
                            <td>{{ learning_unit.soil_conservation === 'Outros' ? learning_unit.soil_conservation_other : learning_unit.soil_conservation }}</td>
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
                          <tr v-if="learning_unit.nearest_forest">
                            <th>Mata nativa mais próxima (km)</th>
                            <td>{{ learning_unit.nearest_forest }}</td>
                          </tr>
                          <tr v-if="learning_unit.nearest_forest_vegetation">
                            <th>Vegetação da mata mais próxima</th>
                            <td>{{ learning_unit.nearest_forest_vegetation }}</td>
                          </tr>
                          <tr v-if="learning_unit.fragment_size">
                            <th>Tamanho do fragmento</th>
                            <td>{{ learning_unit.fragment_size }}</td>
                          </tr>
                          <tr v-if="learning_unit.natural_regeneration">
                            <th>Regeneração Natural da área do plantio</th>
                            <td>{{ learning_unit.natural_regeneration }}</td>
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
                          <tr v-if="learning_unit.presence_of_other_animals">
                            <th>Presença de gado e/ou outros animais</th>
                            <td>{{ learning_unit.presence_of_other_animals }}</td>
                          </tr>
                          <tr v-if="learning_unit.firing_frequency">
                            <th>Frequência de queimadas</th>
                            <td>{{ learning_unit.firing_frequency === 'Outros' ? learning_unit.firing_frequency_other : learning_unit.firing_frequency }}</td>
                          </tr>
                          <tr v-if="learning_unit.last_fire">
                            <th>Data do último fogo</th>
                            <td>{{ learning_unit.last_fire }}</td>
                          </tr>
                        </tbody>
                      </table>
                      <br>
                    </div>
                    <div v-if="filled(['herbicide_use', 'herbicide', 'herbicide_frequency', 'overgrazing', 'overgrazing_frequency', 'soil_preparation', 'screenings_number', 'levels_number', 'screenings_frequency', 'semi_mechanized_mowing_number', 'manual_mowing_number', 'mowing_frequency', 'fertilizing', 'diagnosis_notes'])">
                      <h5>Preparo da área</h5>
                      <br>
                      <table class="table">
                        <tbody>
                          <tr v-if="learning_unit.herbicide_use">
                            <th>Uso de herbicida</th>
                            <td>{{ learning_unit.herbicide_use }}</td>
                          </tr>
                          <tr v-if="learning_unit.herbicide_use === 'Sim'">
                            <th>Qual herbicida?</th>
                            <td>{{ learning_unit.herbicide }}</td>
                          </tr>
                          <tr v-if="learning_unit.herbicide_use === 'Sim'">
                            <th>Qual frequência da aplicação de herbicida?</th>
                            <td>{{ learning_unit.herbicide_frequency }}</td>
                          </tr>
                          <tr v-if="learning_unit.overgrazing">
                            <th>Sobrepastejo</th>
                            <td>{{ learning_unit.overgrazing }}</td>
                          </tr>
                          <tr v-if="learning_unit.overgrazing === 'Sim'">
                            <th>Quantas cabeças e por quanto tempo?</th>
                            <td>{{ learning_unit.overgrazing_frequency }}</td>
                          </tr>
                          <tr v-if="learning_unit.soil_preparation">
                            <th>Preparo do solo mecanizado ou manual?</th>
                            <td>{{ learning_unit.soil_preparation }}</td>
                          </tr>
                          <tr v-if="learning_unit.screenings_number">
                            <th>Número de gradagens</th>
                            <td>{{ learning_unit.screenings_number }}</td>
                          </tr>
                          <tr v-if="learning_unit.levels_number">
                            <th>Número de nivelamentos</th>
                            <td>{{ learning_unit.levels_number }}</td>
                          </tr>
                          <tr v-if="learning_unit.screenings_frequency">
                            <th>Frequência das gradagens</th>
                            <td>{{ learning_unit.screenings_frequency }}</td>
                          </tr>
                          <tr v-if="learning_unit.semi_mechanized_mowing_number">
                            <th>Número de roçadas semi-mecanizadas</th>
                            <td>{{ learning_unit.semi_mechanized_mowing_number }}</td>
                          </tr>
                          <tr v-if="learning_unit.manual_mowing_number">
                            <th>Número de roçadas manuais</th>
                            <td>{{ learning_unit.manual_mowing_number }}</td>
                          </tr>
                          <tr v-if="learning_unit.mowing_frequency">
                            <th>Frequência das roçadas</th>
                            <td>{{ learning_unit.mowing_frequency }}</td>
                          </tr>
                          <tr v-if="learning_unit.fertilizing">
                            <th>Adubação</th>
                            <td>{{ learning_unit.fertilizing === 'NA' ? learning_unit.fertilizing_other : learning_unit.fertilizing }}</td>
                          </tr>
                          <tr v-if="learning_unit.diagnosis_notes">
                            <th>Observações gerais do diagnóstico</th>
                            <td>{{ learning_unit.diagnosis_notes }}</td>
                          </tr>
                          <tr v-if="learning_unit.diagnosis_pictures">
                            <th>Imagens do diagnóstico</th>
                            <td class="gallery">
                              <a v-for="(picture, index) in learning_unit.diagnosis_pictures" :key="index" :href="picture.url" target="_blank">
                                <b-img :src="picture.url" responsive />
                                <br>
                                <br>
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </b-tab>
                  <b-tab
                    v-if="filled(['state', 'city', 'biome', 'vegetation_type', 'property_features', 'restoration_system', 'restoration_system_implement', 'native_seeds_planted', 'native_seeds_investment', 'native_seeds_source', 'green_adubation_planted', 'green_adubation_investment', 'seedlings_planted', 'seedlings_investment', 'total_planting_cost', 'planting_observations'])"
                    title="Plantio" lazy>
                    <table class="table">
                      <tbody>
                        <tr v-if="learning_unit.state">
                          <th>Estado</th>
                          <td>{{ learning_unit.state }}</td>
                        </tr>
                        <tr v-if="learning_unit.city">
                          <th>Cidade</th>
                          <td>{{ learning_unit.city }}</td>
                        </tr>
                        <tr v-if="learning_unit.biome">
                          <th>Bioma</th>
                          <td>{{ learning_unit.biome }}</td>
                        </tr>
                        <tr v-if="learning_unit.vegetation_type">
                          <th>Fitofisionomia</th>
                          <td>{{ learning_unit.vegetation_type }}</td>
                        </tr>
                        <tr v-if="learning_unit.property_features">
                          <th>Características da propriedade</th>
                          <td>{{ learning_unit.property_features }}</td>
                        </tr>
                        <tr v-if="learning_unit.restoration_system">
                          <th>Sistema de restauração/técnica utilizada</th>
                          <td>{{ learning_unit.restoration_system === 'Outros' ? learning_unit.restoration_system_other : learning_unit.restoration_system }}</td>
                        </tr>
                        <tr v-if="learning_unit.restoration_system_implement">
                          <th>Implemento utilizado?</th>
                          <td>{{ learning_unit.restoration_system_implement }}</td>
                        </tr>
                        <tr v-if="learning_unit.native_seeds_planted">
                          <th>Quantidade de sementes nativas plantadas por hectare</th>
                          <td>{{ learning_unit.native_seeds_planted }} Kg</td>
                        </tr>
                        <tr v-if="learning_unit.native_seeds_investment">
                          <th>R$ investido em sementes nativas plantadas por hectare</th>
                          <td>{{ learning_unit.native_seeds_investment | moeda }}</td>
                        </tr>
                        <tr v-if="learning_unit.native_seeds_source">
                          <th>De onde adquiriu as sementes nativas?</th>
                          <td>{{ learning_unit.native_seeds_source }}</td>
                        </tr>
                        <tr v-if="learning_unit.green_adubation_planted">
                          <th>Quantidade (Kg) de sementes de adubação verde plantadas por hectare</th>
                          <td>{{ learning_unit.green_adubation_planted }}</td>
                        </tr>
                        <tr v-if="learning_unit.green_adubation_investment">
                          <th>R$ investido em sementes de adubação verde plantadas por hectare</th>
                          <td>{{ learning_unit.green_adubation_investment | moeda }}</td>
                        </tr>
                        <tr v-if="learning_unit.seedlings_planted">
                          <th>Quantidade de mudas plantadas por hectare</th>
                          <td>{{ learning_unit.seedlings_planted }} Kg</td>
                        </tr>
                        <tr v-if="learning_unit.seedlings_investment">
                          <th>R$ investido em mudas plantadas por hectare</th>
                          <td>{{ learning_unit.seedlings_investment | moeda }}</td>
                        </tr>
                        <tr v-if="learning_unit.total_planting_cost">
                          <th>Custo total da implementação do plantio (se calculado)" description="Indicar quais etapas e serviços estão sendo considerados (custos operacionais, AT, entre outros)</th>
                          <td>{{ learning_unit.total_planting_cost }}</td>
                        </tr>
                        <tr v-if="learning_unit.planting_notes">
                          <th>Observações gerais do plantio</th>
                          <td>{{ learning_unit.planting_notes }}</td>
                        </tr>
                        <tr v-if="learning_unit.planting_pictures">
                          <th>Imagens do plantio</th>
                          <td class="gallery">
                            <a v-for="(picture, index) in learning_unit.planting_pictures" :key="index" :href="picture.url" target="_blank">
                              <b-img :src="picture.url" responsive />
                              <br>
                              <br>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </b-tab>
                  <b-tab v-if="filled(['monitoring_date', 'trees_established_per_hectare', 'species_established_in_total_area', 'percentage_of_canopy_coverage', 'percentage_of_soil_coverage', 'monitoring_notes'])" title="Monitoramento e manejo" lazy>
                    <table class="table">
                      <tbody>
                        <tr v-if="learning_unit.monitoring_date">
                          <th>Data do monitoramento</th>
                          <td>{{ $moment(learning_unit.monitoring_date).format("DD/MM/YYYY") }}</td>
                        </tr>
                        <tr v-if="learning_unit.trees_established_per_hectare">
                          <th>Quantidade de árvores estabelecidas por hectare</th>
                          <td>{{ learning_unit.trees_established_per_hectare }}</td>
                        </tr>
                        <tr v-if="learning_unit.species_established_in_total_area">
                          <th>Número de espécies estabelecidas na área total</th>
                          <td>{{ learning_unit.species_established_in_total_area }}</td>
                        </tr>
                        <tr v-if="learning_unit.percentage_of_canopy_coverage">
                          <th>% de cobertura de copa da área (formações florestais)</th>
                          <td>{{ learning_unit.percentage_of_canopy_coverage }} %</td>
                        </tr>
                        <tr v-if="learning_unit.percentage_of_soil_coverage">
                          <th>% de cobertura de solo (formações savânicas e campestres)</th>
                          <td>{{ learning_unit.percentage_of_soil_coverage }} %</td>
                        </tr>
                        <tr v-if="learning_unit.monitoring_notes">
                          <th>Observações gerais do monitoramento</th>
                          <td>{{ learning_unit.monitoring_notes }}</td>
                        </tr>
                        <tr v-if="learning_unit.monitoring_pictures">
                          <th>Imagens do monitoramento</th>
                          <td class="gallery">
                            <a v-for="(picture, index) in learning_unit.monitoring_pictures" :key="index" :href="picture.url" target="_blank">
                              <b-img :src="picture.url" responsive />
                              <br>
                              <br>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
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
                <p class="text-center">
                  {{ learning_unit.address.location.coordinates[0] }}, {{ learning_unit.address.location.coordinates[1] }}
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
    filled(fields) {
      return fields.find(field => this.learning_unit[field])
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
    .babdge
      padding: 10px 20px
    .tabs
      margin: -30px -50px 0 -50px
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
