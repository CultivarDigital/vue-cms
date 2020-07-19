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
        <b-col md="6">
          <b-form-group label="Domínio *">
            <validation-provider v-slot="{ errors }" name="domínio" rules="required">
              <b-form-input v-model="form.domain_name" name="domain_name" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Descrição">
            <b-form-textarea v-model="form.description" name="description" />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Contatos">
            <b-form-textarea v-model="form.contact" name="contact" />
          </b-form-group>
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
import mixins from '@/mixins/form'

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [mixins],
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
        contact: ''
      }
    }
  },
  created () {
    this.toForm(this.form, this.site)
  },
  methods: {
    async save () {
      if (this.site) {
        const site = await this.$axios.$put('/api/sites/' + this.site._id, this.form)
        if (site) {
          this.$toast.success('Site atualizado com sucesso!')
          this.$router.push('/admin/sites')
        }
      } else {
        const site = await this.$axios.$post('/api/sites', this.form)
        if (site) {
          this.$toast.success('Site cadastrado com sucesso!')
          this.$router.push('/admin/sites')
        }
      }
    }
  }
}
</script>
