<template>
  <div class="container text-center mt-4">
    <Logo />
    <h1 class="title">
      Caminhos da semente
    </h1>
    <span class="subtitle">
      Entre com seus dados para acessar
    </span>
    <form @submit="login" class="mt-4">
      <b-form-group label="Digite seu email">
        <b-form-input v-model="form.username" type="text" />
      </b-form-group>
      <b-form-group label="Digite sua senha">
        <b-form-input v-model="form.password" type="text" />
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
        username: '',
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
        console.log(err)
      }
    }
  }
}
</script>
