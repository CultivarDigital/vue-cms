<template>
  <div v-if="site" class="login-page">
    <section class="content pb-5">
      <b-container fluid="lg" class="map">
        <h6 class="pt-5 mb-4 text-center">
          <nuxt-link to="/entrar?tab=register">
            Entre com seus dados
          </nuxt-link>
          ou
          <nuxt-link to="/entrar?tab=login">
            cadastre-se
          </nuxt-link>
          para continuar.
        </h6>
        <div class="card p-4">
          <form class="mt-4" @submit.prevent="login">
            <b-form-group label="Digite seu email">
              <b-form-input v-model="form.email" type="text" />
            </b-form-group>
            <b-form-group label="Digite sua senha">
              <b-form-input v-model="form.password" type="password" />
            </b-form-group>
            <b-form-group>
              <b-button type="submit" variant="primary">
                Entrar
              </b-button>
            </b-form-group>
          </form>
        </div>
      </b-container>
    </section>
  </div>
</template>

<script>
import mixinPage from '@/mixins/page'
export default {
  mixins: [mixinPage],
  data () {
    return {
      tab: 'login',
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      await this.$auth.loginWith('local', { data: this.form }).catch(this.showError)
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
  .login-page
    .content
      background-color: #f6a447
      .map
        h6
          font-weight: 700
        .card
          border-radius: 15px
          border: none
          h3
            font-weight: 700
            color: #f6a447
            font-size: 22px
            text-align: center
          .col
            padding: 50px
            h4
              font-weight: 700
              font-size: 18px
            .legend
              p
                font-size: 12px
                .btn
                  background-color: #f6a447
                  padding: 1px 3px
                  border: none
                  color: #384e3f
                  line-height: 10px
                  font-size: 10px
                  margin-left: 6px
              .pattern
                width: 15px
                height: 25px
                background-color: #384e3f
                position: absolute
                left: 0
            // padding: 30px
        .col-md-2
          padding: 30px
          h4
            margin-top: 30px
            font-weight: 700
            font-size: 16px
          .legend
            p
              font-size: 12px
              .btn
                background-color: #f6a447
                padding: 1px 3px
                border: none
                color: #384e3f
                line-height: 10px
                font-size: 10px
                margin-left: 6px
            .pattern
              width: 15px
              height: 25px
              background-color: #384e3f
              position: absolute
              left: 0
</style>
