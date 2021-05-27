<template>
  <div class="">
    <Breadcrumb
      :active="tab === 'login' ? 'Entrar' : 'Cadastre-se'"
    />
    <section class="content pb-5">
      <b-container>
        <div v-show="tab === 'login'">
          <p>Informe os dados da sua conta ou <b-btn size="sm" @click="tab = 'register'">cadastre-se</b-btn> para continuar.</p>
          <form class="mt-4" @submit.prevent="login">
            <b-form-group label="Digite seu email">
              <b-form-input v-model="form.email" type="text" />
            </b-form-group>
            <b-form-group label="Digite sua senha">
              <b-form-input v-model="form.password" type="password" />
            </b-form-group>
            <b-form-group class="text-center">
              <b-button type="submit" variant="secondary" block size="lg">
                Entrar
              </b-button>
            </b-form-group>
          </form>
        </div>
        <div v-show="tab === 'register'">
          <p>Informe seus dados para criar sua conta ou <b-btn size="sm" @click="tab = 'login'">entre</b-btn> se já possúi uma conta.</p>
          <ValidationObserver v-slot="{ validate, invalid }">
            <form @submit.prevent="validate().then(register)">
              <b-row>
                <b-col md="12">
                  <b-form-group label="Seu nome completo">
                    <validation-provider v-slot="{ errors }" name="nome" rules="required">
                      <b-form-input v-model="register_form.name" name="name" />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="12">
                  <b-form-group label="Você faz parte de alguma organização?">
                    <validation-provider v-slot="{ errors }" name="organização" rules="required">
                      <b-form-input v-model="register_form.organization" />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="12">
                  <b-form-group label="Seu endereço">
                    <CoordinatesPreview :form="form" />
                    <div>
                      <address-form v-model="form.address" :autoload="false" />
                    </div>
                  </b-form-group>
                </b-col>
                <b-col md="12">
                  <b-form-group label="Seu email">
                    <validation-provider v-slot="{ errors }" name="email" rules="required|email">
                      <b-form-input v-model="register_form.email" name="email" />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col md="12">
                  <b-form-group label="Senha">
                    <validation-provider v-slot="{ errors }" name="senha" rules="required|min:6">
                      <b-form-input v-model="register_form.password" type="password" name="pass" />
                      <span class="text-danger">{{ errors[0] }}</span>
                    </validation-provider>
                  </b-form-group>
                </b-col>
                <b-col md="12">
                  <b-form-group label="Confirmar senha">
                    <validation-provider v-slot="{ errors }" name="confirmar senha" rules="required">
                      <b-form-input v-model="register_form.password_confirmation" type="password" name="pass_confirmation" />
                      <span class="text-danger">{{ errors[0] }}</span>
                      <span v-if="!passwordConfirmed" class="text-danger">As senhas digitadas não conferem</span>
                    </validation-provider>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-form-group class="text-center">
                <p>
                  Já possúi uma conta?
                  <b-btn variant="secondary" size="sm" @click="open('login')">
                    <strong>entre</strong>
                  </b-btn>
                </p>
                <b-button type="submit" variant="primary" :disabled="invalid">
                  Cadastrar
                </b-button>
              </b-form-group>
            </form>
          </ValidationObserver>
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data () {
    return {
      tab: this.$route.query.tab || 'login',
      form: {
        email: '',
        password: ''
      },
      register_form: {
        name: '',
        email: '',
        organization: '',
        address: {
          city: '',
          uf: '',
          location: {
            type: 'Point',
            coordinates: []
          }
        },
        password: '',
        password_confirmation: ''
      }
    }
  },
  computed: {
    passwordConfirmed () {
      return this.register_form.password === this.register_form.password_confirmation
    }
  },
  methods: {
    async login () {
      await this.$auth.loginWith('local', { data: this.form }).catch(e => {})
    },
    async register () {
      const user = await this.$axios.$post('/api/users/register', this.register_form)
      if (user && user._id) {
        await this.$auth.loginWith('local', { data: this.register_form })
      }
    },
    open (tab) {
      this.tab = tab
    }
  },
  head() {
    return {
      title: (this.tab === 'login' ? 'Entrar' : 'Cadastrar')
    }
  }
}
</script>
