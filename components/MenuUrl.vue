<template>
  <span>
    <template v-if="menu.page">
      <n-link :to="'/' + menu.page.slug"> <small>{{ '/' + menu.page.slug }}</small></n-link>
    </template>
    <template v-else>
      <a v-if="menu.url.startsWith('http')" :href="menu.url" target="_blank">
        <small>{{ menu.url }}  </small>
      </a>
      <n-link v-else :to="menu.url">
        <small>{{ menu.url }}</small>
      </n-link>
    </template>
  </span>
</template>
<script>
export default {
  props: {
    menu: {
      required: true,
      type: Object,
      default: () => null
    }
  }
}
</script>
