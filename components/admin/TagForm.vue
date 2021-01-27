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
        <!--<b-col md="12">
          <pictures-upload :form="form" field="picture" url="/api/uploads/images" label="Foto de capa" />
        </b-col> -->
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

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [mixinGlobal, mixinForm],
  props: {
    tag: {
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
        picture: null
      }
    }
  },
  created () {
    this.toForm(this.form, this.tag)
  },
  methods: {
    async save () {
      if (this.tag) {
        const tag = await this.$axios.$put('/api/tags/' + this.tag.slug, this.form).catch(this.showError)
        if (tag) {
          this.$toast.success('Tag atualizada com sucesso!')
          this.$router.push('/admin/tags')
        }
      } else {
        const tag = await this.$axios.$post('/api/tags', this.form).catch(this.showError)
        if (tag) {
          this.$toast.success('Tag cadastrada com sucesso!')
          this.$router.push('/admin/tags')
        }
      }
    }
  }
}
</script>
