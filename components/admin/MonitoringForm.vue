<template>
  <div class="monitoring-form">
    <div v-if="!show_form">
      <div class="text-right mb-3">
        <b-button variant="primary" @click="show_form = true">
          Cadastrar
        </b-button>
      </div>
      <div v-if="monitorings">
        <b-table v-if="monitorings.length" :fields="table" :items="monitorings" responsive="sm">
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
              <b-form-group label="Descrição básica do monitoramento">
                <b-form-textarea v-model="form.description" name="description" />
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Observações gerais do monitoramento">
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
            <b-col md="6">
              <b-form-group label="Quantidade de árvores estabelecidas por hectare">
                <b-form-input v-model="form.trees_established_per_hectare" type="number" step="0.01" lang="nb" />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Número de espécies estabelecidas na área total">
                <b-form-input v-model="form.species_established_in_total_area" type="number" step="0.01" lang="nb" />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="% de cobertura de copa da área (formações florestais)">
                <b-form-input v-model="form.percentage_of_canopy_coverage" type="number" step="0.01" lang="nb" />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="% de cobertura de solo (formações savânicas e campestres)">
                <b-form-input v-model="form.percentage_of_soil_coverage" type="number" step="0.01" lang="nb" />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group label="Data do monitoramento">
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
      monitoring: null,
      monitorings: [],
      form: null,
      empty_form: {
        learning_unit: this.learningUnit,
        name: '',
        description: '',
        notes: '',
        pictures: [],
        pdfs: [],
        createdAt: new Date(),

        trees_established_per_hectare: null,
        species_established_in_total_area: null,
        percentage_of_canopy_coverage: null,
        percentage_of_soil_coverage: null
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
      this.monitorings = await this.$axios.$get('/api/monitorings', { params: { learning_unit: this.learningUnit } })
      this.monitoring = null
      this.show_form = false
      this.form = { ...this.empty_form }
    },
    async save() {
      if (this.monitoring) {
        const monitoring = await this.$axios.$put('/api/monitorings/' + this.monitoring._id, this.form).catch(this.showError)
        if (monitoring) {
          this.$toast.success('Registro atualizado com sucesso!')
          this.list()
        }
      } else {
        const monitoring = await this.$axios.$post('/api/monitorings', this.form).catch(this.showError)
        if (monitoring) {
          this.$toast.success('Registro realizado com sucesso!')
          this.list()
        }
      }
    },
    edit(monitoring) {
      this.toForm(this.form, monitoring)
      this.monitoring = monitoring
      this.show_form = true
    },
    remove (monitoring) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este ítem?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/monitorings/' + monitoring._id).then(() => {
            this.list()
            this.$toast.success('Registro removido com sucesso!')
          }).catch(this.showError)
        }
      })
    }
  }
}
</script>
