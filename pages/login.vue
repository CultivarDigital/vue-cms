<template>
  <div class="container text-center mt-4">
    <Logo />
    <h1 class="title mt-4">
      Terrakrya CMS
    </h1>
    <span class="subtitle">
      Entre com seus dados para acessar
    </span>
    <form class="mt-4" @submit.prevent="login">
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
        await this.$auth.loginWith('local', { data: this.form })
      } catch (err) {
        this.$toast.error(err.response.data)
      }
    }
  }
}
</script>
