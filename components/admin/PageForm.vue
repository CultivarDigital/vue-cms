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
            <b-form-input v-model="form.slug" name="title" />
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="Categorias">
            <form-entities-select type="categories" :form="form" field="categories" />
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
          <b-form-group label="Contúdo da página">
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

export default {
  components: {
    ValidationObserver
  },
  mixins: [mixinGlobal, mixinForm],
  props: {
    slug: {
      type: String,
      default: null,
      required: true
    }
  },
  data () {
    return {
      page: null,
      form: {
        slug: this.slug,
        title: '',
        description: '',
        categories: [],
        content: '',
        pictures: [],
        pdfs: []
      }
    }
  },
  async created () {
    this.page = await this.$axios.$get('/api/pages/' + this.slug).catch(this.showError)
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
