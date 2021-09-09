<template>
  <b-form @submit.prevent="save">
    <div class="text-center mb-3">
      <a :href="value.url" target="_blank">
        <b-img v-if="value.url" :src="value.url" fluid />
      </a>
    </div>
    <div>
      <b-form-input v-model="form.title" placeholder="Título" class="mt-1" />
      <b-form-textarea v-model="form.description" placeholder="Descrição" class="mt-1" />
      <b-form-input v-model="form.link" placeholder="Link" class="mt-1" />
      <b-form-input v-model="form.link_title" placeholder="Título do link" class="mt-1" />
    </div>
    <b-button class="mb-4 mt-4" type="submit" variant="success" block>
      Salvar
    </b-button>
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
    }
  },
  data () {
    return {
      form: {
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
    this.toForm(this.form, this.value)
  },
  methods: {
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
