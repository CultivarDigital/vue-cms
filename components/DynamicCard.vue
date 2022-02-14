<template>
  <div>
    <b-card v-if="attrs.orientation === 'vertical'" v-bind="attrs" :bg-variant="attrs['bg-variant'] || 'primary'" class="mb-3" @click="$emit('click')">
      <b-card-text v-if="attrs.text" class="pre-wrap">{{ attrs.text }}</b-card-text>
      <b-link v-for="(link, index) in attrs.links" :key="'card-link-' + index" v-bind="link" class="card-link">{{ link.title }}</b-link>
    </b-card>
    <b-card v-else no-body class="overflow-hidden mb-3" v-bind="{...attrs, 'img-src': null}" :bg-variant="attrs['bg-variant'] || 'primary'" @click="$emit('click')">
      <b-row no-gutters>
        <b-col v-if="attrs['img-src'] && (!attrs['img-align'] || attrs['img-align'] === 'left')" md="6">
          <b-card-img :src="attrs['img-src']" :alt="attrs.title" class="rounded-0" />
        </b-col>
        <b-col md="6">
          <b-card-body :title="attrs.title">
            <b-card-sub-title class="mb-1">
              {{ attrs['sub-title'] }}
            </b-card-sub-title>
            <b-card-text>
              {{ attrs.text }}
            </b-card-text>
            <b-link v-for="(link, index) in attrs.links" :key="'card-link-' + index" v-bind="link" class="card-link">{{ link.title }}</b-link>
          </b-card-body>
        </b-col>
        <b-col v-if="attrs['img-src'] && attrs['img-align'] === 'right'" md="6">
          <b-card-img :src="attrs['img-src']" :alt="attrs.title" class="rounded-0" />
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>
export default {
  props: {
    attrs: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
<style scoped>
.card .card-link {
  color: #007bff;
}
</style>
