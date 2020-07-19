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
          <b-form-group label="Email *">
            <validation-provider v-slot="{ errors }" name="domínio" rules="required|email">
              <b-form-input v-model="form.email" name="email" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
            <b-button size="sm" class="float-right mt-1" @click="changePassword">
              Alterar senha
            </b-button>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-if="show_password">
        <b-col md="6">
          <b-form-group label="Senha *">
            <validation-provider v-slot="{ errors }" name="senha" rules="required|min:6">
              <b-form-input v-model="form.password" type="password" name="pass" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Confirmar senha *">
            <validation-provider v-slot="{ errors }" rules="required">
              <b-form-input v-model="form.password_confirmation" type="password" name="pass_confirmation" />
              <span class="text-danger">{{ errors[0] }}</span>
              <span v-if="!passwordConfirmed" class="text-danger">As senhas digitadas não conferem</span>
            </validation-provider>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-if="$auth.hasScope('super')">
        <b-col v-if="sites" md="6">
          <b-form-group label="Site">
            <b-form-select v-model="form.site" :options="sites" />
          </b-form-group>
        </b-col>
        <b-col md="6">
          <b-form-group label="Perfil *">
            <validation-provider v-slot="{ errors }" rules="required">
              <b-form-select v-model="form.roles" :options="roles" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
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
    user: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      sites: [{ text: 'Selecione um site', value: null }],
      show_password: !this.user,
      form: {
        site: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        roles: []
      },
      roles: [
        { text: 'Super usuário', value: ['super'] },
        { text: 'Administrador', value: ['admin'] }
      ]
    }
  },
  computed: {
    passwordConfirmed () {
      return !this.show_password || this.form.password === this.form.password_confirmation
    }
  },
  async created () {
    this.toForm(this.form, this.user)
    const sites = await this.$axios.$get('/api/sites')
    sites.forEach(site => {
      this.sites.push({ value: site._id, text: site.name })
    })
  },
  methods: {
    async save () {
      if (this.user) {
        const user = await this.$axios.$put('/api/users/' + this.user._id, this.form)
        if (user) {
          this.$toast.success('Usuário atualizado com sucesso!')
          this.$router.push('/admin/users')
        }
      } else {
        const user = await this.$axios.$post('/api/users', this.form)
        if (user) {
          this.$toast.success('Usuário cadastrado com sucesso!')
          this.$router.push('/admin/users')
        }
      }
    },
    changePassword () {
      this.show_password = !this.show_password
      if (!this.show_password) {
        this.form.password = ''
        this.form.password_confirmation = ''
      }
    }
  }
}
</script>
