<template>
  <draggable tag="b-list-group" :list="menus" :group="{ name: 'g1' }" @end="(event) => $emit('change', event)">
    <b-list-group-item v-for="menu in menus" :id="menu._id" :key="menu.name" :to="'/conta/menus/' + menu._id + '/edit'">
      <div class="pt-2 pb-3">
        <h6 class="mb-0"><strong>{{ menu.name }}</strong></h6>
        <MenuUrl v-if="menu.submenus.length === 0" :menu="menu" />
      </div>
      <draggable-submenu :menus="menu.submenus" @change="(event) => $emit('change', event)" />
      <div class="text-right pt-2 pb-1">
        <b-btn :to="'/conta/menus/new?menu=' + menu._id" variant="success"><b-icon-plus /></b-btn>
      </div>
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
      type: Array
    }
  }
}
</script>
