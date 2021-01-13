<template>
  <div class="address-form">
    <!-- <b-row>
      <b-col md="6">
        <b-form-group label="Estado">
          <b-form-select v-model="form.uf" :options="estados" @input="cb" />
        </b-form-group>
      </b-col>
      <b-col md="6">
        <b-form-group v-if="form.uf" label="Cidade">
          <b-form-select v-model="form.city" :options="cidades" @input="cb" />
        </b-form-group>
      </b-col>
    </b-row> -->
    <b-button v-if="currentAddressFilled" class="btn btn-default btn-block" @click="show_modal = !show_modal">Mudar endereço</b-button>
    <b-button v-else class="btn btn-default btn-block" @click="show_modal = !show_modal"><client-only><font-awesome-icon :icon="['fas', 'map-marker']" /></client-only> Configurar endereço</b-button>
    <b-modal v-model="show_modal" title="Localização" hide-footer hide-header>
      <div v-if="show_auto_complete">
        <div v-if="!addressFilled">
          <b-form-group label="Digite seu endereço para buscar a localização.">
            <b-form-input v-model="address_input" class="input-lg" @keyup.enter="searchByAddress" />
            <br>
            <div class="text-right">
              <small>Ex: rua das nascentes, alto paraíso, goiás</small>
              <b-button class="btn btn-primary btn-sm pull-right" @click="getLocation()">Usar GPS</b-button>
            </div>
            <div class="clearfix" />
            <p class="text-center">
              <button v-if="address_input" class="btn btn-primary" @click="searchByAddress">Buscar endereço</button>
            </p>
            <p v-if="loading_gps" class="text-center">
              <small><i class="fa fa-spinner fa-spin" /> Buscando dados do GPS...</small>
            </p>
          </b-form-group>
        </div>
        <div v-else class="text-center">
          <div v-if="Array.isArray(address)" class="text-center">
            <h4>Algum desses é seu endereço?</h4>
            <table class="table md-auto">
              <tr v-for="(a, index) in address" :key="index" class="table">
                <td class="text-left">
                  {{ a.description }}
                </td>
                <td class="text-right">
                  <button class="btn btn-primary btn-sm" @click="setAddressForm(a)">Selecionar</button>
                </td>
              </tr>
            </table>
            <button class="btn btn-default" @click="showAutoComplete()">Nenhum desses é meu endereço</button>
          </div>
          <div v-else class="text-center">
            <h3>Este é seu endereço?</h3>
            <h5>{{ address.description }}</h5>
            <div v-if="address && address.location && address.location.coordinates && address.location.coordinates.length === 2">
              <l-map :zoom="16" :center="address.location.coordinates" :options="{ scrollWheelZoom: false }" style="height: 250px">
                <l-tile-layer :url="url" :attribution="attribution" />
                <l-marker :lat-lng="address.location.coordinates" draggable @dragend="updateMarker">
                  <l-tooltip>Clique e arraste para refinar sua localização.</l-tooltip>
                </l-marker>
              </l-map>
              <p>
                <small>Coordenadas: {{ address.location.coordinates.join(',') }}</small>
              </p>
            </div>
            <button class="btn btn-primary" @click="setAddressForm(address)">Sim</button>
            <button class="btn btn-default" @click="showAutoComplete()">Não</button>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="form-address">
          <h5 class="text-center">Complete os dados e confirme o endereço</h5>
          <div class="row">
            <div class="col-sm-6">
              <b-form-group label="Estado">
                <b-form-input v-model="form.uf" class="form-control" />
              </b-form-group>
            </div>
            <div class="col-sm-6">
              <b-form-group label="Cidade">
                <b-form-input v-model="form.city" class="form-control" />
              </b-form-group>
            </div>
            <div class="col-sm-12">
              <b-form-group label="Endereço/Rua/Av">
                <b-form-input v-model="form.street" name="street" />
              </b-form-group>
            </div>
            <div class="col-sm-9">
              <b-form-group label="Bairro">
                <b-form-input v-model="form.neighborhood" name="neighborhood" />
              </b-form-group>
            </div>
            <div class="col-sm-3">
              <b-form-group label="Número">
                <b-form-input v-model="form.number" name="number" />
              </b-form-group>
            </div>
            <div class="col-sm-9">
              <b-form-group label="Complemento">
                <b-form-input v-model="form.complement" name="complement" />
              </b-form-group>
            </div>
            <div class="col-sm-3">
              <b-form-group label="CEP">
                <b-form-input v-model="form.postal_code" />
              </b-form-group>
            </div>
          </div>
        </div>
        <button class="btn btn-primary" @click="confirmAddress()">Confirmar endereço</button>
        <button class="btn btn-default" @click="showAutoComplete()">Mudar localização</button>
      </div>
    </b-modal>
  </div>
</template>
<script>
import axios from 'axios'
import estados from '@/data/estados.json'
import cidades from '@/data/cidades.json'

const emptyForm = {
  city: '',
  uf: '',
  street: '',
  number: '',
  neighborhood: '',
  complement: '',
  postal_code: '',
  description: '',
  source: '',
  location: {
    type: 'Point',
    coordinates: []
  }
}

export default {
  props: {
    value: {
      type: Object,
      default: null
    },
    autoload: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      estados,
      loading_gps: false,
      show_modal: false,
      address: null,
      location: null,
      address_input: '',
      show_auto_complete: true,
      form: emptyForm,
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }
  },
  computed: {
    currentAddressFilled () {
      return this.value && this.value.location && this.value.location.coordinates && this.value.location.coordinates.length === 2
    },
    addressFilled () {
      return Array.isArray(this.address) || (this.address && this.address.location && this.address.location.coordinates && this.address.location.coordinates.length === 2)
    },
    cidades () {
      if (this.form.uf) {
        return cidades[this.form.uf]
      }
      return null
    }
  },
  created() {
    if (!this.inputFilled && this.autoload) {
      this.show_modal = true
      this.getLocation()
    } else {
      this.address = this.value
      if (this.value) {
        Object.keys(this.form).forEach(k => {
          this.form[k] = this.value[k]
        })
      }
    }
  },
  methods: {
    getLocation() {
      if (navigator.geolocation) {
        this.loading_gps = true
        navigator.geolocation.getCurrentPosition(position => {
          this.searchByLocation(position.coords.latitude, position.coords.longitude)
        }, this.locationError)
      } else {
        this.locationError()
      }
    },
    searchByLocation(latitude, longitude) {
      axios.get('https://us1.locationiq.com/v1/reverse.php?key=81b80182fef784&lat=' + latitude + '&lon=' + longitude + '&accept-language=pt-BR&normalizecity=1&format=json').then(resp => {
        this.address = this.parseAddress(resp.data.address, latitude, longitude)
        this.loading_gps = false
      }).catch(this.locationError)
    },
    searchByAddress() {
      axios.get('https://us1.locationiq.com/v1/search.php?key=81b80182fef784&q=' + encodeURI(this.address_input) + '&addressdetails=1&limit=10&countrycodes=BR&accept-language=pt-BR&normalizecity=1&format=json').then(resp => {
        const data = resp.data
        if (data.length === 1) {
          const address = data[0]
          this.address = this.parseAddress(address.address, address.lat, address.lon)
        } else {
          this.address = data.map(address => {
            return this.parseAddress(address.address, address.lat, address.lon)
          })
        }
      }).catch(this.showError)
    },
    updateMarker(location) {
      location = location.target._latlng
      this.searchByLocation(location.lat, location.lng)
    },
    parseAddress(address, latitude, longitude) {
      const a = {}
      a.street = address.road
      a.neighborhood = address.neighbourhood || address.hamlet || address.suburb
      a.city = address.city || address.city_district || address.village || address.town
      a.uf = address.state || address.state_district
      if (a.uf.length !== 2) {
        const estado = estados.find(e => e.text === a.uf)
        if (estado) {
          a.uf = estado.value
        }
      }
      a.postal_code = address.postcode

      a.description = [a.street, a.neighborhood, a.city, a.uf, a.postal_code].filter(i => i).join(', ')

      a.location = {
        type: 'Point',
        coordinates: [Number(latitude), Number(longitude)]
      }

      // a.source = address
      return a
    },
    setAddressForm(address) {
      this.address = address
      Object.keys(this.form).forEach(k => {
        this.form[k] = this.address[k]
      })
      this.show_auto_complete = false
    },
    confirmAddress() {
      this.form.description = [
        this.form.street,
        this.form.number,
        this.form.complement,
        this.form.neighborhood,
        this.form.city,
        this.form.uf,
        this.form.postal_code
      ].filter(i => i).join(', ')

      this.show_modal = false
      this.cb()
    },
    showAutoComplete() {
      this.address = null
      this.form = emptyForm
      this.show_auto_complete = true
    },
    locationError() {
      this.notify('Não foi possível encontrar seu endereço automaticamente.', 'warn')
      this.loading_gps = false
    },
    cb () {
      this.$emit('input', this.form)
    }
  }
}
</script>
