<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <b-form @submit.prevent="validate().then(save)">
      <b-row>
        <b-col md="12">
          <b-form-group label="Nome do grupo *">
            <validation-provider v-slot="{ errors }" name="nome" rules="required">
              <b-form-input v-model="form.name" name="name" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="Descrição curta *">
            <validation-provider v-slot="{ errors }" name="descrição" rules="required">
              <b-form-textarea v-model="form.description" name="description" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="Contatos *">
            <validation-provider v-slot="{ errors }" name="contatos" rules="required">
              <b-form-textarea v-model="form.contact" name="contact" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="Descrição completa do grupo">
            <quill-editor ref="quillEdit" v-model="form.content" />
            <input id="quillfile" type="file" hidden @change="quillUpload">
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="Localização *" description="Insira as coordenadas do item que deseja cadastrar ou clique no botão abaixo para selecionar seu endereço">
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
    womenGroup: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      estados,
      form: {
        name: '',
        description: '',
        contact: '',
        content: '',
        address: {
          location: {
            type: 'Point',
            coordinates: []
          }
        },
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
    this.toForm(this.form, this.womenGroup)
  },
  methods: {
    async save() {
      if (this.form.address && this.form.address.location && this.form.address.location.coordinates && this.form.address.location.coordinates.length > 1) {
        this.form.address.location.coordinates[0] = Number(this.form.address.location.coordinates[0])
        this.form.address.location.coordinates[1] = Number(this.form.address.location.coordinates[1])
      }
      if (this.womenGroup) {
        const womenGroup = await this.$axios.$put('/api/women_groups/' + this.womenGroup.slug, this.form).catch(this.showError)
        if (womenGroup) {
          this.$toast.success('Grupo de mulheres atualizado com sucesso!')
          if (this.$auth.hasScope('super') || this.$auth.hasScope('admin')) {
            this.$router.push('/admin/women_groups')
          } else {
            this.$router.push('/conta/grupos-de-mulheres')
          }
        }
      } else {
        const womenGroup = await this.$axios.$post('/api/women_groups', this.form).catch(this.showError)
        if (womenGroup) {
          if (this.$auth.hasScope('super') || this.$auth.hasScope('admin')) {
            this.$toast.success('Grupo de mulheres cadastrado com sucesso!')
            this.$router.push('/admin/women_groups')
          } else {
            this.$toast.success('Grupo de mulheres cadastrado com sucesso! Aguardando aprovação do administrador!')
            this.$router.push('/conta/grupos-de-mulheres')
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
