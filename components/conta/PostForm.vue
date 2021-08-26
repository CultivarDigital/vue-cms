<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <b-form @submit.prevent="validate().then(save)">
      <b-row>
        <b-col md="12">
          <b-form-group label="Título *">
            <validation-provider v-slot="{ errors }" name="título" rules="required">
              <b-form-input v-model="form.title" name="title" @input="generateSlug" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group v-if="form.title" label="URL da notícia">
            <validation-provider v-slot="{ errors }" name="URL da notícia" rules="required">
              <b-input-group prepend="noticias/">
                <b-form-input v-model="form.slug" name="slug" />
              </b-input-group>
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
            <small class="form-text text-muted">
              {{ 'Link que será usado para acessar a notícia:' }}
              <a :href="baseURL + 'noticias/' + form.slug" target="_blank">{{ baseURL + 'noticias/' + form.slug }} </a>
            </small>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="Descrição curta" description="Escreva um texto curto resumindo conteúdo com até 160 caractéres.">
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
          <Upload v-model="form.picture" type="images" label="Foto de capa" edit-title edit-description edit-link />
        </b-col>
        <b-col md="12">
          <Upload v-model="form.documents" label="Documentos" type="documents" multiple edit-title />
        </b-col>
        <b-col md="12">
          <tags-form v-model="form.tags" :current-tags="currentTags" />
        </b-col>
      </b-row>
      <b-button class="mb-4 mt-4" type="submit" variant="success" block :disabled="invalid">
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
    post: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      currentTags: [],
      form: {
        title: '',
        slug: '',
        description: '',
        documents: [],
        content: '',
        picture: null,
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
    this.toForm(this.form, this.post)
    this.currentTags = await this.$axios.$get('/api/posts/current_tags')
  },
  methods: {
    async save () {
      if (this.post) {
        const post = await this.$axios.$put('/api/posts/' + this.post._id, this.form)
        if (post) {
          this.$toast.success('Notícia atualizada com sucesso!')
          this.$router.push('/conta/posts')
        }
      } else {
        const post = await this.$axios.$post('/api/posts', this.form)
        if (post) {
          this.$toast.success('Notícia cadastrada com sucesso!')
          this.$router.push('/conta/posts')
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
