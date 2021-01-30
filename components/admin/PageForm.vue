<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <b-form @submit.prevent="validate().then(save)">
      <b-row>
        <b-col md="12">
          <b-form-group label="Título">
            <b-form-input v-model="form.title" name="title" />
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="Código da página" description="Será usado para compor a URL da página.">
            <b-form-input v-model="form.slug" name="slug" />
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="Categorias">
            <form-entities-select type="categories" :form="form" field="categories" />
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="Tags">
            <form-entities-select type="tags" :form="form" field="tags" />
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="Introdução">
            <b-form-textarea v-model="form.description" name="description" />
          </b-form-group>
        </b-col>
        <b-col md="12">
          <pictures-upload :form="form" field="pictures" url="/api/uploads/images" :multiple="true" label="Banners" />
        </b-col>
        <b-col md="12">
          <pdfs-upload :form="form" field="pdfs" url="/api/uploads/pdfs" :multiple="true" />
        </b-col>
        <b-col md="12">
          <documents-upload :form="form" field="documents" url="/api/uploads/documents" multiple label="Outros documentos/arquivos" />
        </b-col>
        <b-col md="12">
          <b-form-group label="Conteúdo da página">
            <quill-editor ref="quillEdit" v-model="form.content" />
            <input id="quillfile" type="file" hidden @change="quillUpload">
          </b-form-group>
        </b-col>
      </b-row>
      <b-button class="mb-4 mt-4" type="submit" variant="primary" :disabled="invalid" block>
        Salvar
      </b-button>
    </b-form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver } from 'vee-validate'
import mixinGlobal from '@/mixins/global'
import mixinForm from '@/mixins/form'
import PicturesUpload from '@/components/admin/PicturesUpload'
import PdfsUpload from '@/components/admin/PdfsUpload'
import DocumentsUpload from '@/components/admin/DocumentsUpload'

export default {
  components: {
    ValidationObserver,
    PicturesUpload,
    PdfsUpload,
    DocumentsUpload
  },
  mixins: [mixinGlobal, mixinForm],
  props: {
    page: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      form: {
        slug: null,
        title: '',
        documents: [],
        description: '',
        categories: [],
        tags: [],
        content: '',
        pictures: [],
        pdfs: []
      }
    }
  },
  created () {
    this.toForm(this.form, this.page)
  },
  methods: {
    async save () {
      if (this.page) {
        const page = await this.$axios.$put('/api/pages/' + this.page.slug, this.form).catch(this.showError)
        if (page) {
          this.$toast.success('Página atualizada com sucesso!')
          this.$router.push('/admin/pages')
        }
      } else {
        const page = await this.$axios.$post('/api/pages', this.form).catch(this.showError)
        if (page) {
          this.$toast.success('Página cadastrada com sucesso!')
          this.$router.push('/admin/pages')
        }
      }
    }
  }
}
</script>
