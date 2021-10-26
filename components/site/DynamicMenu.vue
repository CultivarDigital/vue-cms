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

    <b-nav-item to="/noticias">Notícias</b-nav-item>
    <b-nav-item to="/agenda">Agenda</b-nav-item>
    <b-nav-item to="/biblioteca">Midiateca</b-nav-item>
    <b-nav-item to="/loja">Loja</b-nav-item>
    <b-nav-item :to="'/conta'" variant="primary" size="lg" title="Minha conta">
      <b-icon-person /> <span class="d-lg-none">Minha conta</span>
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
