<template>
  <draggable tag="b-list-group" :list="menus" :group="{ name: 'g2' }" @end="(event) => $emit('change', event)">
    <b-list-group-item v-for="menu in menus" :id="menu._id" :key="menu.name" :to="'/conta/menus/' + menu._id + '/edit'">
      <h6><strong>{{ menu.name }}</strong></h6>
      <MenuUrl :menu="menu" />
    </b-list-group-item>
  </draggable>
</template>
<script>
import draggable from 'vuedraggable'

export default {
  components: {
    draggable
  },
  props: {
    menus: {
      required: true,
      type: Array,
      default: () => []
    }
  }
}
</script>
<style scoped>
.list-group {
  min-height: 50px;
  outline: 1px dashed;
}
</style>
