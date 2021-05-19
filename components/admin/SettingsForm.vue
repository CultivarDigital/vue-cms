<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <b-form @submit.prevent="validate().then(save)">
      <b-form-group label="Nome/Título do site*">
        <validation-provider v-slot="{ errors }" name="nome" rules="required">
          <b-form-input v-model="form.name" name="name" />
          <span class="text-danger">{{ errors[0] }}</span>
        </validation-provider>
      </b-form-group>
      <b-form-group label="Descrição curta do site" description="Um resumo do conteúdo com até 153 caracteres.">
        <b-form-textarea v-model="form.description" name="description" />
      </b-form-group>
      <b-form-group label="Email de contato">
        <b-form-input v-model="form.email" name="email" />
      </b-form-group>
      <b-form-group label="Outros Contatos">
        <b-form-textarea v-model="form.contact" name="contact" />
      </b-form-group>
      <b-form-group label="Link do Facebook">
        <b-form-input v-model="form.url_facebook" name="url_facebook" />
      </b-form-group>
      <b-form-group label="Link do Twitter">
        <b-form-input v-model="form.url_twitter" name="url_twitter" />
      </b-form-group>
      <b-form-group label="Link do Instagram">
        <b-form-input v-model="form.url_instagram" name="url_instagram" />
      </b-form-group>
      <Upload v-model="form.logo" label="Logo do site" type="images" />
      <pictures-upload :form="form" field="favicon" url="/api/uploads/images" label="Favicon do site" />
      <pictures-upload :form="form" field="pictures" url="/api/uploads/images" label="Banners da home" description="Envie as imagens na ordem que aparecerão na tela de início" :multiple="true" />
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

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [mixinGlobal, mixinForm],
  props: {
    settings: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      form: {
        name: '',
        description: '',
        contact: '',
        email: '',
        logo: null,
        favicon: null,
        pictures: [],
        url_facebook: '',
        url_twitter: ''
      }
    }
  },
  created () {
    this.toForm(this.form, this.settings)
  },
  methods: {
    async save () {
      const settings = await this.$axios.$post('/api/settings', this.form).catch(this.showError)
      if (settings) {
        this.$toast.success('Configurações cadastradas com sucesso!')
        this.$router.push('/admin')
      }
    }
  }
}
</script>
