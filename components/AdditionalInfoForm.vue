<template>
  <div class="address-form">
    <table v-if="value && value.length" class="table b-table">
      <tbody>
        <tr v-for="(info, index) in value" :key="index">
          <td><strong>{{ info.label }}</strong> <br> {{ info.value }}</td>
          <td class="text-right"><b-btn variant="light" size="sm" @click="remove(index)"><client-only><b-icon-trash /></client-only></b-btn></td>
        </tr>
      </tbody>
    </table>
    <b-btn variant="success" @click="show_modal = !show_modal"><client-only><b-icon-plus /></client-only> Adicionar informação</b-btn>
    <b-modal v-model="show_modal" title="Adicionar informação" hide-footer size="lg">
      <ValidationObserver v-slot="{ validate, invalid }">
        <b-form @submit.prevent="validate().then(add)">
          <div>
            <b-form-group label="Título da informação">
              <validation-provider v-slot="{ errors }" name="título" rules="required">
                <b-form-input v-model="form.label" />
                <span class="text-danger">{{ errors[0] }}</span>
              </validation-provider>
            </b-form-group>
            <b-form-group label="Valor da informação">
              <validation-provider v-slot="{ errors }" name="valor" rules="required">
                <b-form-textarea v-model="form.value" />
                <span class="text-danger">{{ errors[0] }}</span>
              </validation-provider>
            </b-form-group>
          </div>
          <b-btn type="submit" variant="success" size="lg" :disabled="invalid">
            Adicionar
          </b-btn>
        </b-form>
      </ValidationObserver>
    </b-modal>
  </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'

const emptyForm = {
  label: '',
  value: ''
}

export default {
  components: {
    ValidationObserver,
    ValidationProvider
  },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      show_modal: false,
      form: { ...emptyForm },
      list: []
    }
  },
  created() {
    if (this.value) {
      this.list = this.value
    }
  },
  methods: {
    add() {
      this.list.push({ ...this.form })
      this.save()
    },
    save() {
      this.$emit('input', this.list)
      this.form = { ...emptyForm }
      this.show_modal = false
    },
    remove(index) {
      this.list = this.list.filter((item, i) => i !== index)
      this.save()
    }
  }
}
</script>
