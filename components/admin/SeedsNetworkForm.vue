<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <b-form @submit.prevent="validate().then(save)">
      <b-row>
        <b-col md="12">
          <b-form-group label="Nome da rede *">
            <validation-provider v-slot="{ errors }" name="nome" rules="required">
              <b-form-input v-model="form.name" name="name" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="Sede da rede" description="Município/Estado">
            <b-form-input v-model="form.headquarters" name="headquarters" />
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="Endereço *" description="Insira as coordenadas do item que deseja cadastrar ou clique no botão abaixo para selecionar seu endereço">
            <b-row>
              <b-col>
                <validation-provider v-slot="{ errors }" name="latitude" rules="required">
                  <b-form-input v-model="form.address.location.coordinates[0]" name="latitude" placeholder="Latitude" type="number" min="-90.000000" max="90.000000" step="0.000000001" />
                  <span class="text-danger">{{ errors[0] }}</span>
                </validation-provider>
              </b-col>
              <b-col>
                <validation-provider v-slot="{ errors }" name="longitude" rules="required">
                  <b-form-input v-model="form.address.location.coordinates[1]" name="longitude" placeholder="Longitude" type="number" min="-180.000000" max="180.000000" step="0.000000001" />
                  <span class="text-danger">{{ errors[0] }}</span>
                </validation-provider>
              </b-col>
            </b-row>
            <CoordinatesPreview :form="form" />
          </b-form-group>
          <div class="text-right">
            <address-form :current-address="form.address" :autoload="false" @input="setAddress" />
          </div>
        </b-col>
        <b-col md="12">
          <form-phones v-model="form.phones" />
        </b-col>
        <b-col md="12">
          <b-form-group label="Email">
            <b-form-input v-model="form.email" type="email" />
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="Link do Site">
            <b-form-input v-model="form.site_url" />
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="Outras informações">
            <b-form-textarea v-model="form.notes" />
          </b-form-group>
        </b-col>
        <b-col md="12">
          <pictures-upload :form="form" field="pictures" url="/api/uploads/images" :multiple="true" />
        </b-col>
      </b-row>
      <br>
      <b-button type="submit" variant="primary" block :disabled="invalid">
        Salvar
      </b-button>
    </b-form>
  </ValidationObserver>
</template>

<script>
import {
  ValidationObserver,
  ValidationProvider
} from 'vee-validate'
import mixinGlobal from '@/mixins/global'
import mixinForm from '@/mixins/form'
import PicturesUpload from '@/components/admin/PicturesUpload'
import AddressForm from '@/components/admin/AddressForm'
import CoordinatesPreview from '@/components/admin/CoordinatesPreview'
import estados from '@/data/estados.json'
import cidades from '@/data/cidades.json'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    PicturesUpload,
    AddressForm,
    CoordinatesPreview
  },
  mixins: [mixinGlobal, mixinForm],
  props: {
    // eslint-disable-next-line
    seedsNetwork: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      estados,
      tab: null,
      form: {
        name: '',
        headquarters: '',
        address: {
          location: {
            type: 'Point',
            coordinates: []
          }
        },
        phones: [''],
        email: '',
        site_url: '',
        notes: '',
        pictures: []
      },
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }
  },
  computed: {
    cidades () {
      if (this.form.state) {
        return cidades[this.form.state]
      }
      return null
    }
  },
  created() {
    this.toForm(this.form, this.seedsNetwork)
  },
  methods: {
    async save() {
      if (this.form.address && this.form.address.location && this.form.address.location.coordinates && this.form.address.location.coordinates.length > 1) {
        this.form.address.location.coordinates[0] = Number(this.form.address.location.coordinates[0])
        this.form.address.location.coordinates[1] = Number(this.form.address.location.coordinates[1])
      }
      if (this.seedsNetwork) {
        const seedsNetwork = await this.$axios.$put('/api/seeds_networks/' + this.seedsNetwork.slug, this.form).catch(this.showError)
        if (seedsNetwork) {
          this.$toast.success('Rede de sementes atualizada com sucesso!')
          if (this.$auth.hasScope('super') || this.$auth.hasScope('admin')) {
            this.$router.push('/admin/seeds_networks')
          } else {
            this.$router.push('/conta/redes-de-sementes')
          }
        }
      } else {
        const seedsNetwork = await this.$axios.$post('/api/seeds_networks', this.form).catch(this.showError)
        if (seedsNetwork) {
          if (this.$auth.hasScope('super') || this.$auth.hasScope('admin')) {
            this.$toast.success('Rede de sementes cadastrada com sucesso!')
            this.$router.push('/admin/seeds_networks')
          } else {
            this.$toast.success('Rede de sementes cadastrada com sucesso! Aguardando aprovação do administrador!')
            this.$router.push('/conta/redes-de-sementes')
          }
        }
      }
    },
    setAddress(address) {
      this.form.address = address
    }
  }
}
</script>
