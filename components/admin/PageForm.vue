<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <b-form @submit.prevent="validate().then(save)">
      <b-row>
        <b-col md="12">
          <b-form-group label="Título">
            <b-form-input v-model="form.title" name="title" @input="generateSlug" />
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group v-if="form.title" label="Url da página" disabled>
            <b-form-input :value="'/' + form.slug" name="slug" />
            <small class="form-text text-muted">
              {{ 'Link que será usado para acessar a página página:' }}
              <n-link :to="'/' + form.slug" target="_blank">{{ '/' + form.slug }} </n-link>
            </small>
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
import slugify from 'slugify'
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
      type: Object,
      default: () => null
    }
  },
  data () {
    return {
      currentTags: [],
      form: {
        slug: null,
        title: '',
        documents: [],
        description: '',
        categories: [],
        content: '',
        pictures: [],
        pdfs: [],
        tags: []
      }
    }
  },
  async created () {
    this.toForm(this.form, this.page)
    this.currentTags = await this.$axios.$get('/api/pages/current_tags').catch(this.showError)
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
    },
    generateSlug() {
      if (this.form.title) {
        this.form.slug = slugify(this.form.title).toLowerCase()
      }
    }
  }
}
</script>
