<template>
  <div v-if="site" class="login-page">
    <section class="content pb-5">
      <b-container>
        <h6 class="pb-5 pt-5 text-center subtitle">
          Para continuar você deve
          <a class="btn btn-primary" @click="open('login')">
            entrar
          </a>
          com seus dados ou
          <a class="btn btn-primary" @click="open('register')">
            cadastrar-se
          </a>
        </h6>
        <div v-show="tab === 'login'" class="card p-4">
          <form class="mt-4" @submit.prevent="login">
            <b-form-group label="Digite seu email">
              <b-form-input v-model="form.email" type="text" />
            </b-form-group>
            <b-form-group label="Digite sua senha">
              <b-form-input v-model="form.password" type="password" />
            </b-form-group>
            <b-form-group class="text-center">
              <p>
                Ainda não possúi uma conta?
                <a @click="open('register')">
                  <strong>cadastre-se!</strong>
                </a>
              </p>
              <b-button type="submit" variant="primary">
                Entrar
              </b-button>
            </b-form-group>
          </form>
        </div>
        <div v-show="tab === 'register'" class="card p-4">
          <ValidationObserver v-slot="{ validate, invalid }">
            <form @submit.prevent="validate().then(register)">
              <b-row>
                <b-col md="12">
                  <b-form-group label="Nome">
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
                  <CoordinatesPreview :form="form" />
                  <div>
                    <address-form v-model="form.address" :autoload="false" />
                  </div>
                </b-col>
                <b-col md="12">
                  <b-form-group label="Email">
                    <validation-provider v-slot="{ errors }" name="domínio" rules="required|email">
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
                  <a @click="open('login')">
                    <strong>entre</strong>
                  </a>
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
import mixinGlobal from '@/mixins/global'
import mixinPage from '@/mixins/page'
export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [mixinGlobal, mixinPage],
  data () {
    return {
      tab: this.$route.query.tab || 'login',
      form: {
        email: '',
        password: ''
      },
      register_form: {
        site: null,
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
  created () {
    if (this.site) {
      this.register_form.site = this.site._id
    }
  },
  methods: {
    async login () {
      await this.$auth.loginWith('local', { data: this.form }).catch(this.showError)
    },
    async register () {
      const user = await this.$axios.$post('/api/users/register', this.register_form).catch(this.showError)
      if (user && user._id) {
        await this.$auth.loginWith('local', { data: this.register_form }).catch(this.showError)
      }
    },
    open (tab) {
      this.tab = tab
    }
  },
  head() {
    return {
      title: (this.tab === 'login' ? 'Entrar - ' : 'Cadastrar - ') + this.site.name,
      meta: [{
        hid: 'description',
        name: 'description',
        content: this.site.description
      }]
    }
  }
}
</script>
<style lang="sass" scoped>
</style>
