<template>
  <div class="contact-component">
    <ValidationObserver v-slot="{ validate, invalid }">
      <b-form @submit.prevent="validate().then(save)">
        <h6 class="mb-3">FALE CONOSCO</h6>
        <b-row>
          <b-col md="6">
            <b-form-group>
              <validation-provider v-slot="{ errors }" name="nome" rules="required">
                <b-form-input v-model="form.name" name="name" placeholder="Digite seu nome" />
                <span class="text-white">{{ errors[0] }}</span>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group>
              <validation-provider v-slot="{ errors }" name="email" rules="required|email">
                <b-form-input v-model="form.email" name="email" placeholder="Digite seu email" />
                <span class="text-white">{{ errors[0] }}</span>
              </validation-provider>
            </b-form-group>
          </b-col>
          <b-col md="12">
            <b-form-group>
              <validation-provider v-slot="{ errors }" name="message" rules="required">
                <b-form-textarea v-model="form.message" name="message" placeholder="Sua sua mensagem" />
                <span class="text-white">{{ errors[0] }}</span>
              </validation-provider>
            </b-form-group>
          </b-col>
        </b-row>
        <b-button type="submit" variant="primary" :disabled="invalid">
          ENVIAR
        </b-button>
      </b-form>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import mixinGlobal from '@/mixins/global'
import mixinForm from '@/mixins/form'
export default {
  layout: 'admin',
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [mixinGlobal, mixinForm],
  data () {
    return {
      form: {
        site: null,
        name: '',
        email: '',
        message: ''
      }
    }
  },
  methods: {
    async save () {
      this.form.site = this.$store.state.site._id
      const contact = await this.$axios.$post('/api/contacts/contact', this.form).catch(this.showError)
      if (contact) {
        this.$toast.success('Sua mensagem foi enviado. Em breve entraremos em contato. Obrigado!')
      }
    }
  }
}
</script>
