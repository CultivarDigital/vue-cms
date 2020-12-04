<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <b-form @submit.prevent="validate().then(save)">
      <b-row>
        <b-col md="12">
          <b-form-group label="Dê um nome para o evento *">
            <validation-provider v-slot="{ errors }" name="título" rules="required">
              <b-form-input v-model="form.title" name="title" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <date-time-form v-model="form.start_at" label="Começa em" />
        </b-col>
        <b-col md="6">
          <date-time-form v-model="form.end_at" label="Termina em" />
        </b-col>
        <b-col md="12">
          <b-form-group label="Introdução" description="Uma descrição curta de até 160 caracteres">
            <b-form-textarea v-model="form.description" name="description" />
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="Descrição completa">
            <quill-editor ref="quillEdit" v-model="form.content" />
            <input id="quillfile" type="file" hidden @change="quillUpload">
          </b-form-group>
        </b-col>
        <b-col md="12">
          <pictures-upload :form="form" field="picture" url="/api/uploads/images" label="Foto de capa" />
        </b-col>
        <b-col md="12">
          <pdfs-upload :form="form" field="pdfs" url="/api/uploads/pdfs" :multiple="true" />
        </b-col>
        <b-col md="12">
          <tags-form v-model="form.tags" :current-tags="currentTags" />
        </b-col>
      </b-row>
      <b-button class="mb-4 mt-4" type="submit" variant="primary" block :disabled="invalid">
        Salvar
      </b-button>
    </b-form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
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
    event: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      currentTags: [],
      form: {
        title: '',
        description: '',
        content: '',
        picture: null,
        tags: [],
        pdfs: [],
        start_at: null,
        end_at: null
      }
    }
  },
  async created () {
    this.toForm(this.form, this.event)
    this.currentTags = await this.$axios.$get('/api/events/current_tags').catch(this.showError)
  },
  methods: {
    async save () {
      if (this.event) {
        const event = await this.$axios.$put('/api/events/' + this.event._id, this.form).catch(this.showError)
        if (event) {
          this.$toast.success('Evento atualizado com sucesso!')
          this.$router.push('/admin/events')
        }
      } else {
        const event = await this.$axios.$post('/api/events', this.form).catch(this.showError)
        if (event) {
          this.$toast.success('Evento cadastrado com sucesso!')
          this.$router.push('/admin/events')
        }
      }
    }
  }
}
</script>
