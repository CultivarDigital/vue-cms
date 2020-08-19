<template>
  <div class="diagnosis-form">
    <div v-if="!show_form">
      <div class="text-right mb-3">
        <b-button variant="primary" @click="show_form = true">
          Registrar diagnóstico
        </b-button>
      </div>
      <div v-if="diagnostics">
        <b-table v-if="diagnostics.length" :fields="table" :items="diagnostics" responsive="sm">
          <template v-slot:cell(createdAt)="data">
            {{ $moment(data.value).format("DD/MM/YYYY") }}
          </template>
          <template v-slot:cell(actions)="data">
            <b-button variant="info" size="sm" @click="edit(data.item)">
              <b-icon-pencil />
            </b-button>
            <b-button variant="danger" size="sm" @click="remove(data.item)">
              <b-icon-trash />
            </b-button>
          </template>
        </b-table>
        <b-alert v-else show variant="dark" class="text-center">Nenhum registro encontrado</b-alert>
      </div>
      <div v-else class="text-center">
        <b-spinner label="Carregando..." />
      </div>
    </div>
    <div v-else>
      <ValidationObserver v-slot="{ validate, invalid }">
        <b-form @submit.prevent="validate().then(save)">
          <b-row>
            <b-col md="12">
              <b-form-group label="Nome para a o registro *">
                <validation-provider v-slot="{ errors }" name="nome" rules="required">
                  <b-form-input v-model="form.name" name="name" />
                  <span class="text-danger">{{ errors[0] }}</span>
                </validation-provider>
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Descrição básica do diagnóstico">
                <b-form-textarea v-model="form.description" name="description" />
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Observações gerais do diagnóstico">
                <quill-editor ref="quillEdit" v-model="form.notes" />
                <input id="quillfile" type="file" hidden @change="quillUpload">
              </b-form-group>
            </b-col>
            <b-col md="12">
              <pictures-upload :form="form" field="pictures" url="/api/uploads/images" :multiple="true" />
            </b-col>
            <b-col md="12">
              <pdfs-upload :form="form" field="pdfs" url="/api/uploads/pdfs" :multiple="true" />
            </b-col>
          </b-row>
          <h4>Histórico de Ocupação</h4>
          <br>
          <b-row>
            <b-col md="12">
              <b-form-group label="Vegetação original">
                <b-form-checkbox-group v-model="form.original_vegetation" :options="['Cerrado', 'Floresta estacional', 'Floresta ombrófila', 'Floresta ripária', 'Mata de várzea', 'Mata de brejo', 'Campo úmido']" />
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Ano do desmatamento">
                <b-form-checkbox-group v-model="form.year_of_deforestation" :options="['< 1 ano', '1 a 5 anos', '5 a 10 anos', '> 10 anos']" />
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Tipo de uso anterior">
                <b-form-checkbox-group v-model="form.previous_use_type" :options="['Pastagem', 'Agricultura', 'Aterro', 'Cultura Perene', 'Retirada de terra/Mineração']" />
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Duração do uso anterior (último uso)">
                <b-form-checkbox-group v-model="form.duration_of_previous_use" :options="['< 1 ano', '1 a 5 anos', '5 a 10 anos', '> 10 anos']" />
              </b-form-group>
            </b-col>
          </b-row>
          <br>
          <h4>Análise da área</h4>
          <br>
          <b-row>
            <b-col md="12">
              <b-form-group label="Tipo de Solo">
                <b-form-checkbox-group v-model="form.soil_type" :options="['Cascalho', 'Areno-argiloso', 'Arenoso', 'Argiloso']" />
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Umidade do Solo">
                <b-form-checkbox-group v-model="form.soil_moisture" :options="['Seco', 'Encharcado', 'Inundado periodicamente']" />
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Declividade (a mais acentuada dentro da área do plantio)">
                <b-form-checkbox-group v-model="form.declivity" :options="['Plano', 'Suavemente inclinado', 'Inclinado', 'Muito inclinado']" />
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Compactação do solo">
                <b-form-checkbox-group v-model="form.soil_compaction" :options="['Muito compactado', 'Pouco compactado', 'Terra fofa']" />
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Conservação do solo">
                <b-form-checkbox-group v-model="form.soil_conservation" :options="['Curvas de nível', 'Bacias de contenção', 'Aterramento', 'Drenagem', 'Nenhum', 'Outros']" />
                <b-form-input v-if="form.soil_conservation.includes('Outros')" v-model="form.soil_conservation_other" placeholder="Especifique aqui" />
              </b-form-group>
            </b-col>
          </b-row>
          <br>
          <h4>Análise da paisagem</h4>
          <br>
          <b-row>
            <b-col md="12">
              <b-form-group label="Mata nativa mais próxima (km)">
                <b-form-input v-model="form.nearest_forest" type="number" step="0.01" lang="nb" />
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Vegetação da mata mais próxima">
                <b-form-checkbox-group v-model="form.nearest_forest_vegetation" :options="['Igual a que vai ser recuperada', 'Diferente']" />
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Tamanho do fragmento">
                <b-form-checkbox-group v-model="form.fragment_size" :options="['< 10 ha ou estreita', 'Entre 10 e 50 ha', '> 100 ha']" />
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Regeneração Natural da área do plantio">
                <b-form-checkbox-group v-model="form.natural_regeneration" :options="['Rala e pobre', 'Densa e pobre', 'Rala e rica', 'Densa e rica']" />
              </b-form-group>
            </b-col>
          </b-row>
          <br>
          <h4>Fatores de pertubação</h4>
          <br>
          <b-row>
            <b-col md="12">
              <b-form-group label="Presença de gado e/ou outros animais">
                <b-form-radio-group v-model="form.presence_of_other_animals" :options="['Sim', 'Não']" />
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Frequência de queimadas">
                <b-form-checkbox-group v-model="form.firing_frequency" :options="['1 ano vez por ano', 'A cada 2 anos', 'Outros']" />
                <b-form-input v-if="form.firing_frequency.includes('Outros')" v-model="form.firing_frequency_other" placeholder="Especifique aqui" />
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Data do último fogo">
                <b-form-checkbox-group v-model="form.last_fire" :options="['< 1 ano', 'entre 1 e 3 anos', '> 3 anos']" />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Data do diagnóstico">
                <b-form-datepicker v-model="form.createdAt" />
              </b-form-group>
            </b-col>
          </b-row>
          <b-button variant="default" @click="show_form = false">
            Cancelar
          </b-button>
          <b-button type="submit" variant="primary" :disabled="invalid">
            Salvar
          </b-button>
        </b-form>
      </ValidationObserver>
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
import PdfsUpload from '@/components/admin/PdfsUpload'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    PicturesUpload,
    PdfsUpload
  },
  mixins: [mixinGlobal, mixinForm],
  props: {
    learningUnit: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      show_form: false,
      diagnosis: null,
      diagnostics: [],
      form: null,
      empty_form: {
        learning_unit: this.learningUnit,
        name: '',
        description: '',
        notes: '',
        pictures: [],
        pdfs: [],
        createdAt: new Date(),

        biome: [],
        original_vegetation: [],
        year_of_deforestation: [],
        previous_use_type: [],
        duration_of_previous_use: [],

        soil_type: [],
        soil_moisture: [],
        declivity: [],
        soil_compaction: [],
        soil_conservation: [],
        soil_conservation_other: '',

        nearest_forest: null,
        nearest_forest_vegetation: [],
        fragment_size: [],
        natural_regeneration: [],

        presence_of_other_animals: '',
        firing_frequency: [],
        firing_frequency_other: '',
        last_fire: []
      },
      table: [
        { key: 'createdAt', label: 'Data do registro' },
        { key: 'name', label: 'Nome' },
        { key: 'actions', label: '', class: 'text-right' }
      ]
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.diagnostics = await this.$axios.$get('/api/diagnostics', { params: { learning_unit: this.learningUnit } })
      this.diagnosis = null
      this.show_form = false
      this.form = { ...this.empty_form }
    },
    async save() {
      if (this.diagnosis) {
        const diagnosis = await this.$axios.$put('/api/diagnostics/' + this.diagnosis._id, this.form).catch(this.showError)
        if (diagnosis) {
          this.$toast.success('Registro atualizado com sucesso!')
          this.list()
        }
      } else {
        const diagnosis = await this.$axios.$post('/api/diagnostics', this.form).catch(this.showError)
        if (diagnosis) {
          this.$toast.success('Registro realizado com sucesso!')
          this.list()
        }
      }
    },
    edit(diagnosis) {
      this.toForm(this.form, diagnosis)
      this.diagnosis = diagnosis
      this.show_form = true
    },
    remove (diagnosis) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este ítem?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/diagnostics/' + diagnosis._id).then(() => {
            this.list()
            this.$toast.success('Registro removido com sucesso!')
          }).catch(this.showError)
        }
      })
    }
  }
}
</script>
