<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <b-form @submit.prevent="validate().then(save)">
      <b-row>
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
          <b-row>
            <b-col md="6">
              <b-form-group label="Estado">
                <b-form-input v-model="form.address.uf" />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Cidade">
                <b-form-input v-model="form.address.city" />
              </b-form-group>
            </b-col>
          </b-row>
        </b-col>
        <b-col md="12">
          <b-form-group label="Quantidade de plantios *">
            <validation-provider v-slot="{ errors }" name="quantidade" rules="required">
              <b-form-input v-model="form.qtd" name="qtd" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
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
import AddressForm from '@/components/admin/AddressForm'
import CoordinatesPreview from '@/components/admin/CoordinatesPreview'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    AddressForm,
    CoordinatesPreview
  },
  mixins: [mixinGlobal, mixinForm],
  props: {
    // eslint-disable-next-line
    plantingArea: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        qtd: null,
        address: {
          location: {
            type: 'Point',
            coordinates: []
          },
          uf: '',
          city: ''
        }
      }
    }
  },
  created() {
    this.toForm(this.form, this.plantingArea)
  },
  methods: {
    async save() {
      if (this.form.address && this.form.address.location && this.form.address.location.coordinates && this.form.address.location.coordinates.length > 1) {
        this.form.address.location.coordinates[0] = Number(this.form.address.location.coordinates[0])
        this.form.address.location.coordinates[1] = Number(this.form.address.location.coordinates[1])
      }
      if (this.plantingArea) {
        const plantingArea = await this.$axios.$put('/api/planting_areas/' + this.plantingArea._id, this.form).catch(this.showError)
        if (plantingArea) {
          this.$toast.success('Área de plantio atualizada com sucesso!')
          this.$router.push('/admin/planting_areas')
        }
      } else {
        const plantingArea = await this.$axios.$post('/api/planting_areas', this.form).catch(this.showError)
        if (plantingArea) {
          this.$toast.success('Área de plantio cadastrada com sucesso!')
          this.$router.push('/admin/planting_areas')
        }
      }
    },
    setAddress(address) {
      this.form.address = address
    }
  }
}
</script>
