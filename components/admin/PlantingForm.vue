<template>
  <div class="planting-form">
    <div v-if="!show_form">
      <div class="text-right mb-3">
        <b-button variant="primary" @click="show_form = true">
          Registrar plantio
        </b-button>
      </div>
      <div v-if="plantings">
        <b-table v-if="plantings.length" :fields="table" :items="plantings" responsive="sm">
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
              <b-form-group label="Descrição básica do plantio">
                <b-form-textarea v-model="form.description" name="description" />
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Observações gerais do plantio">
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
          <b-row>
            <b-col md="12">
              <b-form-group label="Fitofisionomia">
                <b-form-checkbox-group v-model="form.vegetation_type" :options="['Cerrado', 'Floresta estacional', 'Floresta ombrófila', 'Floresta ripária', 'Mata de várzea', 'Mata de brejo', 'Campo úmido']" />
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Características da propriedade" description="Especificar melhor como: área pública ou privada? Atividade produtiva da propriedade?">
                <b-form-textarea v-model="form.property_features" />
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Sistema de restauração/técnica utilizada">
                <b-form-checkbox-group v-model="form.restoration_system" :options="['Plantio total mecanizado a lanço', 'Mecanizado em linhas', 'Plantio total manual a lanço', 'Plantio manual e covetas/covas', 'Plantio manual em linhas', 'Plantio manual em covetas intercalado com mudas', 'Outros']" />
                <b-form-input v-if="form.restoration_system.includes('Outros')" v-model="form.restoration_system_other" placeholder="Especifique aqui" />
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Se foi mecanizado ou semi-mecanizado, qual implemento utilizou?">
                <b-form-textarea v-model="form.restoration_system_implement" />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Quantidade (Kg) de sementes nativas plantadas por hectare">
                <b-form-input v-model="form.native_seeds_planted" type="number" step="0.01" lang="nb" />
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
                <b-form-input v-model="form.green_adubation_planted" type="number" step="0.01" lang="nb" />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="R$ investido em sementes de adubação verde plantadas por hectare">
                <money v-model="form.green_adubation_investment" class="form-control" />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Quantidade (Kg) de mudas plantadas por hectare">
                <b-form-input v-model="form.seedlings_planted" type="number" step="0.01" lang="nb" />
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
            <b-col md="6">
              <b-form-group label="Data do plantio">
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
      planting: null,
      plantings: [],
      form: null,
      empty_form: {
        learning_unit: this.learningUnit,
        name: '',
        description: '',
        notes: '',
        pictures: [],
        pdfs: [],
        createdAt: new Date(),
        vegetation_type: [],
        property_features: '',
        restoration_system: [],
        restoration_system_other: '',
        restoration_system_implement: '',
        native_seeds_planted: null,
        native_seeds_investment: 0,
        native_seeds_source: '',
        green_adubation_planted: null,
        green_adubation_investment: 0,
        seedlings_planted: null,
        seedlings_investment: 0,
        total_planting_cost: null
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
      this.plantings = await this.$axios.$get('/api/plantings', { params: { learning_unit: this.learningUnit } })
      this.planting = null
      this.show_form = false
      this.form = { ...this.empty_form }
    },
    async save() {
      if (this.planting) {
        const planting = await this.$axios.$put('/api/plantings/' + this.planting._id, this.form).catch(this.showError)
        if (planting) {
          this.$toast.success('Registro atualizado com sucesso!')
          this.list()
        }
      } else {
        const planting = await this.$axios.$post('/api/plantings', this.form).catch(this.showError)
        if (planting) {
          this.$toast.success('Registro realizado com sucesso!')
          this.list()
        }
      }
    },
    edit(planting) {
      this.toForm(this.form, planting)
      this.planting = planting
      this.show_form = true
    },
    remove (planting) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este ítem?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/plantings/' + planting._id).then(() => {
            this.list()
            this.$toast.success('Registro removido com sucesso!')
          }).catch(this.showError)
        }
      })
    }
  }
}
</script>
