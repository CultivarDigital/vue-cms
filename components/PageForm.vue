<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <b-form @submit.prevent="validate().then(save)">
      <b-row>
        <b-col md="12">
          <b-form-group label="Título">
            <validation-provider v-slot="{ errors }" name="título" rules="required">
              <b-form-input v-model="form.title" name="title" @input="generateSlug" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group v-if="form.title" label="Url da página">
            <validation-provider v-slot="{ errors }" name="URL da notícia" rules="required">
              <b-input-group :prepend="baseURL">
                <b-form-input v-model="form.slug" name="slug" />
              </b-input-group>
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
            <small class="form-text text-muted">
              {{ 'Link que será usado para acessar a página:' }}
              <a :href="baseURL + form.slug" target="_blank">{{ baseURL + form.slug }} </a>
            </small>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <tags-form v-model="form.tags" :current-tags="currentTags" />
        </b-col>
        <b-col md="12">
          <b-form-group label="Descrição curta" description="Escreva um texto curto resumindo o conteúdo com até 160 caractéres">
            <b-form-textarea v-model="form.description" name="description" />
          </b-form-group>
        </b-col>
        <b-col md="12">
          <Upload v-model="form.images" label="Banners" type="images" multiple edit-title edit-description edit-link />
        </b-col>
        <b-col md="12">
          <Upload v-model="form.docs" label="Documentos" type="documents" multiple edit-title />
        </b-col>
        <b-col md="12">
          <b-form-group label="Conteúdo da página">
            <quill-editor ref="quillEdit" v-model="form.content" />
            <input id="quillfile" type="file" hidden @change="quillUpload">
          </b-form-group>
        </b-col>
      </b-row>
      <b-button class="mb-4 mt-4" type="submit" variant="success" :disabled="invalid" block>
        Salvar
      </b-button>
    </b-form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

import slugify from 'slugify'

import mixinForm from '@/mixins/form'
export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [mixinForm],
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
        docs: [],
        description: '',
        categories: [],
        content: '',
        images: [],
        tags: []
      }
    }
  },
  computed: {
    baseURL() {
      return (this.$axios.defaults.baseURL || '') + '/'
    }
  },
  async created () {
    this.toForm(this.form, this.page)
    this.currentTags = await this.$axios.$get('/api/pages/current_tags')
  },
  methods: {
    async save () {
      if (this.page) {
        const page = await this.$axios.$put('/api/pages/' + this.page._id, this.form)
        if (page) {
          this.$toast.success('Página atualizada com sucesso!')
          this.$router.push('/conta/pages')
        }
      } else {
        const page = await this.$axios.$post('/api/pages', this.form)
        if (page) {
          this.$toast.success('Página cadastrada com sucesso!')
          this.$router.push('/conta/pages')
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
