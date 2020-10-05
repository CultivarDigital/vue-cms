<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <b-form @submit.prevent="validate().then(save)">
      <b-row>
        <b-col md="12">
          <b-form-group label="Nome *">
            <validation-provider v-slot="{ errors }" name="nome" rules="required">
              <b-form-input v-model="form.name" name="name" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="Introdução">
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
          <b-form-group label="Categorias">
            <form-entities-select type="categories" :form="form" field="categories" />
          </b-form-group>
        </b-col>
        <b-col md="12">
          <tags-form v-model="form.tags" :current-tags="currentTags" />
        </b-col>
        <b-col md="12">
          <pictures-upload :form="form" field="pictures" url="/api/uploads/images" :multiple="true" />
        </b-col>
        <b-col md="12">
          <pdfs-upload :form="form" field="pdfs" url="/api/uploads/pdfs" :multiple="true" />
        </b-col>
      </b-row>
      <b-button type="submit" variant="primary" block :disabled="invalid">
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
import FormEntitiesSelect from '@/components/admin/FormEntitiesSelect'

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    PicturesUpload,
    PdfsUpload,
    FormEntitiesSelect
  },
  mixins: [mixinGlobal, mixinForm],
  props: {
    project: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      currentTags: [],
      form: {
        name: '',
        description: '',
        content: '',
        pictures: [],
        categories: [],
        tags: [],
        pdfs: []
      }
    }
  },
  async created () {
    this.toForm(this.form, this.project)
    this.currentTags = await this.$axios.$get('/api/projects/current_tags').catch(this.showError)
  },
  methods: {
    async save () {
      if (this.project) {
        const project = await this.$axios.$put('/api/projects/' + this.project.slug, this.form).catch(this.showError)
        if (project) {
          this.$toast.success('Projeto atualizado com sucesso!')
          this.$router.push('/admin/projects')
        }
      } else {
        const project = await this.$axios.$post('/api/projects', this.form).catch(this.showError)
        if (project) {
          this.$toast.success('Projeto cadastrado com sucesso!')
          this.$router.push('/admin/projects')
        }
      }
    }
  }
}
</script>
