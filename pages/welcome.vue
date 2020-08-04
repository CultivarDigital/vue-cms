<template>
  <div class="text-center mt-5">
    <div>
      <Logo />
      <h1 class="title mt-5">
        Caminhos da Semente
      </h1>
      <div class="links mt-5">
        <nuxt-link to="/site" class="btn btn-success">
          Site
        </nuxt-link>
        <nuxt-link to="/admin" class="btn btn-primary">
          Painel
        </nuxt-link>
        <b-button v-if="$auth.loggedIn">
          Sair
        </b-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>
