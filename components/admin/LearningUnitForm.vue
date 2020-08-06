<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <b-form @submit.prevent="validate().then(save)">
      <b-card no-body>
        <b-tabs content-class="mt-3" card pills>
          <b-tab title="Informações gerais" active>
            <b-row>
              <b-col md="12">
                <b-form-group label="Nome para a Unidade de Aprendizagem *">
                  <validation-provider v-slot="{ errors }" name="nome" rules="required">
                    <b-form-input v-model="form.name" name="name" />
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
                <b-form-group label="Coordenadas Google Maps *" description="Inserir coordenadas da área ou do município que deseja cadastrar">
                  <b-row>
                    <b-col>
                      <validation-provider v-slot="{ errors }" name="latitude" rules="required">
                        <b-form-input v-model="form.address.location.coordinates[0]" name="latitude" placeholder="Latitude" type="number" min="-90.000000" max="90.000000" step="0.000001" />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </validation-provider>
                    </b-col>
                    <b-col>
                      <validation-provider v-slot="{ errors }" name="longitude" rules="required">
                        <b-form-input v-model="form.address.location.coordinates[1]" name="longitude" placeholder="Longitude" type="number" min="-180.000000" max="180.000000" step="0.000001" />
                        <span class="text-danger">{{ errors[0] }}</span>
                      </validation-provider>
                    </b-col>
                  </b-row>
                  <div v-if="validCoordinates">
                    <!-- <br>
                    <l-map :zoom="16" :center="form.address.location.coordinates" style="height: 30vw" :scrollWheelZoom="false">
                      <l-tile-layer :url="url" :attribution="attribution" />
                      <l-marker :lat-lng="form.address.location.coordinates" />
                    </l-map>
                    <p>
                      <small>Coordenadas: {{ form.address.location.coordinates.join(',') }}</small>
                    </p> -->
                  </div>
                </b-form-group>
                <div class="text-right">
                  <address-form :current_address="form.address" :autoload="false" @input="setAddress" />
                </div>
              </b-col>
              <b-col md="12">
                <pictures-upload :form="form" field="pictures" url="/api/uploads/images" :multiple="true" />
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Disponibilidade de receber visitas">
            <b-row>
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
            </b-row>
          </b-tab>
          <b-tab title="Diagnóstico e preparo da área">
            <h4>Histórico de Ocupação</h4>
            <b-row>
              <b-col md="12">
                <b-form-group label="Vegetação original">
                  <b-form-radio-group v-model="form.original_vegetation" :options="['Cerrado', 'Floresta estacional', 'Floresta ombrófila', 'Floresta ripária', 'Mata de várzea', 'Mata de brejo', 'Campo úmido']" />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Ano do desmatamento">
                  <b-form-radio-group v-model="form.year_of_deforestation" :options="['< 1 ano', '1 a 5 anos', '5 a 10 anos', '> 10 anos']" />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Tipo de uso anterior">
                  <b-form-radio-group v-model="form.previous_use_type" :options="['Pastagem', 'Agricultura', 'Aterro', 'Cultura Perene', 'Retirada de terra/Mineração']" />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Duração do uso anterior (último uso)">
                  <b-form-radio-group v-model="form.duration_of_previous_use" :options="['< 1 ano', '1 a 5 anos', '5 a 10 anos', '> 10 anos']" />
                </b-form-group>
              </b-col>
            </b-row>
            <h4>Análise da área</h4>
            <b-row>
              <b-col md="12">
                <b-form-group label="Tipo de Solo">
                  <b-form-radio-group v-model="form.soil_type" :options="['Cascalho', 'Areno-argiloso', 'Arenoso', 'Argiloso']" />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Umidade do Solo">
                  <b-form-radio-group v-model="form.soil_moisture" :options="['Seco', 'Encharcado', 'Inundado periodicamente']" />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Declividade (a mais acentuada dentro da área do plantio)">
                  <b-form-radio-group v-model="form.declivity" :options="['Plano', 'Suavemente inclinado', 'Inclinado', 'Muito inclinado']" />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Compactação do solo">
                  <b-form-radio-group v-model="form.soil_compaction" :options="['Muito compactado', 'Pouco compactado', 'Terra fofa']" />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Conservação do solo">
                  <b-form-radio-group v-model="form.soil_conservation" :options="['Curvas de nível', 'Bacias de contenção', 'Aterramento', 'Drenagem', 'Nenhum', 'Outros']" />
                  <b-form-input v-if="form.soil_conservation === 'Outros'" v-model="form.soil_conservation_other" placeholder="Especifique aqui" />
                </b-form-group>
              </b-col>
            </b-row>
            <h4>Análise da paisagem</h4>
            <b-row>
              <b-col md="12">
                <b-form-group label="Mata nativa mais próxima (km)">
                  <b-form-input v-model="form.nearest_forest" type="number" />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Vegetação da mata mais próxima">
                  <b-form-radio-group v-model="form.nearest_forest_vegetation" :options="['Igual a que vai ser recuperada', 'Diferente']" />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Tamanho do fragmento">
                  <b-form-radio-group v-model="form.fragment_size" :options="['< 10 ha ou estreita', 'Entre 10 e 50 ha', '> 100 ha']" />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Regeneração Natural da área do plantio">
                  <b-form-radio-group v-model="form.natural_regeneration" :options="['Rala e pobre', 'Densa e pobre', 'Rala e rica', 'Densa e rica']" />
                </b-form-group>
              </b-col>
            </b-row>
            <h4>Fatores de pertubação</h4>
            <b-row>
              <b-col md="12">
                <b-form-group label="Presença de gado e/ou outros animais">
                  <b-form-radio-group v-model="form.presence_of_other_animals" :options="['Sim', 'Não']" />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Frequência de queimadas">
                  <b-form-radio-group v-model="form.firing_frequency" :options="['1 ano vez por ano', 'A cada 2 anos', 'Outros']" />
                  <b-form-input v-if="form.firing_frequency === 'Outros'" v-model="form.firing_frequency_other" placeholder="Especifique aqui" />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Data do último fogo">
                  <b-form-radio-group v-model="form.last_fire" :options="['< 1 ano', 'entre 1 e 3 anos', '> 3 anos']" />
                </b-form-group>
              </b-col>
            </b-row>
            <h4>Preparo da área</h4>
            <b-row>
              <b-col md="12">
                <b-form-group label="Uso de herbicida">
                  <b-form-radio-group v-model="form.herbicide_use" :options="['Sim', 'Não']" />
                </b-form-group>
              </b-col>
              <b-col v-if="form.herbicide_use === 'Sim'" md="12">
                <b-form-group label="Qual herbicida?">
                  <b-form-input v-model="form.herbicide" />
                </b-form-group>
              </b-col>
              <b-col v-if="form.herbicide_use === 'Sim'" md="12">
                <b-form-group label="Qual frequência da aplicação de herbicida?">
                  <b-form-input v-model="form.herbicide_frequency" />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Sobrepastejo">
                  <b-form-radio-group v-model="form.overgrazing" :options="['Sim', 'Não']" />
                </b-form-group>
              </b-col>
              <b-col v-if="form.overgrazing === 'Sim'" md="12">
                <b-form-group label="Quantas cabeças e por quanto tempo?">
                  <b-form-input v-model="form.overgrazing_frequency" />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Preparo do solo mecanizado ou manual?">
                  <b-form-radio-group v-model="form.soil_preparation" :options="['Mecanizado', 'Manual']" />
                </b-form-group>
              </b-col>
              <b-col v-if="form.soil_preparation === 'Mecanizado'" md="12">
                <b-form-group label="Número de gradagens">
                  <b-form-input v-model="form.screenings_number" type="number" />
                </b-form-group>
                <b-form-group label="Número de nivelamentos">
                  <b-form-input v-model="form.levels_number" type="number" />
                </b-form-group>
                <b-form-group label="Frequência das gradagens">
                  <b-form-input v-model="form.screenings_frequency" />
                </b-form-group>
              </b-col>
              <b-col v-if="form.soil_preparation === 'Manual'" md="12">
                <b-form-group label="Número de roçadas semi-mecanizadas">
                  <b-form-input v-model="form.semi_mechanized_mowing_number" type="number" />
                </b-form-group>
                <b-form-group label="Número de roçadas manuais">
                  <b-form-input v-model="form.manual_mowing_number" type="number" />
                </b-form-group>
                <b-form-group label="Frequência das roçadas">
                  <b-form-input v-model="form.mowing_frequency" />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Adubação">
                  <b-form-radio-group v-model="form.fertilizing" :options="['Adubação química', 'Calagem', 'Adubação orgânica', 'Adubação verde', 'NA']" />
                  <b-form-input v-if="form.fertilizing === 'NA'" v-model="form.fertilizing_other" placeholder="Especifique aqui" />
                </b-form-group>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Plantio">
            <b-row>
              <b-col md="6">
                <b-form-group label="Estado">
                  <b-form-select v-model="form.state" :options="estados" />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Cidade" v-if="form.state">
                  <b-form-select v-model="form.city" :options="cidades" />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="12">
                <b-form-group label="Bioma">
                  <b-form-radio-group v-model="form.biome" :options="['Amazônia', 'Caatinga', 'Cerrado', 'Mata Atlântica', 'Pampa', ' Pantanal']" />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Fitofisionomia">
                  <b-form-radio-group v-model="form.vegetation_type" :options="['Cerrado', 'Floresta estacional', 'Floresta ombrófila', 'Floresta ripária', 'Mata de várzea', 'Mata de brejo', 'Campo úmido']" />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Características da propriedade" description="Especificar melhor como: área pública ou privada? Atividade produtiva da propriedade?">
                  <b-form-textarea v-model="form.property_features" />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Sistema de restauração/técnica utilizada">
                  <b-form-radio-group v-model="form.restoration_system" :options="['Plantio total mecanizado a lanço', 'Mecanizado em linhas', 'Plantio total manual a lanço', 'Plantio manual e covetas/covas', 'Plantio manual em linhas', 'Plantio manual em covetas intercalado com mudas', 'Outros']" />
                  <b-form-input v-if="form.restoration_system === 'Outros'" v-model="form.restoration_system_other" placeholder="Especifique aqui" />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Se foi mecanizado ou semi-mecanizado, qual implemento utilizou?">
                  <b-form-textarea v-model="form.restoration_system_implement" />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Quantidade (Kg) de sementes nativas plantadas por hectare">
                  <b-form-input v-model="form.native_seeds_planted" type="number" />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="R$ investido em sementes nativas plantadas por hectare">
                  <money v-model="form.native_seeds_investment" class="form-control" />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="De onde adquiriu as sementes nativas?">
                  <b-form-textarea v-model="form.native_seeds_source" />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Quantidade (Kg) de sementes de adubação verde plantadas por hectare">
                  <b-form-input v-model="form.green_adubation_planted" type="number" />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="R$ investido em sementes de adubação verde plantadas por hectare">
                  <money v-model="form.green_adubation_investment" class="form-control" />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Quantidade (Kg) de mudas plantadas por hectare">
                  <b-form-input v-model="form.seedlings_planted" type="number" />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="R$ investido em mudas plantadas por hectare">
                  <money v-model="form.seedlings_investment" class="form-control" />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <b-form-group label="Custo total da implementação do plantio (se calculado)" description="Indicar quais etapas e serviços estão sendo considerados (custos operacionais, AT, entre outros)">
                  <b-form-textarea v-model="form.total_planting_cost" />
                </b-form-group>
              </b-col>
              <b-col md="12">
                <pictures-upload :form="form" field="planting_pictures" url="/api/uploads/images" :multiple="true" />
              </b-col>
              <b-col md="12">
                <b-form-group label="Observações gerais do plantio">
                  <b-form-textarea v-model="form.planting_observations" />
                </b-form-group>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Monitoramento e manejo"><p>I'm a disabled tab!</p></b-tab>
        </b-tabs>
      </b-card>
      <b-button type="submit" variant="primary" block :disabled="invalid">
        Salvar
      </b-button>
    </b-form>
    <pre>{{ form }}</pre>
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
import estados from '@/data/estados.json'
import cidades from '@/data/cidades.json'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    PicturesUpload,
    AddressForm
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
      form: {
        name: '',
        planting_time: '',
        area_size: null,
        address: {
          location: {
            type: 'Point',
            coordinates: []
          }
        },
        pictures: [],

        receive_technical_visits: false,
        availability_for_technical_visits: '',
        responsible_for_technical_visits: '',

        original_vegetation: '',
        year_of_deforestation: '',
        previous_use_type: '',
        duration_of_previous_use: '',

        soil_type: '',
        soil_moisture: '',
        declivity: '',
        soil_compaction: '',
        soil_conservation: '',
        soil_conservation_other: '',

        nearest_forest: null,
        nearest_forest_vegetation: '',
        fragment_size: '',
        natural_regeneration: '',

        presence_of_other_animals: '',
        firing_frequency: '',
        firing_frequency_other: '',
        last_fire: '',

        herbicide_use: '',
        herbicide: '',
        herbicide_frequency: '',
        overgrazing: '',
        overgrazing_frequency: '',
        soil_preparation: '',
        screenings_number: null,
        screenings_frequency: '',
        levels_number: null,

        semi_mechanized_mowing_number: null,
        manual_mowing_number: null,
        mowing_frequency: '',

        city: '',
        state: ''

      },
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }
  },
  computed: {
    validCoordinates () {
      if (this.form.address && this.form.address.location && this.form.address.location.coordinates && this.form.address.location.coordinates.length > 1) {
        if (this.form.address.location.coordinates[0] > -90 && this.form.address.location.coordinates[0] < 90) {
          if (this.form.address.location.coordinates[1] > -180 && this.form.address.location.coordinates[1] < 180) {
            return true
          }
        }
      }
      return false
    },
    cidades () {
      if (this.form.state) {
        return cidades[this.form.state]
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
          this.$toast.success('Unidade de aprendizado atualizada com sucesso!')
          this.$router.push('/admin/learning_units')
        }
      } else {
        const learningUnit = await this.$axios.$post('/api/learning_units', this.form).catch(this.showError)
        if (learningUnit) {
          this.$toast.success('Unidade de aprendizado cadastrada com sucesso!')
          this.$router.push('/admin/learning_units')
        }
      }
    },
    setAddress(address) {
      this.form.address = address
    }
  }
}
</script>
