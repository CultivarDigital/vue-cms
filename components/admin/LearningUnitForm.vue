<template>
  <div class="learning-unit-form">
    <div>
      <b-tabs v-model="tab" content-class="mt-3" card pills>
        <b-tab title="Informações gerais">
          <div v-if="tab === 0">
            <ValidationObserver v-slot="{ validate, invalid }">
              <b-form @submit.prevent="validate().then(save)">
                <b-row>
                  <b-col md="12">
                    <b-form-group label="Nome para a Unidade de Aprendizagem *">
                      <validation-provider v-slot="{ errors }" name="nome" rules="required">
                        <b-form-input v-model="form.name" name="name" />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col md="12">
                    <b-form-group label="Descrição básica *">
                      <validation-provider v-slot="{ errors }" name="descrição" rules="required">
                        <b-form-textarea v-model="form.description" name="description" />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group label="Mês e Ano de plantio *">
                      <validation-provider v-slot="{ errors }" name="época de plantio" rules="required">
                        <client-only>
                          <date-picker v-model="form.planting_time" :default-value="new Date()" type="month" format="MM/YYYY" value-type="format" />
                        </client-only>
                        <span class="text-danger">{{ errors[0] }}</span>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col md="6">
                    <b-form-group label="Tamanho da área (em hectares) *" :description="form.area_size ? form.area_size + ' hectares' : null">
                      <validation-provider v-slot="{ errors }" name="tamanho da área" rules="required">
                        <b-form-input v-model="form.area_size" name="area_size" type="number" />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </validation-provider>
                    </b-form-group>
                  </b-col>
                  <b-col md="12">
                    <b-form-group label="Gostaria de disponibilizar a área para visitas técnicas?">
                      <b-form-checkbox v-model="form.receive_technical_visits" />
                    </b-form-group>
                  </b-col>
                  <b-col v-if="form.receive_technical_visits" md="12">
                    <b-form-group label="Informe a periodicidade disponível para visitas">
                      <b-form-textarea v-model="form.availability_for_technical_visits" />
                    </b-form-group>
                  </b-col>
                  <b-col v-if="form.receive_technical_visits" md="12">
                    <b-form-group label="Informe nome e contatos (email e telefone) do(a) responsável pelo agendamento das visitas">
                      <b-form-textarea v-model="form.responsible_for_technical_visits" />
                    </b-form-group>
                  </b-col>
                  <b-col md="12">
                    <b-form-group label="Coordenadas Google Maps *" description="Insira as coordenadas do item que deseja cadastrar ou clique no botão abaixo para selecionar seu endereço">
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
                    </b-form-group>
                    <CoordinatesPreview :form="form" />
                    <div class="text-right">
                      <address-form :current-address="form.address" :autoload="false" @input="setAddress" />
                    </div>
                    <b-row>
                      <b-col md="6">
                        <b-form-group label="Estado">
                          <b-form-select v-model="form.address.uf" :options="estados" />
                        </b-form-group>
                      </b-col>
                      <b-col md="6">
                        <b-form-group v-if="form.address.uf" label="Cidade">
                          <b-form-select v-model="form.address.city" :options="cidades" />
                        </b-form-group>
                      </b-col>
                    </b-row>
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
          </div>
        </b-tab>
        <b-tab v-if="learningUnit" title="Diagnóstico" lazy>
          <DiagnosisForm :learning-unit="learningUnit._id" />
        </b-tab>
        <b-tab v-if="learningUnit" title="Preparo da área" lazy>
          <PreparationForm :learning-unit="learningUnit._id" />
        </b-tab>
        <b-tab v-if="learningUnit" title="Plantio" lazy>
          <PlantingForm :learning-unit="learningUnit._id" />
        </b-tab>
        <b-tab v-if="learningUnit" title="Monitoramento" lazy>
          <MonitoringForm :learning-unit="learningUnit._id" />
        </b-tab>
        <b-tab v-if="learningUnit" title="Manejo/Manutenção" lazy>
          <MaintenanceForm :learning-unit="learningUnit._id" />
        </b-tab>
        <b-tab v-if="learningUnit" title="Colheita" lazy>
          <HarvestForm :learning-unit="learningUnit._id" />
        </b-tab>
      </b-tabs>
    </div>
  </div>
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
import DiagnosisForm from '@/components/admin/DiagnosisForm'
import PreparationForm from '@/components/admin/PreparationForm'
import PlantingForm from '@/components/admin/PlantingForm'
import MonitoringForm from '@/components/admin/MonitoringForm'
import MaintenanceForm from '@/components/admin/MaintenanceForm'
import HarvestForm from '@/components/admin/HarvestForm'
import estados from '@/data/estados.json'
import cidades from '@/data/cidades.json'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    PicturesUpload,
    AddressForm,
    CoordinatesPreview,
    DiagnosisForm,
    PreparationForm,
    PlantingForm,
    MonitoringForm,
    MaintenanceForm,
    HarvestForm
  },
  mixins: [mixinGlobal, mixinForm],
  props: {
    // eslint-disable-next-line
    learningUnit: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      estados,
      tab: 0,
      form: {
        name: '',
        description: '',
        planting_time: '',
        area_size: null,
        address: {
          city: '',
          uf: '',
          location: {
            type: 'Point',
            coordinates: []
          }
        },
        pictures: [],

        receive_technical_visits: false,
        availability_for_technical_visits: '',
        responsible_for_technical_visits: ''
      }
    }
  },
  computed: {
    cidades () {
      if (this.form.address.uf) {
        return cidades[this.form.address.uf]
      }
      return null
    }
  },
  created() {
    this.toForm(this.form, this.learningUnit)
  },
  methods: {
    async save() {
      if (this.form.address && this.form.address.location && this.form.address.location.coordinates && this.form.address.location.coordinates.length > 1) {
        this.form.address.location.coordinates[0] = Number(this.form.address.location.coordinates[0])
        this.form.address.location.coordinates[1] = Number(this.form.address.location.coordinates[1])
      }
      if (this.learningUnit) {
        const learningUnit = await this.$axios.$put('/api/learning_units/' + this.learningUnit.slug, this.form).catch(this.showError)
        if (learningUnit) {
          this.$toast.success('Unidade de aprendizagem atualizada com sucesso!')
          if (this.$auth.hasScope('super') || this.$auth.hasScope('admin')) {
            this.$router.push('/admin/learning_units')
          } else {
            this.$router.push('/conta/unidades-de-aprendizagem')
          }
        }
      } else {
        const learningUnit = await this.$axios.$post('/api/learning_units', this.form).catch(this.showError)
        if (learningUnit) {
          if (this.$auth.hasScope('super') || this.$auth.hasScope('admin')) {
            this.$toast.success('Unidade de aprendizagem cadastrada com sucesso!')
            this.$router.push('/admin/learning_units')
          } else {
            this.$toast.success('Unidade de aprendizagem cadastrada com sucesso! Aguardando aprovação do administrador!')
            this.$router.push('/conta/unidades-de-aprendizagem')
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
