<template>
  <b-form @submit.prevent="save">
    <div class="text-center mb-3">
      <a :href="value.url" target="_blank">
        <b-img v-if="value.thumb" :src="value.thumb || value.url" fluid />
        <b-icon-image v-else-if="value.type === 'images'" scale="2" />
        <b-icon-file-earmark-text v-else scale="2" />
      </a>
    </div>
    <div>
      <b-form-input v-model="form.title" placeholder="Título" class="mt-1" />
      <b-form-textarea v-model="form.description" placeholder="Descrição" class="mt-1" />
      <b-form-input v-model="form.link" placeholder="Link" class="mt-1" />
      <b-form-input v-model="form.link_title" placeholder="Título do link" class="mt-1" />
    </div>
    <b-btn class="mt-4" variant="danger" @click="remove">
      Remover
    </b-btn>
    <b-btn class="mt-4" type="submit" variant="success">
      Salvar
    </b-btn>
  </b-form>
</template>

<script>
import mixinForm from '@/mixins/form'

export default {
  mixins: [mixinForm],
  props: {
    value: {
      type: Object,
      default: null
    },
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      form: {
        type: '',
        title: '',
        description: '',
        link: '',
        link_title: ''
      }
    }
  },
  computed: {
    baseURL() {
      return (this.$axios.defaults.baseURL || '') + '/'
    }
  },
  created () {
    this.form.type = this.type
    this.toForm(this.form, this.value)
  },
  methods: {
    remove () {
      this.$emit('remove', this.value)
    },
    async save () {
      if (this.value) {
        const attachment = await this.$axios.$put('/api/attachments/' + this.value._id, this.form)
        if (attachment) {
          this.$emit('input', attachment)
          this.$toast.success('Dados atualizados!')
        }
      }
    }
  }
}
</script>
