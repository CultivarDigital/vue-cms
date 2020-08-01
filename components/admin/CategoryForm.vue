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
          <pictures-upload :form="form" field="picture" url="/api/uploads/images" label="Foto de capa" />
        </b-col>
        <!-- <b-col md="12">
          <pictures-upload :form="form" field="icon" url="/api/uploads/images" label="Ícone" />
        </b-col> -->
      </b-row>
      <b-button class="mb-4" type="submit" variant="primary" block :disabled="invalid">
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

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    PicturesUpload
  },
  mixins: [mixinGlobal, mixinForm],
  props: {
    category: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      form: {
        name: '',
        description: '',
        content: '',
        picture: null,
        icon: null
      }
    }
  },
  created () {
    this.toForm(this.form, this.category)
  },
  methods: {
    async save () {
      if (this.category) {
        const category = await this.$axios.$put('/api/categories/' + this.category.slug, this.form).catch(this.showError)
        if (category) {
          this.$toast.success('Linha de ação atualizada com sucesso!')
          this.$router.push('/admin/categories')
        }
      } else {
        const category = await this.$axios.$post('/api/categories', this.form).catch(this.showError)
        if (category) {
          this.$toast.success('Linha de ação cadastrada com sucesso!')
          this.$router.push('/admin/categories')
        }
      }
    }
  }
}
</script>
