<template>
  <div>
    <div>
      <b-row>
        <b-col
          v-for="(attachment, i) in attachments"
          :key="i"
          md="3"
          class="text-center mb-3"
        >
          <b-img v-if="attachment.thumb" v-b-tooltip class="pointer" :src="attachment.thumb || attachment.url" thumbnail fluid :title="attachment.title" @click="() => showImg(i)" />
          <b-icon-image v-else-if="attachment.type === 'images'" scale="2" />
          <b-icon-file-earmark-text v-else scale="2" />
          <div v-if="select" class="mt-2">
            <b-btn size="sm" variant="primary" @click="$emit('select', attachment)">Selecionar</b-btn>
          </div>
        </b-col>
      </b-row>
      <vue-easy-lightbox
        :visible="visible"
        :imgs="attachments.map((attachment) => { return { src: attachment.url, title: attachment.title } })"
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
    attachments: {
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
