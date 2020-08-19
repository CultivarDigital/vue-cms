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
      <b-button class="mb-4 mt-4" @click="$emit('cancel')">
        Cancelar
      </b-button>
      <b-button class="mb-4 mt-4" type="submit" variant="primary" :disabled="invalid">
        Salvar conteúdo da página
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
        const page = await this.$axios.$put('/api/pages/' + this.slug, this.form).catch(this.showError)
        if (page) {
          this.page = page
          this.$toast.success('Conteúdo da página atualizado com sucesso!')
          this.$emit('cancel')
        }
      } else {
        const page = await this.$axios.$post('/api/pages', this.form).catch(this.showError)
        if (page) {
          this.page = page
          this.$toast.success('Conteúdo da página cadastrado com sucesso!')
          this.$emit('cancel')
        }
      }
    }
  }
}
</script>
