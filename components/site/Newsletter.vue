<template>
  <div class="newsletter-component">
    <ValidationObserver v-slot="{ validate, invalid }">
      <b-form @submit.prevent="validate().then(save)">
        <h6 class="mb-3">FIQUE POR DENTRO</h6>
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
        </b-row>
        <b-button type="submit" variant="default" :disabled="invalid">
          ASSINE
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
        email: ''
      }
    }
  },
  methods: {
    async save () {
      this.form.site = this.$store.state.site._id
      const newsletter = await this.$axios.$post('/api/newsletters', this.form).catch(this.showError)
      if (newsletter) {
        this.$toast.success('Obrigado por se cadastrar. Você reberá todas as nossas novidades no seu email.')
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  .newsletter-component
    input.form-control
      border: none
      font-size: 12px
      border-radius: 5px
    .btn
      color: #384e3f
      font-size: 10px
      border-radius: 5px
      padding: 10px 30px
</style>
