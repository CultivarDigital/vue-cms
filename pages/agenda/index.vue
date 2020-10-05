<template>
  <div class="events-page">
    <section class="content pb-5">
      <b-container>
        <div class="pt-5">
          <div class="pattern" />
          <div class="title">
            <h3>Eventos</h3>
            <div v-if="events">
              <p v-if="events.length === 1"><strong>1</strong> EVENTO ENCONTRADO <span v-if="filters.category">em <n-link :to="'/biblioteca?categoria=' + filters.category"><strong>{{ filters.category }}</strong></n-link></span></p>
              <p v-else><strong>{{ events.length }}</strong> EVENTOS ENCONTRADOS <span v-if="filters.category">em <n-link :to="'/biblioteca?categoria=' + filters.category"><strong>{{ filters.category }}</strong></n-link></span></p>
              <h3 v-if="events && events.length === 0" class="text-center">Nenhuma evento encontrada</h3>
            </div>
            <div v-else>
              <p><b-spinner small label="Carregando eventos..." /> Carregando lista de eventos...</p>
            </div>
          </div>
          <div>
            <div v-if="events">
              <v-calendar class="custom-calendar" locale="pt-BR" :attributes="events">
                <div slot="day-content" slot-scope="{ day, attributes }" class="flex flex-col h-full z-10 overflow-hidden">
                  <span class="day-label text-sm text-gray-900">{{ day.day }}</span>
                  <div class="flex-grow overflow-y-scroll overflow-x-auto">
                    <p v-for="attr in attributes" :key="attr.key" class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1" :class="attr.customData.class">
                      {{ attr.customData.title }}
                    </p>
                  </div>
                </div>
              </v-calendar>
            </div>
          </div>
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
// import https from 'https'
// import axios from 'axios'
import mixinGlobal from '@/mixins/global'
import estados from '@/data/estados.json'
export default {
  mixins: [mixinGlobal],
  data() {
    return {
      estados,
      events: null,
      currentSpecie: null,
      vegetationTypes: [],
      cycles: [
        {
          value: null,
          text: 'Todos os ciclos'
        },
        '0 - 6 meses',
        'até 3 anos',
        '3 a 10 anos',
        '10 a 20 anos',
        '20 a 100 anos',
        '>100 anos'
      ],
      showFilterButton: false,
      filters: {
        search: '',
        already_tested_in_direct_seedin: null,
        vegetation_type: null,
        cycle: null,
        presence: ''
      }
    }
  },
  watch: {
    $route() {
      this.list()
    }
  },
  created() {
    this.estados[0].text = 'Todos os estados'
    if (this.$route.query) {
      Object.keys(this.$route.query).forEach(param => {
        this.filters[param] = this.$route.query[param]
      })
    }
    this.list()
  },
  methods: {
    list() {
      this.events = [
        {
          key: 1,
          customData: {
            title: 'Lunch with mom.',
            class: 'text-primary'
          },
          dates: new Date()
        },
        {
          key: 2,
          customData: {
            title: 'Take Noah to basketball practice',
            class: 'bg-blue-500'
          },
          dates: new Date(2020, 10, 2)
        },
        {
          key: 3,
          customData: {
            title: 'Noahs basketball game.',
            class: 'bg-blue-500'
          },
          dates: new Date(2020, 10, 5)
        }
      ]
    },
    filtersChanged() {
      this.showFilterButton = true
    }
  },
  head() {
    return {
      title: 'Eventos - ' + this.$store.state.site.name,
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
  .events-page
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
        color: #00794e
        font-size: 12px
        text-transform: uppercase

    .custom-calendar
      width: 100%
      .vc-day
        border-right: 1px solid #AAA
        border-bottom: 1px solid #AAA
        padding: 3px
      .on-top
        border-top: 1px solid #AAA
      .on-left
        border-left: 1px solid #AAA
      .event
        word-wrap: break-word
        word-break: break-all
      .event-badge
        white-space: normal
        border-radius: 5px
        margin-top: 2px
        text-align: left
      .event-badge
        color: #FFF
</style>
