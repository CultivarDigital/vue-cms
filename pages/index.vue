<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        Terrakrya
      </h1>
      <div class="links">
        <nuxt-link to="/site" class="btn btn-success">
          Site
        </nuxt-link>
        <nuxt-link to="/dashboard" class="btn btn-primary">
          Admin
        </nuxt-link>
        <b-button v-if="$auth.loggedIn" @click="logout">
          Sair
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    console.log(this.$auth.user.roles)
  },
  methods: {
    logout () {
      this.$auth.logout()
    }
  }
}
</script>
