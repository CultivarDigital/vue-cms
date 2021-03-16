<template>
  <header>
    <b-navbar toggleable="lg">
      <b-container fluid="lg">
        <b-navbar-brand v-if="site" to="/">
          <b-img :src="site.logo ? site.logo.url : require('~/assets/img/logo.svg')" />
          <b-img :src="site.logo ? site.logo.url : require('~/assets/img/logo-nome.svg')" />
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

import DynamicMenuItem from '@/components/site/DynamicMenuItem.vue'

export default {
  components: {
    DynamicMenuItem
  },
  data () {
    return {
      menus: null
    }
  },
  computed: {
    site() {
      return this.$store.state.site
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
