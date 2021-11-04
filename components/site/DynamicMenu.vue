<template>
  <b-navbar-nav class="ml-auto">
    <template v-for="menu in menus">
      <b-nav-item-dropdown v-if="menu.submenus && menu.submenus.length" :key="'submenu-' + menu._id" :text="menu.name">
        <b-dropdown-item v-for="submenu in menu.submenus" :key="submenu._id" v-bind="menuUrl(submenu)">{{ submenu.name }}</b-dropdown-item>
      </b-nav-item-dropdown>
      <b-nav-item v-else :key="menu._id" v-bind="menuUrl(menu)">
        {{ menu.name }}
      </b-nav-item>
    </template>
    <template v-for="key in Object.keys(settings.features)">
      <b-nav-item v-if="settings.features[key].enabled" :key="key" :to="settings.features[key].url">{{ settings.features[key].title }}</b-nav-item>
    </template>
    <b-nav-item v-if="settings.features['shop'].enabled" :to="'/conta'" variant="primary" size="lg" title="Minha conta">
      <b-icon-person-fill /> <span class="d-lg-none">Minha conta</span>
    </b-nav-item>
  </b-navbar-nav>
</template>

<script>
export default {
  props: {
    menus: {
      type: Array,
      default: () => [],
      required: true
    }
  },
  computed: {
    settings() {
      return this.$store.state.settings
    }
  },
  methods: {
    menuUrl(menu) {
      const props = {}
      if (menu.page) {
        props.to = '/' + menu.page.slug
      } else if (menu.url.startsWith('http')) {
        props.href = menu.url
        props.target = '_blank'
      } else {
        props.to = menu.url
      }
      return props
    }
  }
}
</script>
