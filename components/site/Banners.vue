<template>
  <div v-if="items.length" class="banners-component">
    <b-carousel :interval="7000" :indicators="items.length > 1" class="banners">
      <template v-for="(item, index) in items">
        <b-carousel-slide v-if="item" :key="index">
          <b-card :img-src="item.url" :img-alt="item.title" img-left>
            <b-card-text>
              <h4>{{ item.title }}</h4>
              <p>{{ (item.description) | truncate(250) }}</p>
            </b-card-text>
          </b-card>
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
