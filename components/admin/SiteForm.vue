<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <b-form @submit.prevent="validate().then(save)">
      <b-row>
        <b-col md="6">
          <b-form-group label="Nome *">
            <validation-provider v-slot="{ errors }" name="nome" rules="required">
              <b-form-input v-model="form.name" name="name" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col v-if="$auth.hasScope('super')" md="6">
          <b-form-group label="Domínio *">
            <validation-provider v-slot="{ errors }" name="domínio" rules="required">
              <b-form-input v-model="form.domain_name" name="domain_name" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Email">
            <b-form-input v-model="form.email" name="email" />
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="Descrição curta">
            <b-form-textarea v-model="form.description" name="description" />
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="Contatos">
            <b-form-textarea v-model="form.contact" name="contact" />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Link do Facebook">
            <b-form-input v-model="form.url_facebook" name="url_facebook" />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Link do Twitter">
            <b-form-input v-model="form.url_twitter" name="url_twitter" />
          </b-form-group>
        </b-col>
        <b-col md="12">
          <pictures-upload :form="form" field="logo" url="/api/uploads/images" label="Logo do site" />
        </b-col>
        <b-col md="12">
          <pictures-upload :form="form" field="favicon" url="/api/uploads/images" label="Favicon do site" />
        </b-col>
        <b-col md="12">
          <pictures-upload :form="form" field="pictures" url="/api/uploads/images" label="Banners da home" description="Envie as imagens na ordem que aparecerão na tela de início" :multiple="true" />
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

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [mixinGlobal, mixinForm],
  props: {
    site: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      form: {
        name: '',
        domain_name: '',
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
    this.toForm(this.form, this.site)
  },
  methods: {
    async save () {
      if (this.site) {
        const site = await this.$axios.$put('/api/sites/' + this.site.slug, this.form).catch(this.showError)
        if (site) {
          this.$toast.success('Site atualizado com sucesso!')
          if (this.$auth.hasScope('super')) {
            this.$router.push('/admin/sites')
          } else {
            this.$router.push('/admin')
          }
        }
      } else {
        const site = await this.$axios.$post('/api/sites', this.form).catch(this.showError)
        if (site) {
          this.$toast.success('Site cadastrado com sucesso!')
          if (this.$auth.hasScope('super')) {
            this.$router.push('/admin/sites')
          } else {
            this.$router.push('/admin')
          }
        }
      }
    }
  }
}
</script>
