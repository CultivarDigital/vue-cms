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
            <b-button v-if="user" size="sm" class="float-right mt-1" @click="changePassword">
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
            <validation-provider v-slot="{ errors }" name="confirmar senha" rules="required">
              <b-form-input v-model="form.password_confirmation" type="password" name="pass_confirmation" />
              <span class="text-danger">{{ errors[0] }}</span>
              <span v-if="!passwordConfirmed" class="text-danger">As senhas digitadas não conferem</span>
            </validation-provider>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row v-if="$auth.hasScope('super') || $auth.hasScope('admin')">
        <b-col v-if="$auth.hasScope('super') && sites && !user.roles.includes('super')" md="6">
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
        <b-col v-if="form.roles && form.roles[0] === 'user'" md="6">
          <b-form-group label="Organização *">
            <validation-provider v-slot="{ errors }" name="organização" rules="required">
              <b-form-input v-model="form.organization" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="Coordenadas Google Maps *" description="Insira as coordenadas do item que deseja cadastrar ou clique no botão abaixo para selecionar seu endereço">
            <b-row>
              <b-col>
                <validation-provider v-slot="{ errors }" name="latitude" rules="required">
                  <b-form-input v-model="form.address.location.coordinates[0]" name="latitude" placeholder="Latitude" type="number" min="-90.000000" max="90.000000" step="0.000000001" />
                  <span class="text-danger">{{ errors[0] }}</span>
                </validation-provider>
              </b-col>
              <b-col>
                <validation-provider v-slot="{ errors }" name="longitude" rules="required">
                  <b-form-input v-model="form.address.location.coordinates[1]" name="longitude" placeholder="Longitude" type="number" min="-180.000000" max="180.000000" step="0.000000001" />
                  <span class="text-danger">{{ errors[0] }}</span>
                </validation-provider>
              </b-col>
            </b-row>
          </b-form-group>
          <CoordinatesPreview :form="form" />
          <div class="text-right">
            <address-form :current-address="form.address" :autoload="false" @input="setAddress" />
          </div>
          <b-row>
            <b-col md="6">
              <b-form-group label="Estado">
                <b-form-select v-model="form.address.uf" :options="estados" />
              </b-form-group>
            </b-col>
            <b-col md="6">
              <b-form-group v-if="form.address.uf" label="Cidade">
                <b-form-select v-model="form.address.city" :options="cidades" />
              </b-form-group>
            </b-col>
          </b-row>
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
import roles from '@/data/roles.json'

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [mixinGlobal, mixinForm],
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
        site: null,
        name: '',
        email: '',
        organization: '',
        password: '',
        password_confirmation: '',
        roles: [],
        address: {
          city: '',
          uf: '',
          location: {
            type: 'Point',
            coordinates: []
          }
        }
      }
    }
  },
  computed: {
    passwordConfirmed () {
      return !this.show_password || this.form.password === this.form.password_confirmation
    },
    roles () {
      if (this.$auth.hasScope('super')) {
        return roles
      } else {
        return roles.filter(role => role.value[0] !== 'super')
      }
    }
  },
  async created () {
    this.toForm(this.form, this.user)
    if (this.$auth.hasScope('super')) {
      const sites = await this.$axios.$get('/api/sites').catch(this.showError)
      sites.forEach(site => {
        this.sites.push({ value: site._id, text: site.name })
      })
    }
  },
  methods: {
    async save () {
      if (this.user) {
        const user = await this.$axios.$put('/api/users/' + this.user._id, this.form).catch(this.showError)
        if (user) {
          this.$toast.success('Usuário atualizado com sucesso!')
          this.$router.push('/admin/users')
        }
      } else {
        const user = await this.$axios.$post('/api/users', this.form).catch(this.showError)
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
