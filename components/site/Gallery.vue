<template>
  <div>
    <div>
      <div>
        <div
          v-for="(image, i) in images"
          :key="i"
          class="mr-2 mb-1 d-inline-block text-center"
        >
          <b-img v-b-tooltip class="pointer" :src="image.thumb || image.url" thumb width="100" :title="image.title" @click="() => showImg(i)" />
          <div v-if="select" class="mt-2">
            <b-btn size="sm" variant="default" @click="$emit('select', image)">Selecionar</b-btn>
          </div>
        </div>
      </div>
      <vue-easy-lightbox
        :visible="visible"
        :imgs="images.map((image) => image.url)"
        :index="index"
        @hide="handleHide"
      />
    </div>
  </div>
</template>

<script>
import VueEasyLightbox from 'vue-easy-lightbox'
export default {
  components: {
    VueEasyLightbox
  },
  props: {
    images: {
      type: Array,
      default: () => [],
      required: true
    },
    select: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      visible: false,
      index: 0
    }
  },
  methods: {
    showImg(index) {
      this.index = index
      this.visible = true
    },
    handleHide() {
      this.visible = false
    }
  }
}
</script>
