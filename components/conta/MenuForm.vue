<template>
  <ValidationObserver v-slot="{ validate, invalid }">
    <b-form @submit.prevent="validate().then(save)">
      <b-row>
        <b-col md="4">
          <b-form-group label="Nome *">
            <validation-provider v-slot="{ errors }" name="nome" rules="required">
              <b-form-input v-model="form.name" name="name" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
          </b-form-group>
        </b-col>
        <b-col md="8">
          <b-form-group label="Selecione a página relacionada">
            <form-entity-select type="pages" :form="form" field="page" />
          </b-form-group>
          <h4 class="text-center">OU</h4>
          <b-form-group label="Insira a URL para a página">
            <validation-provider v-slot="{ errors }" name="url">
              <b-form-input v-model="form.url" name="url" />
              <span class="text-danger">{{ errors[0] }}</span>
            </validation-provider>
            <small tabindex="-1" class="form-text text-muted">Comece com / para páginas internas.</small>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col md="12">
          <b-form-group label="Menu Principal">
            <form-entity-select type="menus" :form="form" field="menu" />
            <small tabindex="-1" class="form-text text-muted">Preenchendo, o menu deste cadastro será exibido dentro do Menu Principal, como um Sub-Menu.</small>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col offset-md="10" md="2">
          <b-button type="submit" variant="secondary" block :disabled="invalid">
            <b-icon-check-circle /> Salvar
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </ValidationObserver>
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

import mixinForm from '@/mixins/form'

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  mixins: [mixinForm],
  props: {
    menu: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      mainMenus: [],
      form: {
        name: '',
        url: '',
        page: null,
        menu: null
      }
    }
  },
  async created () {
    this.toForm(this.form, this.menu)
    this.mainMenus = (await this.$axios.$get('/api/menus')).map(menu => ({
      id: menu._id,
      title: menu.name
    }))
  },
  methods: {
    async save () {
      if (this.menu) {
        const menu = await this.$axios.$put('/api/menus/' + this.menu.id, this.form)
        if (menu) {
          this.$toast.success('Menu atualizado com sucesso.')
          this.$router.push('/conta/menus')
        }
      } else {
        const menu = await this.$axios.$post('/api/menus', this.form)
        if (menu) {
          this.$toast.success('Menu cadastrado com sucesso.')
          this.$router.push('/conta/menus')
        }
      }
    }
  }
}
</script>
