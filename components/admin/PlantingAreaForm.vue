<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <b-form @submit.prevent="validate().then(save)">
      <b-row>
        <b-col md="12">
          <CoordinatesPreview :form="form" />
          <div>
            <address-form v-model="form.address" :autoload="false" />
          </div>
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
