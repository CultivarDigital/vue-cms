<template>
  <b-form-group :label="label">
    <b-form-tags v-model="tags" placeholder="Digite e pressione enter..." @input="changed" />
    <div v-if="items && items.length && items.length < 16">
      <small>ou selecione abaixo para adicionar:</small>
      <div>
        <b-badge v-for="tag in items" :key="tag" :variant="tags.includes(tag) ? 'secondary' : 'primary'" class="mb-1 mr-1 pointer" @click="addTag(tag)">{{ tag }}</b-badge>
      </div>
    </div>
  </b-form-group>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    label: {
      type: String,
      default: 'Palavras chave'
    }
  },
  data () {
    return {
      tags: []
    }
  },
  created () {
    this.tags = this.value
  },
  methods: {
    addTag (tag) {
      if (this.tags.includes(tag)) {
        this.tags = this.tags.filter(t => t !== tag)
      } else {
        this.tags.push(tag)
      }
      this.changed()
    },
    changed () {
      this.$emit('input', this.tags)
    }
  }
}
</script>
