<template>
  <span v-if="menu !== null">
    <b-nav-item v-if="!menu.submenus || menu.submenus.length === 0" :to="menu.internalUrl" :href="menu.externalUrl" :target="menu.internalUrl ? '_self' : '_blank'">
      {{ menu.name }}
    </b-nav-item>
    <b-nav-item-dropdown v-if="menu.submenus && menu.submenus.length > 0" :text="menu.name">
      <b-dropdown-item v-for="submenu in menu.submenus" :key="submenu._id" :to="submenu.internalUrl" :href="submenu.externalUrl" :target="submenu.internalUrl ? '_self' : '_blank'">{{ submenu.name }}</b-dropdown-item>
    </b-nav-item-dropdown>
  </span>
</template>

<script>
export default {
  name: 'DynamicMenuItem',
  props: {
    menu: {
      type: Object,
      default: null,
      required: true
    }
  },
  created () {
    this.setUrlMenuAndSubmenu()
  },
  methods: {
    setUrlMenuAndSubmenu() {
      this.setUrl(this.menu)
      for (let submenuIndex = 0; submenuIndex < this.menu.submenus.length; submenuIndex++) {
        const submenu = this.menu.submenus[submenuIndex]
        this.setUrl(submenu)
      }
    },
    setUrl(menu) {
      // cria a URL do item de menu, que pode ser: interna (link para dentro do site) ou externa (link para uma página fora do site)
      // 1. interno = menu associado a uma página interna do site
      // 2. interno = menu com o campo URL preenchido começando com "/"
      // 3. externo = menu com o campo URL preenchido, caso não comece com HTTP ou HTTPS esse trecho é incluído
      // 4. menu sem link = demais cenários

      if (menu.page && menu.page.slug) {
        menu.internalUrl = '/' + menu.page.slug
      } else if (menu.url) {
        menu.internalUrl = menu.url.startsWith('/') ? menu.url : ''
        menu.externalUrl = !menu.internalUrl ? menu.url : ''
        if (menu.externalUrl) {
          menu.externalUrl = (menu.url.startsWith('https://') || menu.url.startsWith('http://') ? '' : 'https://') + menu.url
        }
      } else {
        menu.internalUrl = ''
        menu.externalUrl = ''
      }
    }
  }
}
</script>
