<template>
  <header>
    <b-navbar toggleable="lg">
      <b-container fluid="lg">
        <b-navbar-brand v-if="settings" to="/">
          <b-img :src="settings.logo ? settings.logo.url : require('~/assets/img/logo.png')" />
        </b-navbar-brand>
        <b-navbar-toggle target="header-menu">
          <font-awesome-icon icon="bars" />
        </b-navbar-toggle>
        <b-collapse id="header-menu" is-nav class="my-3">
          <b-navbar-nav />
          <template v-if="menus !== null">
            <dynamic-menu-item :menus="menus" />
          </template>
        </b-collapse>
      </b-container>
    </b-navbar>
  </header>
</template>
<script>
export default {
  data () {
    return {
      menus: null
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings
    }
  },
  created () {
    this.list()
  },
  methods: {
    async list () {
      this.menus = await this.$axios.$get('/api/menus/submenus', { params: { populate: 'page' } })
    }
  }
}
</script>
