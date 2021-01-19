<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <b-form @submit.prevent="validate().then(save)">
      <b-row>
        <b-col md="12">
          <b-form-group label="Nome *">
            <validation-provider v-slot="{ errors }" name="nome" rules="required">
              <b-form-input v-model="form.name" name="name" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="12">
          <b-form-group label="Introdução">
            <b-form-textarea v-model="form.description" name="description" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-button class="mb-4" type="submit" variant="primary" block :disabled="invalid">
        Salvar
      </b-button>
    </b-form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import mixinGlobal from '@/mixins/global'
import mixinForm from '@/mixins/form'
export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [mixinGlobal, mixinForm],
  props: {
    menu: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      form: {
        name: '',
        description: ''
      }
    }
  },
  created () {
    this.toForm(this.form, this.menu)
  },
  methods: {
    async save () {
      if (this.menu) {
        const menu = await this.$axios.$put('/api/menus/' + this.menu.slug, this.form).catch(this.showError)
        if (menu) {
          this.$toast.success('Menu atualizado com sucesso!')
          this.$router.push('/admin/menus')
        }
      } else {
        const menu = await this.$axios.$post('/api/menus', this.form).catch(this.showError)
        if (menu) {
          this.$toast.success('Menu cadastrada com sucesso!')
          this.$router.push('/admin/menus')
        }
      }
    }
  }
}
</script>
