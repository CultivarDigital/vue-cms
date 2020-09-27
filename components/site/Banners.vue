<template>
  <div v-if="items.length" class="banners-component">
    <b-carousel :interval="7000" :indicators="items.length > 1" class="banners">
      <template v-for="(item, index) in items">
        <b-carousel-slide v-if="item" :key="index" :img-src="item.url">
          <h2 v-if="item.title">{{ item.title }}</h2>
        </b-carousel-slide>
      </template>
    </b-carousel>
  </div>
</template>
<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}
</script>
