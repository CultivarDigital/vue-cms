<template>
  <div class="container text-center mt-4">
    <Logo />
    <h1 class="title">
      Terrakrya
    </h1>
    <span class="subtitle">
      Entre com seus dados para acessar
    </span>
    <form @submit.prevent="login" class="mt-4">
      <b-form-group label="Digite seu email">
        <b-form-input v-model="form.email" type="text" />
      </b-form-group>
      <b-form-group label="Digite sua senha">
        <b-form-input v-model="form.password" type="password" />
      </b-form-group>
      <b-form-group>
        <b-button type="submit">
          Entrar
        </b-button>
      </b-form-group>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      try {
        const response = await this.$auth.loginWith('local', { data: this.form })
        console.log(response)
      } catch (err) {
        console.log(err.response.data)
        this.$toast.error(err.response.data)
      }
    }
  }
}
</script>
