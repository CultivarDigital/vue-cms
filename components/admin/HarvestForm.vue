<template>
  <div class="harvest-form">
    <div v-if="!show_form">
      <div class="text-right mb-3">
        <b-button variant="primary" @click="show_form = true">
          Registrar colheita
        </b-button>
      </div>
      <div v-if="harvests">
        <b-table v-if="harvests.length" :fields="table" :items="harvests" responsive="sm">
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
              <b-form-group label="Descrição básica da colheita">
                <b-form-textarea v-model="form.description" name="description" />
              </b-form-group>
            </b-col>
            <b-col md="12">
              <b-form-group label="Observações gerais da colheita">
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
            <b-col md="6">
              <b-form-group label="Data da colheita">
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
      harvest: null,
      harvests: [],
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
      this.harvests = await this.$axios.$get('/api/harvests', { params: { learning_unit: this.learningUnit } })
      this.harvest = null
      this.show_form = false
      this.form = { ...this.empty_form }
    },
    async save() {
      if (this.harvest) {
        const harvest = await this.$axios.$put('/api/harvests/' + this.harvest._id, this.form).catch(this.showError)
        if (harvest) {
          this.$toast.success('Registro atualizado com sucesso!')
          this.list()
        }
      } else {
        const harvest = await this.$axios.$post('/api/harvests', this.form).catch(this.showError)
        if (harvest) {
          this.$toast.success('Registro realizado com sucesso!')
          this.list()
        }
      }
    },
    edit(harvest) {
      this.toForm(this.form, harvest)
      this.harvest = harvest
      this.show_form = true
    },
    remove (harvest) {
      this.$bvModal.msgBoxConfirm('Tem certeza que deseja excluír este ítem?').then(async confirmed => {
        if (confirmed) {
          await this.$axios.delete('/api/harvests/' + harvest._id).then(() => {
            this.list()
            this.$toast.success('Registro removido com sucesso!')
          }).catch(this.showError)
        }
      })
    }
  }
}
</script>
