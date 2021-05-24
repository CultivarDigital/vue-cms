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
            <validation-provider v-slot="{ errors }" name="email" rules="required|email">
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
      <Upload v-model="form.picture" type="images" label="Foto do perfil" />
      <b-row v-if="$auth.user.role === 'admin'">
        <b-col md="6">
          <b-form-group label="Perfil *">
            <validation-provider v-slot="{ errors }" rules="required">
              <b-form-select v-model="form.role" :options="roles" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col v-if="form.role && form.role === 'user'" md="6">
          <b-form-group label="Organização *">
            <validation-provider v-slot="{ errors }" name="organização" rules="required">
              <b-form-input v-model="form.organization" />
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
      </b-row>
      <br>
      <b-button type="submit" variant="primary" block :disabled="invalid">
        Salvar
      </b-button>
    </b-form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

import mixinForm from '@/mixins/form'
import roles from '@/data/roles.json'

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [mixinForm],
  props: {
    user: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      show_password: !this.user,
      roles,
      form: {
        name: '',
        picture: null,
        email: '',
        organization: '',
        password: '',
        password_confirmation: '',
        role: null,
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
    }
  },
  created () {
    this.toForm(this.form, this.user)
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
