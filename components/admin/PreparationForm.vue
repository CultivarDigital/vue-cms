<template>
  <div class="preparation-form">
    <div v-if="!show_form">
      <div class="text-right mb-3">
        <b-button variant="primary" @click="show_form = true">
          Cadastrar
        </b-button>
      </div>
      <div v-if="preparations">
        <b-table v-if="preparations.length" :fields="table" :items="preparations" responsive="sm">
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
              <b-form-group label="Descrição básica do preparo">
                <b-form-textarea v-model="form.description" name="description" />
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Observações gerais do preparo">
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
          <h4>Preparo da área</h4>
          <br>
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
                <b-form-checkbox-group v-model="form.soil_preparation" :options="['Mecanizado', 'Manual']" />
              </b-form-group>
            </b-col>
            <b-col v-if="form.soil_preparation.includes('Mecanizado')" md="12">
              <b-form-group label="Número de gradagens">
                <b-form-input v-model="form.screenings_number" type="number" step="0.01" lang="nb" />
              </b-form-group>
              <b-form-group label="Número de nivelamentos">
                <b-form-input v-model="form.levels_number" type="number" step="0.01" lang="nb" />
              </b-form-group>
              <b-form-group label="Frequência das gradagens">
                <b-form-input v-model="form.screenings_frequency" />
              </b-form-group>
            </b-col>
            <b-col v-if="form.soil_preparation.includes('Manual')" md="12">
              <b-form-group label="Número de roçadas semi-mecanizadas">
                <b-form-input v-model="form.semi_mechanized_mowing_number" type="number" step="0.01" lang="nb" />
              </b-form-group>
              <b-form-group label="Número de roçadas manuais">
                <b-form-input v-model="form.manual_mowing_number" type="number" step="0.01" lang="nb" />
              </b-form-group>
              <b-form-group label="Frequência das roçadas">
                <b-form-input v-model="form.mowing_frequency" />
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Adubação">
                <b-form-checkbox-group v-model="form.fertilizing" :options="['Adubação química', 'Calagem', 'Adubação orgânica', 'Adubação verde', 'NA']" />
                <b-form-input v-if="form.fertilizing.includes('NA')" v-model="form.fertilizing_other" placeholder="Especifique aqui" />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Data do preparo">
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
      preparation: null,
      preparations: [],
      form: null,
      empty_form: {
        learning_unit: this.learningUnit,
        name: '',
        description: '',
        notes: '',
        pictures: [],
        pdfs: [],
        createdAt: new Date(),

        herbicide_use: '',
        herbicide: '',
        herbicide_frequency: '',
        overgrazing: '',
        overgrazing_frequency: '',
        soil_preparation: [],
        screenings_number: null,
        screenings_frequency: '',
        levels_number: null,
        semi_mechanized_mowing_number: null,
        manual_mowing_number: null,
        mowing_frequency: '',
        fertilizing: [],
        fertilizing_other: ''
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
      this.preparations = await this.$axios.$get('/api/preparations', { params: { learning_unit: this.learningUnit } })
      this.preparation = null
      this.show_form = false
      this.form = { ...this.empty_form }
    },
    async save() {
      if (this.preparation) {
        const preparation = await this.$axios.$put('/api/preparations/' + this.preparation._id, this.form).catch(this.showError)
        if (preparation) {
          this.$toast.success('Registro atualizado com sucesso!')
          this.list()
        }
      } else {
        const preparation = await this.$axios.$post('/api/preparations', this.form).catch(this.showError)
        if (preparation) {
          this.$toast.success('Registro realizado com sucesso!')
          this.list()
        }
      }
    },
    edit(preparation) {
      this.toForm(this.form, preparation)
      this.preparation = preparation
      this.show_form = true
    },
    remove (preparation) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este ítem?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/preparations/' + preparation._id).then(() => {
            this.list()
            this.$toast.success('Registro removido com sucesso!')
          }).catch(this.showError)
        }
      })
    }
  }
}
</script>
