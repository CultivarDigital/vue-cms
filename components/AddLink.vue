<template>
  <div>
    <b-form-group label="Links">
      <div v-for="(link, index) in value" :key="index" class="mb-3">
        <b-link v-bind="link"><b-icon-link /> <strong>{{ link.title }}</strong></b-link>
        <b-link class="ml-1 outline-primary" size="sm" @click="remove(index)"><b-icon-trash /> </b-link>
      </div>
      <b-btn v-b-modal.add-link-modal size="sm">
        <b-icon-link />
        Adicionar link
      </b-btn>
    </b-form-group>
    <b-modal id="add-link-modal" title="Adicionar link" hide-footer>
      <b-form @submit.prevent="add">
        <b-form-group label="Título">
          <b-form-input v-model="form.title" />
        </b-form-group>
        <b-form-group label="Link (URL)">
          <b-form-input v-model="form.link" />
        </b-form-group>
        <b-alert dismissible variant="danger" :show="!!error">{{ error }}</b-alert>
        <div class="text-right">
          <b-btn :disabled="!(form.title && form.link)" type="submit">Adicionar</b-btn>
        </div>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      form: {
        title: '',
        link: '',
        target: null
      },
      error: null
    }
  },
  methods: {
    add () {
      this.error = null
      if (this.form.title && this.form.link) {
        if (this.form.link.startsWith('/') || this.form.link.startsWith('http')) {
          const list = [...this.value]
          const item = { title: this.form.title }
          if (this.form.link.startsWith('http')) {
            item.href = this.form.link
            item.target = '_blank'
          } else {
            item.to = this.form.link
          }
          list.push(item)
          this.$emit('input', list)
          this.$bvModal.hide('add-link-modal')
          this.form.title = null
          this.form.link = null
          this.form.target = null
        } else {
          this.error = 'A URL é inválida. Deve começar com "http://" e "https://" para urls internas ou "/" para urls internas.'
        }
      }
    },
    remove(index) {
      const list = this.value.filter((item, i) => i !== index)
      this.$emit('input', list)
    }
  }
}
</script>
