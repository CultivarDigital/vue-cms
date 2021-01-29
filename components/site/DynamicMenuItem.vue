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
  }
}
</script>
