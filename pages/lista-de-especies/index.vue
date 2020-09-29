<template>
  <div class="species-page">
    <divisor variant="white-down" />
    <b-carousel :indicators="false" class="banners">
      <b-carousel-slide img-src="~assets/img/banner_biblioteca.png">
        <h2>Lista de espécies</h2>
        <p>Espécies para semeadura direta na Amazônia, Cerrado e Mata Atlântica</p>
      </b-carousel-slide>
    </b-carousel>
    <divisor variant="orange-up" />
    <section class="content pb-5">
      <b-container>
        <div class="pt-5">
          <div class="pattern" />
          <div class="title">
            <h3>Lista de espécies</h3>
            <div v-if="species">
              <p v-if="species.length === 1"><strong>1</strong> ESPÉCIE ENCONTRADA <span v-if="filters.category">em <n-link :to="'/biblioteca?categoria=' + filters.category"><strong>{{ filters.category }}</strong></n-link></span></p>
              <p v-else><strong>{{ species.length }}</strong> ESPÉCIES ENCONTRADAS <span v-if="filters.category">em <n-link :to="'/biblioteca?categoria=' + filters.category"><strong>{{ filters.category }}</strong></n-link></span></p>
              <h3 v-if="species && species.length === 0" class="text-center">Nenhuma espécie encontrada</h3>
            </div>
            <div v-else>
              <p><b-spinner small label="Carregando lista de espécies..." /> Carregando lista de espécies...</p>
            </div>
          </div>
          <div>
            <div class="filters">
              <b-row>
                <b-col>
                  <div class="search">
                    <b-form-input v-model="filters.search" type="search" class="search" placeholder="O que você procura?" @keydown.enter.native="applyFilters" @input="filtersChanged"/>
                  </div>
                </b-col>
                <b-col>
                  <b-form-select v-model="filters.already_tested_in_direct_seedin" :options="[{ value: null, text: 'Ja testadas na Semeadura direta?' }, { value: true, text: 'Já testada' }, { value: false, text: 'Ainda não testada' }]" @input="filtersChanged" />
                </b-col>
                <b-col>
                  <b-form-select v-model="filters.vegetation_type" :options="vegetationTypes" @input="filtersChanged" />
                </b-col>
                <b-col>
                  <b-form-select v-model="filters.presence" :options="estados" @input="filtersChanged" />
                </b-col>
              </b-row>
              <div v-if="showFilterButton" class="text-center pb-4">
                <b-button variant="primary" block @click="applyFilters">Filtrar</b-button>
              </div>
            </div>
            <div v-if="species">
              <div v-for="specie in species" :key="specie._id" class="specie">
                <div class="name" @click="toggleSpecie(specie)">
                  {{ specie.scientific_name }}
                </div>
                <div v-if="currentSpecie == specie._id" class="info">
                  <div class="row">
                    <div class="col-sm-12">
                      <div class="title">
                        <strong>Identificação</strong>
                      </div>
                      <b-row>
                        <b-col>
                          <dl v-if="specie.code">
                            <dt>Código</dt>
                            <dd>
                              {{ specie.code }}
                            </dd>
                          </dl>
                        </b-col>
                        <b-col>
                          <dl v-if="specie.scientific_name">
                            <dt>Nome científico</dt>
                            <dd>
                              {{ specie.scientific_name }}
                            </dd>
                          </dl>
                        </b-col>
                        <b-col>
                          <dl v-if="specie.local_name">
                            <dt>Nomes populares</dt>
                            <dd>
                              {{ specie.local_name.join(', ') }}
                            </dd>
                          </dl>
                        </b-col>
                        <b-col>
                          <dl v-if="specie.family">
                            <dt>Família</dt>
                            <dd>
                              {{ specie.family }}
                            </dd>
                          </dl>
                        </b-col>
                      </b-row>
                    </div>
                    <div class="col-sm-12">
                      <div class="title">
                        <strong>Ocorrência / Indicação para plantio</strong>
                      </div>
                      <b-row>
                        <b-col>
                          <dl v-if="specie.biomes">
                            <dt>Bioma</dt>
                            <dd>
                              {{ specie.biomes.join(', ') }}
                            </dd>
                          </dl>
                        </b-col>
                        <b-col>
                          <dl v-if="specie.vegetation_types && specie.vegetation_types.length" class="ecosystem">
                            <dt>Tipos de Vegetação</dt>
                            <dd>
                              {{ specie.vegetation_types.join(', ') }}
                            </dd>
                          </dl>
                        </b-col>
                        <b-col>
                          <dl v-if="specie.presence && specie.presence.length" class="ecosystem">
                            <dt>Presença nos estados</dt>
                            <dd>
                              {{ specie.presence.join(', ') }}
                            </dd>
                          </dl>
                        </b-col>
                      </b-row>
                    </div>
                    <div class="col-sm-12">
                      <div class="title">
                        <strong>Classe de Sucessão</strong>
                      </div>
                      <b-row>
                        <b-col>
                          <dl v-if="specie.habit">
                            <dt>Hábito</dt>
                            <dd>
                              {{ specie.habit }}
                            </dd>
                          </dl>
                        </b-col>
                        <b-col>
                          <dl v-if="specie.origin">
                            <dt>Origem</dt>
                            <dd>
                              {{ specie.origin }}
                            </dd>
                          </dl>
                        </b-col>
                        <b-col>
                          <dl v-if="specie.cycle">
                            <dt>Longevidade</dt>
                            <dd>
                              {{ specie.cycle }}
                            </dd>
                          </dl>
                        </b-col>
                        <b-col>
                          <dl v-if="specie.occupation_strategy">
                            <dt>Estratégia de ocupação</dt>
                            <dd>
                              {{ specie.occupation_strategy }}
                            </dd>
                          </dl>
                        </b-col>
                      </b-row>
                    </div>
                    <div class="col-sm-12">
                      <div class="title">
                        <strong>Plantio das sementes</strong>
                      </div>
                      <b-row>
                        <b-col>
                          <dl v-if="specie.viability_rate">
                            <dt>Classe de % de estabelecimento em campo</dt>
                            <dd>
                              <span v-if="specie.viability_rate.from === 0"> {{ '&lt; ' + specie.viability_rate.to + '%' }}</span>
                              <span v-else-if="specie.viability_rate.to === 100"> {{ '&gt; ' + specie.viability_rate.from + '%' }}</span>
                              <span v-else> {{ specie.viability_rate.from + ' a ' + specie.viability_rate.to + '%' }}</span>
                              <span v-if="specie.viability_rate.description"> ({{ specie.viability_rate.description }})</span>
                            </dd>
                          </dl>
                        </b-col>
                        <b-col>
                          <dl v-if="specie.seeds_per_kg">
                            <dt>Número de sementes / Kg</dt>
                            <dd>{{ specie.seeds_per_kg }} sementes</dd>
                          </dl>
                        </b-col>
                        <b-col>
                          <dl v-if="specie.seed_conservations && specie.seed_conservations.length">
                            <dt>Conservação de Sementes - (Natureza das Sementes)</dt>
                            <dd v-for="seed_conservation in specie.seed_conservations" :key="seed_conservation._id">
                              {{ seed_conservation.nature_of_seeds }} <small v-if="seed_conservation.author">({{ seed_conservation.author.name }})</small>
                            </dd>
                          </dl>
                        </b-col>
                      </b-row>
                    </div>
                    <div class="col-sm-12">
                      <div class="title">
                        <strong>Produção das Sementes</strong>
                      </div>
                      <b-row>
                        <b-col>
                          <dl v-if="specie.seed_processings && specie.seed_processings.length">
                            <dt>Beneficiamento de sementes</dt>
                            <dd v-for="seed_processing in specie.seed_processings" :key="seed_processing._id">
                              {{ seed_processing.tip }} <small v-if="seed_processing.author">({{ seed_processing.author.name }})</small>
                            </dd>
                          </dl>
                        </b-col>
                        <b-col>
                          <dl v-if="specie.seed_storages && specie.seed_storages.length">
                            <dt>Armazenamento</dt>
                            <dd v-for="seed_storage in specie.seed_storages" :key="seed_storage._id">
                              {{ seed_storage.tip }} <small v-if="seed_storage.author">({{ seed_storage.author.name }})</small>
                            </dd>
                          </dl>
                        </b-col>
                        <b-col>
                          <dl v-if="specie.seed_collectings && specie.seed_collectings.length">
                            <dt>Coleta</dt>
                            <dd v-for="seed_collecting in specie.seed_collectings" :key="seed_collecting._id">
                              {{ seed_collecting.tip }} <small v-if="seed_collecting.author">({{ seed_collecting.author.name }})</small>
                            </dd>
                          </dl>
                        </b-col>
                        <b-col>
                          <dl v-if="specie.planting_tips">
                            <dt>Dicas de plantio</dt>
                            <dd>
                              {{ specie.planting_tips }}
                            </dd>
                          </dl>
                        </b-col>
                      </b-row>
                    </div>
                    <div class="col-sm-12">
                      <div class="title">
                        <strong>Informações gerais</strong>
                      </div>
                      <b-row>
                        <b-col>
                          <dl>
                            <dt>Espécie com dados quantificados sistematicamente?</dt>
                            <dd>{{ specie.systematically_quantified_data ? 'SIM' : 'NÃO' }}</dd>
                          </dl>
                        </b-col>
                        <b-col>
                          <dl>
                            <dt>Ja testadas na Semeadura direta?</dt>
                            <dd>{{ specie.already_tested_in_direct_seedin ? 'SIM' : 'NÃO' }}</dd>
                          </dl>
                        </b-col>
                        <b-col>
                          <dl>
                            <dt>Possui padrão de qualidade de análise (MAPA)?</dt>
                            <dd>{{ specie.mapa_standard_established ? 'SIM' : 'NÃO' }}</dd>
                          </dl>
                        </b-col>
                        <b-col>
                          <dl v-if="specie.lot_limit">
                            <dt>Limite de peso por lote</dt>
                            <dd>{{ specie.lot_limit | kg }} por lote</dd>
                          </dl>
                        </b-col>
                      </b-row>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
import https from 'https'
import axios from 'axios'
import mixinGlobal from '@/mixins/global'
import estados from '@/data/estados.json'
export default {
  mixins: [mixinGlobal],
  data() {
    return {
      estados,
      species: null,
      currentSpecie: null,
      vegetationTypes: [],
      showFilterButton: false,
      boolean_options: [
        { value: true, text: 'Sim' },
        { value: false, text: 'Não' }
      ],
      filters: {
        search: '',
        already_tested_in_direct_seedin: null,
        vegetation_type: null,
        presence: ''
      }
    }
  },
  computed: {

  },
  watch: {
    $route() {
      this.list()
    }
  },
  created() {
    this.estados[0].text = 'Presença em todos os estados'
    if (this.$route.query) {
      Object.keys(this.$route.query).forEach(param => {
        this.filters[param] = this.$route.query[param]
      })
    }
    this.list()
  },
  methods: {
    async list() {
      const agent = new https.Agent({
        rejectUnauthorized: false
      })
      const species = await axios.get('https://xingu.sementesdoxingu.org.br/api/species', {
        httpsAgent: agent,
        params: this.$route.query
      })
      this.species = species.data

      if (this.vegetationTypes.length === 0) {
        this.loadVegetationTypes()
      }
    },
    filtersChanged() {
      this.showFilterButton = true
    },
    applyFilters() {
      this.$router.push({ path: '/lista-de-especies', query: this.filters })
      this.showFilterButton = false
    },
    toggleSpecie(specie) {
      if (this.currentSpecie === specie._id) {
        this.currentSpecie = null
      } else {
        this.currentSpecie = specie._id
      }
    },
    loadVegetationTypes () {
      const vegetationTypes = {}
      this.species.forEach(specie => {
        specie.vegetation_types.forEach(vegetationType => {
          vegetationTypes[vegetationType] = true
        })
      })
      this.vegetationTypes = [{ value: null, text: 'Todos os tipos de vegetação' }].concat(Object.keys(vegetationTypes).sort((a, b) => a.localeCompare(b)))
    }
  },
  head() {
    return {
      title: 'Lista de espécies - ' + this.$store.state.site.name,
      meta: [{
        hid: 'description',
        name: 'description',
        content: this.$store.state.site.description
      }]
    }
  }
}
</script>
<style lang="sass">
  .species-page
    .pattern
      width: 15px
      height: 25px
      background-color: #fff
      position: absolute
    .title
      margin-left: 30px
      margin-bottom: 20px
      h3
        color: #fff
        font-size: 24px
        font-weight: 700
        text-transform: uppercase
      p
        color: #384e3f
        font-size: 12px
        text-transform: uppercase
    .filters
        .search
          margin-bottom: 30px
          input
            border-radius: 10px
            border: none
            font-weight: bold
            color: #384e3f
            font-size: 14px
            background-image: url('~assets/img/lupa.png')
            background-repeat: no-repeat
            background-position: calc(100% - 10px)
            &::placeholder
              color: #384e3f
          button
            border-radius: 10px
        select
          margin-bottom: 30px
          border-radius: 10px
          border: none
          font-weight: bold
          color: #384e3f
          font-size: 14px
          &::placeholder
            color: #384e3f
    .specie
      border: 1px solid #384e3f
      border-radius: 5px
      padding: 10px 15px
      font-size: 13px
      margin-bottom: 10px
      .name
        font-weight: bold
        font-size: 14px
        cursor: pointer
      .title
        border-bottom: 1px solid #fff
        padding-bottom: 10px
        margin-top: 10px
      .info
        margin-top: 10px
        dt
          margin-top: 7px
          margin-bottom: 7px
          color: #fff

</style>
